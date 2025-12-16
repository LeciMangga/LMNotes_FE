"use client";
import React from "react";
import { ChevronDown, Folder } from "lucide-react";
import CreatePage from "@/components/sidebar/page/create/createPage";
import ListPage from "@/components/sidebar/page/list/listPage";
import { Workspace_list, Workspace } from "@/types";


export default function ListWorkspace(workspaces_data: Workspace_list["workspaces"]) {
    const [expandedWorkspaceId, setExpandedWorkspaceId] = React.useState<number[]>([]);
    const toggleOpen = (workspace_id : number) => {
        setExpandedWorkspaceId((prev) =>
            prev.includes(workspace_id)
                ? prev.filter((id) => id !== workspace_id)
                : [...prev, workspace_id]
        );
    };
    return (
        workspaces_data.map((workspace: Workspace) => {
            const isOpen = expandedWorkspaceId.includes(workspace.id);
            return (
                <React.Fragment key={workspace.id}>
                    <div className="list-workspace flex items-center py-2 group justify-between"  onClick={() => toggleOpen(workspace.id)} >
                        <div className="flex items-center w-full min-w-0">
                            <Folder className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer flex-shrink-0" />
                            <span className="text-gray-300 group-hover:text-white cursor-pointer truncate min-w-0">{workspace.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-300 group-hover:text-white cursor-pointer 
                            flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-0' : 'rotate--90'}`}/>
                    </div>
                    <div className={`pages-in-workspace pl-5 transition-all duration-300 ease-in-out overflow-hidden 
                        ${isOpen ? 'max-h-screen opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <CreatePage />
                        {ListPage(workspace.pages)}
                    </div>
                </React.Fragment>
            )
        })
    );
}