"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from "next/navigation";
import { EDITOR_JS_TOOLS } from "@/lib/tools";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useSession } from "next-auth/react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import { YJSEditorJSBinding } from "yjs-editorjs-binding";
import { checkPageAccess, sharePage } from "@/lib/page";
import "@/styles/editorJs.css";
import { EditorJSYBinding } from "@/lib/editorJSBinding";

export default function PageEditor() {
  const editorRef = useRef<EditorJS | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasAccess, setHasAccess] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [publicUrl, setPublicUrl] = React.useState("");
  const [isSharedClicked, setIsSharedClicked] = React.useState(false);
  const [shareDuration, setShareDuration] = React.useState(24);

  const providerRef = useRef<WebsocketProvider | null>(null);
  const bindingRef = useRef<any>(null);
  const initialRenderedRef = useRef<boolean>(false);
  const { workspaceId, pageId } = useParams();
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const [cursors, setCursors] = React.useState<any[]>([]);

  const colorRef = useRef("#" + ((1<<24)*Math.random()|0).toString(16));

  const params = useParams();
  const router = useRouter();
  const session = useSession();


  function debounce(fn: any, delay: number) {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  function sharePageToPublic(durationHours: number) {
    if (!workspaceId || !pageId) return;
    sharePage(pageId.toString(), durationHours).then((data: any) => {
      const publicUrl = `${window.location.origin}/${workspaceId}/public/${data.token}`;
      setPublicUrl(publicUrl);
      navigator.clipboard.writeText(publicUrl).then(() => {
        alert("Public link copied to clipboard!");
      });
    }
    ).catch((error: any) => {
      console.error("Error sharing page:", error);
      alert("Failed to create public link.");
    });
  }

  useEffect(() => {
    if (!pageId) return;
    const title = localStorage.getItem(pageId as string) || "Untitled Page";
    setTitle(title);
  }, [pageId]);


  useEffect(() => {
    if (!hasAccess){
      checkPageAccess(workspaceId?.toString() || "").then((hasAccess: boolean) => {
        if (!hasAccess) {
          setHasAccess(false);
          console.error("Access denied to this page.");

          router.push("/landingPage");
          return;
        }
        setIsLoading(false);
        setHasAccess(true);
      });
    }

    console.log("Page title set to:", title);
    
    const ydoc = new Y.Doc();
    const yArray = ydoc.getArray("blocks");
    
    const wsUrl = `${BE_URL.replace("http", "ws")}/api/v1/workspaces/${workspaceId}/pages/`;
    const ws = new WebsocketProvider(wsUrl, `${pageId}/ws`, ydoc);
    providerRef.current = ws;
    
    const awareness = providerRef.current.awareness;

    const editorContainer = document.getElementById("editorjs");

    document.addEventListener("mousemove", (e) => {
      if (!editorContainer) return;
      const rect = editorContainer.getBoundingClientRect();
      const scrollTop = editorContainer.scrollTop;
      const scrollLeft = editorContainer.scrollLeft;

      const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

      awareness.setLocalStateField("cursor", {
        x: e.clientX - rect.left + scrollLeft + (isFirefox ? 0 : 22),
        y: e.clientY - rect.top + scrollTop + 200,
        username: session.data?.user?.name,
        color: colorRef.current,
      });
    });

    awareness.setLocalStateField("user", {
      name: session.data?.user?.name,
      color: colorRef.current,
      x : 0,
      y : 0,
    });

    awareness.on("update", () => {
      const states = awareness.getStates();

      const cursors: any[] = [];

      states.forEach((state, clientId) => {
        if (clientId === awareness.clientID) return;
        
        if (state.cursor) {
          cursors.push({
            id: clientId,
            ...state.cursor,
          });
        }
      });

      setCursors(cursors);   // simpan ke React state
    });




    if (hasAccess){
      const editor = new EditorJS({
        holder: "editorjs",
        placeholder: "Tulis catatanmu...",
        tools: EDITOR_JS_TOOLS,
        onChange: () => {
          const debouncedApply = debounce(async () => {
            if (bindingRef.current) {
              await bindingRef.current.applyEditorUpdate();
            }
          }, 500);
          debouncedApply();
        },
      });

      editorRef.current = editor;
      editor.isReady.then(() => {
        const binding = new EditorJSYBinding(editor, ydoc, "blocks");
        bindingRef.current = binding;
      });

      const editorElement = document.getElementById("editorjs");
      editorElement?.addEventListener("keyup", () => {
        const currentBlock = editor.blocks.getCurrentBlockIndex();
        const selection = window.getSelection();
        const offset = selection?.focusOffset || 0;

        awareness.setLocalStateField("user", {
          ...awareness.getLocalState()?.user,
          cursor: { blockIndex: currentBlock, offset }
        });
      });

    }    

    return () => {
      if (bindingRef.current) bindingRef.current.destroy?.();
      ws.destroy();
      ydoc.destroy();
      editorRef.current?.destroy();
    };

  },[workspaceId, pageId, hasAccess]);

  
  if (isLoading) {
    return <div className="pt-[100px] h-screen overflow-hidden"></div>;
  }
  return (
      <div className="pt-[100px] h-screen overflow-hidden relative">
          <div className="h-full overflow-y-auto p-4 flex flex-col">
            <h1 className="text-4xl justify-center flex items-center">{title}</h1>
            {isSharedClicked ? (
              <div className="flex flex-row justify-center items-center mr-auto ml-auto gap-4">
                <input
                  type="text"
                  placeholder="Share Duration"
                  value={shareDuration}
                  onChange={(e) => setShareDuration(Number(e.target.value))}
                  required
                  autoComplete="off"
                  className="flex w-20 ml-auto mr-auto rounded-md bg-white/5 px-4 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-grey-600 sm:text-sm/6" />
                <span className="flex items-center text-white">
                  hours
                </span>
                <button
                  className="px-4 py-2 bg-[#3f3f3f] text-white rounded hover:bg-[#575757] transition flex items-center justify-center mt-2 mb-2 ml-auto mr-auto"
                  onClick={() => {
                    sharePageToPublic(shareDuration);
                    setIsSharedClicked(false);
                  }}
                >
                  Share
                </button>
              </div>
              ) : (
                <button
                  className="px-4 py-2 bg-[#3f3f3f] text-white rounded hover:bg-[#575757] transition flex items-center justify-center mt-4 mb-4 ml-auto mr-auto"
                  onClick={() => {
                    if (publicUrl) {
                      navigator.clipboard.writeText(publicUrl).then(() => {
                        alert("Public link copied to clipboard!");
                      });
                      return;
                    }
                    setIsSharedClicked(true);
                  }}
                >
                  {publicUrl ? publicUrl : "Share Page to Public"}
                </button>
              ) }
            
            <div id="editorjs" className="min-h-full">
              
          </div>
          
        </div>
          

        {cursors.map((c) => (
          <div
            key={c.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: c.x + "px",
              top: c.y + "px",
              zIndex: 9999,
              transform: "translate(0px, 20px)", // biar posisi akurat ke pointer
            }}
          >
            {/* Username Tag */}
            <div
              className="absolute -top-5 left-0 px-2 py-0.5 text-xs text-white rounded shadow"
              style={{ 
                backgroundColor: c.color,
                top: "24px" 
              }}
            >
              {c.username}
            </div>

            {/* Cursor Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={c.color}
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
              }}
            >
              <path d="M3 2l7 18 2-8 8-2L3 2z"></path>
            </svg>
          </div>
        ))}

      </div>
  );
}
