import React from "react";
import logo from '@/assets/logo.svg';
import Image from "next/image";

export default function Header() {
    return (
        <header className="site-header flex items-center p-4 w-full bg-[#1e1e1e] h-full">
            <Image className="h-8 w-8 pb-1" src={logo} alt="LMNotes Logo" />
            <div className="mx-2" />
            <h3 className="site-title text-3xl font-normal">Welcome, User</h3>
            <nav className="site-nav">
            </nav>
        </header>
    );
}