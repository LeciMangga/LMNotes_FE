"use client";
import React from "react";
import logo from '@/assets/logo.svg';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <header className="site-header flex items-center p-4 w-full bg-[#1e1e1e] h-full">
            <div className=" cursor-pointer flex"  onClick={() => router.push('/')}>
                <Image className="h-8 w-8 pb-1" src={logo} alt="LMNotes Logo" />
                <div className="mx-2" />
                <h3 className="site-title text-3xl font-normal">Welcome, {session?.user?.name || "User"}</h3>
            </div>
        </header>
    );
}