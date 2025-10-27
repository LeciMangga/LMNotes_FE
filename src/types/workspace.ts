import { Page } from "./pages";
export interface Workspace_list {
    workspaces: Workspace[];
}

export interface Workspace {
    id: number;
    name: string;
    pages: Page[];
}