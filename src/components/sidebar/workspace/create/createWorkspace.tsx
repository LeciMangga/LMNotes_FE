"use client";
import React from "react";
import { Plus } from "lucide-react";
import { createWorkspace } from "@/lib/workspace";
import { useRouter } from "nextjs-toploader/app";
import { useSession } from "next-auth/react";

export default function CreateWorkspace() {
    const session = useSession();
    const router = useRouter();

    function navigateToCreateWorkspace() {
        if (session) {
            router.push("/workspace/create");
        }
    };

    return (
        <div onClick={navigateToCreateWorkspace} className="create-workspace flex items-center py-2 group">
            <Plus className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer" />
            <span className="text-gray-300 group-hover:text-white cursor-pointer">Create New Workspace</span>
            
        </div>
    );
}