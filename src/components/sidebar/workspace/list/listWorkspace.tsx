"use client";
import React from "react";
import { ChevronDown, Folder } from "lucide-react";
import CreatePage from "@/components/sidebar/page/create/createPage";
import ListPage from "@/components/sidebar/page/list/listPage";
import { Workspace_list, Workspace } from "@/types";
import WorkspaceContextMenu from "@/components/sidebar/workspace/list/modalContextMenu";
import { useRouter } from "nextjs-toploader/app";
import { deleteWorkspace } from "@/lib/workspace";


export default function ListWorkspace({ workspaces_data }: { workspaces_data: Workspace_list["workspaces"] }) {
    const [expandedWorkspaceId, setExpandedWorkspaceId] = React.useState<string[]>([]);
    const [contextMenu, setContextMenu] = React.useState<{ mouseX: number; mouseY: number, workspace: Workspace } | null>(null);

    const router = useRouter();

    const toggleOpen = (workspace_id : string) => {
        setExpandedWorkspaceId((prev) =>
            prev.includes(workspace_id)
                ? prev.filter((id) => id !== workspace_id)
                : [...prev, workspace_id]
        );
    };

    const openRightClickMenu = (event: React.MouseEvent, workspace: Workspace) => {
        event.preventDefault();
        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY,
            workspace: workspace
        });
    };

    React.useEffect(() => {
        const close = () => setContextMenu(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    const openEditWorkspace = (event: React.MouseEvent, workspace: Workspace) => {
        event.preventDefault();
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            workspace: workspace
        });
    };

    return (
        <>
            { workspaces_data.map((workspace: Workspace) => {
                const isOpen = expandedWorkspaceId.includes(workspace.workspace_id);
                return (
                    <React.Fragment key={workspace.workspace_id}>
                        <div className="list-workspace flex items-center py-2 group justify-between"  
                        onClick={() => toggleOpen(workspace.workspace_id)}
                        onContextMenu={(e) => openRightClickMenu(e, workspace)} 
                    >
                            <div className="flex items-center w-full min-w-0">
                                <Folder className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer flex-shrink-0" />
                                <span className="text-gray-300 group-hover:text-white cursor-pointer truncate min-w-0">{workspace.name}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-300 group-hover:text-white cursor-pointer 
                                flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-0' : 'rotate--90'}`}/>
                        </div>
                        <div className={`pages-in-workspace pl-5 transition-all duration-300 ease-in-out overflow-hidden 
                            ${isOpen ? 'max-h-screen opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <CreatePage workspaceData={workspace} />
                            <ListPage workspaceData={workspace} />
                        </div>
                    </React.Fragment>
                    
                )
            })}
            
            {contextMenu && (
                <WorkspaceContextMenu
                    x={contextMenu.mouseX}
                    y={contextMenu.mouseY}
                    onEdit={() => {
                        console.log("edit");
                        router.push(`/${contextMenu.workspace.workspace_id}/edit`);
                        setContextMenu(null);
                    }}
                    onDelete={async() => {
                        deleteWorkspace(contextMenu.workspace.workspace_id);
                        setContextMenu(null);
                        window.dispatchEvent(new Event("refresh-workspace"));
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        router.push("/landingPage");
                    }}
                />
            )}
        </>
        
        
    );
}
