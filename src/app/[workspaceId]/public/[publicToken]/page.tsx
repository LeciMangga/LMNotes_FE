"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { getPageIdFromPublicToken } from "@/lib/page";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "@/lib/tools";
import { EditorJSYBinding } from "@/lib/editorJSBinding";



const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function PublicPageTokenPage() {
    const params = useParams();
    const isPublic = !!params.publicToken;
    const { workspaceId, publicToken } = params;
    const providerRef = React.useRef<WebsocketProvider | null>(null);
    const bindingRef = React.useRef<any>(null);
    const editorRef = React.useRef<EditorJS | null>(null);

    const [pageId, setPageId] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState<string>("");

    async function getPageIdFromToken(token: string) {
        await getPageIdFromPublicToken(token).then((resp) =>{
            if (resp && resp.page_id) {
                setPageId(resp.page_id);
                setTitle(resp.title);
            }
        });
    }

    useEffect(() => {
        if (isPublic && params.publicToken) {
            getPageIdFromToken(params.publicToken as string);
        }
        console.log("Public page :", pageId);
        if (pageId === null) return;
        const ydoc = new Y.Doc();
        const yArray = ydoc.getArray("blocks");
        
        const wsUrl = `${BE_URL.replace("http", "ws")}/api/v1/workspaces/${workspaceId}/pages/`;
        const ws = new WebsocketProvider(wsUrl, `${pageId}/ws`, ydoc);
        providerRef.current = ws;

        const editor = new EditorJS({
            holder: "editorjs",
            placeholder: "Tulis catatanmu...",
            tools: EDITOR_JS_TOOLS,
            readOnly: true,
        });

        editorRef.current = editor;
        editor.isReady.then(() => {
            const binding = new EditorJSYBinding(editor, ydoc, "blocks");
            bindingRef.current = binding;
        });

        return () => {
            if (bindingRef.current) bindingRef.current.destroy?.();
            ws.destroy();
            ydoc.destroy();
            editorRef.current?.destroy();
        };


    }, [params.publicToken, workspaceId, pageId, isPublic]);


    return (
      <div className="pt-[100px] h-screen overflow-hidden relative">
        <div className="h-full overflow-y-auto p-4 flex flex-col">
            <h1 className="text-4xl justify-center flex items-center">{title}</h1>
            <div id="editorjs" className="min-h-full"/>
            </div>
        </div>
    );
}