"use client";
import React from "react";
import Image from "next/image";
import { UserCircle2Icon } from "lucide-react";
import { getSession } from "next-auth/react";


export default function AccountPage() {
    const [user, setUser] = React.useState<{name: string; email: string; imageLink?: string}>({name: "", email: "", imageLink: ""});

    React.useEffect(() => {
        getSession().then((session) => {
            if (session && session.user) {
                console.log("Session user:", session);
                setUser({name: session.user.name || "", email: session.user.email || "", imageLink: session.user.image || ""});
            }
        });
    }, []);

    return (
        <div className="h-full w-full bg-[#2c2c2c] text-white px-10 py-8 overflow-auto">
            <div className="flex items-center gap-3 mb-8">
                <UserCircle2Icon size={40} />
                <h1 className="text-3xl font-semibold">Account Details</h1>
            </div>
            
            <div className="bg-[#3a3a3a] p-6 rounded-2xl w-full max-w-lg shadow-md space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
                    {user.imageLink && (
                        <div className="flex">
                            <Image
                                src={user.imageLink}
                                alt="User Avatar"
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <div>
                            <p className="text-sm text-gray-300">Name</p>
                            <p className="text-xl font-medium mt-1">{user.name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-300">Email</p>
                            <p className="text-xl font-medium mt-1">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}