import { Page } from "./pages";
export interface Workspace_list {
    workspaces: Workspace[];
}

export interface Workspace {
    workspace_id: string;
    name: string;
    description: string;
    pages: Page[];
}