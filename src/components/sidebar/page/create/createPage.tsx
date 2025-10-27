import React from "react";
import { Plus } from "lucide-react";

export default function CreatePage() {
    return (
        <div className="create-page flex items-center py-2 group">
            <Plus className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer" />
            <span className="text-gray-300 group-hover:text-white cursor-pointer">Create Page</span>
        </div>
    );
}