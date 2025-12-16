"use client";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import CreateWorkspace from "@/components/sidebar/workspace/create/createWorkspace";
import ListWorkspace from "@/components/sidebar/workspace/list/listWorkspace";
import { Workspace_list } from "@/types";
import AuthSection from "./Auth/auth_section";
import { getUserWorkspaces } from "@/lib/workspace";


export default function Sidebar() {
    const [workspaces_data, setWorkspacesData] = React.useState<Workspace_list["workspaces"]>([]);
    const router = useRouter();

    const fetchWorkspaces = async () => {
          const getWorkspaceData = await getUserWorkspaces();
          for (const workspace of getWorkspaceData) {
            for (const page of workspace.pages) {
                localStorage.setItem(page.page_id, page.title);
                await Promise.resolve();
            }
          }
          setWorkspacesData(getWorkspaceData);
      };

    React.useEffect(() => {
      fetchWorkspaces();
    }, [])

    React.useEffect(() => {
        const refreshSidebar = async () => {
            await fetchWorkspaces();
        };

        window.addEventListener("refresh-workspace", refreshSidebar);
        return () => window.removeEventListener("refresh-workspace", refreshSidebar);
    }, []);

    return (
        <>
            <aside className="sidebar hidden md:w-64 bg-[#1e1e1e] h-full py-4 px-8 md:flex flex-col ">
                <div className="border-b border-gray-300 flex-shrink-0"></div>
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <CreateWorkspace />
                    <ListWorkspace workspaces_data={workspaces_data} />
                </div>
                <div className="flex-shrink-0">
                    <AuthSection />
                </div>
            </aside>
        </>
        
    );
}