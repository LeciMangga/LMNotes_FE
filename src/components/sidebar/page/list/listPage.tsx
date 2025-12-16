"use client";
import React from "react";
import {FileText} from "lucide-react";
import { Page } from "@/types/pages";
import { useRouter } from "nextjs-toploader/app";
import { Workspace } from "@/types";


export default function ListPage({workspaceData} : {workspaceData: Workspace}) {
    const router = useRouter();
    const navigateToPage = (pageId: string) => {
        router.push(`/${workspaceData.workspace_id}/${pageId}`);
    }
    return (
        workspaceData.pages.map((page: Page) => {
            return (
                <React.Fragment key={page.page_id}>
                    <div className="list-page flex items-center py-2 group" onClick={() => navigateToPage(page.page_id)}>
                        <FileText className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer" />
                        <span className="text-gray-300 group-hover:text-white cursor-pointer truncate">{page.title}</span>
                    </div>
                </React.Fragment>
            );
        })
    );
}