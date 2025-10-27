import React from "react";
import logo from '../../assets/plus.svg';
import Image from "next/image"
import { Plus } from "lucide-react";


export default function CreateWorkspace() {
    return (
        <div className="create-workspace flex items-center py-2 group">
            <Plus className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white cursor-pointer" />
            <span className="text-gray-300 group-hover:text-white cursor-pointer">Create New Workspace</span>
            
        </div>
    );
}