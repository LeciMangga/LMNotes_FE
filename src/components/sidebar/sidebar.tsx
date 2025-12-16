"use client";
import React from "react";
import CreateWorkspace from "@/components/sidebar/workspace/create/createWorkspace";
import ListWorkspace from "@/components/sidebar/workspace/list/listWorkspace";
import { Workspace_list } from "@/types";
import Login from "@/components/sidebar/Auth/login";
import Register from "@/components/sidebar/Auth/register";
import AccountButton from "@/components/sidebar/Auth/account";

export default function Sidebar() {
    const [workspaces_data, setWorkspacesData] = React.useState<Workspace_list["workspaces"]>([]);
    React.useEffect(() => {
    setWorkspacesData([
      { 
        id: 1, 
        name: "Workspace 1",
        pages: [
          { id: 1, name: "Title kah" },
          { id: 2, name: "Page 2 kah" },
        ],
      },
      {
        id: 2, 
        name: "Workspace 2",
        pages: [
            { id: 3, name: "Page 3" },
            { id: 4, name: "Page 4" },
        ],
      },
      {
        id: 3, 
        name: "Workspace 3",
        pages: [
            { id: 3, name: "Pagdasde 3" },
            { id: 4, name: "dds 4" },
        ],
      },
    ]);
  }, []); 
    return (
        <>
            <aside className="sidebar hidden md:w-64 bg-[#1e1e1e] h-full py-4 px-8 md:flex flex-col ">
                <div className="border-b border-gray-300 flex-shrink-0"></div>
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <CreateWorkspace />
                    {ListWorkspace(workspaces_data)}
                </div>
                <div className="flex-shrink-0">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center py-2 group cursor-pointer justify-between mb-2 w-full">
                            {Login({})}
                            {Register({})}
                        </div>
                        {AccountButton({})}
                    </div>
                </div>
            </aside>
        </>
        
    );
}