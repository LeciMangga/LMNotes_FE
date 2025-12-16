"use server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";


const backendUrl = process.env.BACKEND_URL;
const publicBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const pageApiUrl = `${backendUrl}/api/v1/pages`;

const publicpageApiUrl = `${backendUrl}/api/v1/public-pages`;

export async function checkPageAccess(workspaceId: string): Promise<boolean> {
    
    const session = await getServerSession(authOptions);

    try{
        console.log("Checking access for workspaceId:", workspaceId);
        const res = await fetch(`${pageApiUrl}/check/${workspaceId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
        }
        const data = await res.json();
        if (typeof data !== "boolean") {
            return false;
        }
        return data;
    } catch (error) {
        console.error("Error checking page access:", error);
        return false;
    }
}

export async function createPage(workspaceId: string, title: string): Promise<any> {
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${pageApiUrl}/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({ 
                title: title,
                workspace_id: workspaceId
             })
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
            throw new Error("Failed to create page");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error creating page:", error);
        return null;
    }
}

export async function sharePage(pageId: string, duration: number): Promise<any> {
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${publicpageApiUrl}/create-token`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({
                page_id: pageId,
                duration_hours: duration
             })
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Unauthorized: Please log in.");
            }
            throw new Error("Failed to share page");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error sharing page:", error);
        return null;
    }
}

export async function getPageIdFromPublicToken(token: string): Promise<any> {
    try{
        const res = await fetch(`${publicpageApiUrl}/get-by-token?token=${token}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get page from public token");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error getting page from public token:", error);
        return null;
    }
}