"use client";
import Login from "@/components/sidebar/Auth/login";
import Register from "@/components/sidebar/Auth/register";
import AccountButton from "@/components/sidebar/Auth/account";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";

export default function AuthSection() {
    const { data: session } = useSession();
    const router = useRouter();
    
    const handleLoginClick = () => {
        router.push("/auth/login");
    };

    const handleRegisterClick = () => {
        router.push("/auth/register");
    };

    const handleAccountClick = () => {
        router.push("/auth/account");
    };

    const handleLogoutClick = () => {
        signOut({ callbackUrl: "/auth/login" });
    };
    return(
        <div className="flex flex-col">
            <div className="flex flex-row items-center py-2 group cursor-pointer justify-between mb-2 w-full ">
                <Login
                    onClick={() => {
                        if (session) {
                        handleLogoutClick();
                        } else {
                        handleLoginClick();
                        }
                    }}
                />
                {!session && (
                <Register onClick={() => handleRegisterClick()} />
                )}
            </div>
            {session && (
                <AccountButton onClick={() => handleAccountClick()} />
            )}
        </div>
    );
}