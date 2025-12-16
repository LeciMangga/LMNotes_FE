"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useSession } from "next-auth/react";
import { Workspace } from "@/types";


export default function CreatePage({workspaceData} : {workspaceData: Workspace}) {
    const session = useSession();
    const router = useRouter();

    function navigateToCreatePage() {
        if (session) {
            router.push(`/${workspaceData.workspace_id}/createPage`);
        }
    }
    

    return (
        <div className="create-page flex items-center py-2 group" onClick={navigateToCreatePage}>
            <Plus className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer" />
            <span className="text-gray-300 group-hover:text-white cursor-pointer">Create Page</span>
        </div>
    );
}