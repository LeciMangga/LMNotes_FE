import React from "react";
import {FileText} from "lucide-react";
import { Page } from "@/types/pages";

export default function ListPage(pages_data : Page[]) {
    return (
        pages_data.map((page: Page) => {
            return (
                <React.Fragment key={page.id}>
                    <div className="list-page flex items-center py-2 group">
                        <FileText className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer" />
                        <span className="text-gray-300 group-hover:text-white cursor-pointer truncate">{page.name}</span>
                    </div>
                </React.Fragment>
            );
        })
    );
}