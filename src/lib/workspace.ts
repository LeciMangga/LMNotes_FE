"use server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import {Page} from "@/types";


const backendUrl = process.env.BACKEND_URL;
const publicBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


const workspaceApiUrl = `${backendUrl}/api/v1/workspaces`;

export async function createWorkspace(name: string, description: string, members: string[]): Promise<any> {
    

    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${workspaceApiUrl}/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({ 
                name : name,
                description : description,
                members: members
            })
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error creating workspace:", error);
        return null;
    }
}

export async function getUserWorkspaces(): Promise<any[]> {
    
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${workspaceApiUrl}/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user workspaces:", error);
        return [];
    }
}

export async function updateWorkspace(workspace_id: string, name?: string, description?: string, members?: string[]): Promise<any> {
    
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${workspaceApiUrl}/${workspace_id}/update`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({
                workspace_id: workspace_id,
                name : name,
                description : description,
                members: members
            })
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error updating workspace:", error);
        return null;
    }
}

export async function getWorkspaceById(workspace_id: string): Promise<any> {
    
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${workspaceApiUrl}/${workspace_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (res.status === 404) {
                throw new Error("Workspace not found.");
            }
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching workspace by ID:", error);
        return null;
    }
}

export async function deleteWorkspace(workspace_id: string): Promise<boolean> {
    
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${workspaceApiUrl}/${workspace_id}/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
            if (res.status === 404) {
                throw new Error("Workspace not found.");
            }
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error deleting workspace:", error);
        return false;
    }
}