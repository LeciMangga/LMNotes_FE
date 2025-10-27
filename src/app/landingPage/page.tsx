import Logo from "@/assets/logo_text.svg";
import Image from "next/image";
import {Plus} from "lucide-react";

export default function LandingPage(){
    return (
        <div className="h-full bg-[#2c2c2c] flex px-4 py-8 flex-col">
            <div>
                <h3 className="text-4xl text-white">Welcome to LM Notes</h3>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <Image src={Logo} alt="LM Notes Logo" className="w-48 h-auto mt-4"/>
                <div className="flex flex-row justify-center mt-8 space-x-4">
                    <div className="text-white flex flex-row items-center justify-center mt-4 hover:bg-[#3f3f3f] p-1 rounded cursor-pointer">
                        <Plus className="mr-2"/>
                        <p className="text-center">Create New Workspace</p>
                    </div>
                    <div className="text-white flex flex-row items-center justify-center mt-4 hover:bg-[#3f3f3f] p-1 rounded cursor-pointer">
                        <Plus className="mr-2"/>
                        <p className="text-center">Open Existing Workspace</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}