"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { createPage } from "@/lib/page";
import { ArrowRight } from "lucide-react";

export default function CreateWorkspacePage() {
  const session = useSession();
  const router = useRouter();
  const { workspaceId } = useParams();
  const workspace_id = workspaceId as string;
  const [title, setTitle] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitLoading(true);
    e.preventDefault();
    const resp = await createPage(workspace_id, title);
    if (resp) {
      window.dispatchEvent(new Event("refresh-workspace"));
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push(`/${workspace_id}/${resp.page_id}`);
    } else {
      alert("Failed to create workspace");
    }
    setIsSubmitLoading(false);
  };

  const handleCancel = () => {
    router.push("/landingPage"); 
  };

  return (
    <div className="h-full w-full bg-[#2c2c2c] text-white flex flex-col items-center justify-center p-10">
      
      <h1 className="text-4xl font-normal mb-8 text-center">Let's Create a Page! Enter Your Title below</h1>

      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit} className="flex flex-row gap-6">
          
          <div className="w-full flex-grow">
            <input
              type="text"
              placeholder="Insert Title Page"
              className="w-full px-5 py-4 rounded-lg bg-white text-black text-lg placeholder-gray-400 outline-none shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {isSubmitLoading ? (
            <div className="flex items-center justify-center h-10">
                <div className="h-10 w-10 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
            </div>
          ) : (
            <button 
              className="border-circle w-14 h-14 bg-[#3f3f3f] hover:bg-[#5a5a5a] flex items-center justify-center rounded-full shadow-md transition-colors" 
              type="submit"
            >
              <ArrowRight />
            </button>
          )}
          

          {/* <div className="flex justify-end gap-3 mt-2">
            <button
                type="submit"
                className="w-30 bg-[#00A35C] hover:bg-[#008f51] text-white py-2 rounded-md font-medium transition-colors"
            >
                Continue
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="w-30 bg-[#D1201D] hover:bg-[#b51b19] text-white py-2 rounded-md font-medium transition-colors"
            >
                Cancel
            </button>
            </div> */}
        </form>
      </div>
    </div>
  );
}