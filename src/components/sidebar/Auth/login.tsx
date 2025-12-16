import { useSession } from "next-auth/react";

export default function Login({onClick}: {onClick?: () => void}) {
    const { data: session } = useSession();
    return (
        <div className="bg-[#e3e3e3] text-[#1e1e1e] group-hover:text-[#000000] items-center justify-center cursor-pointer px-4 mx-1 py-2 rounded-lg w-full mr-2" onClick={onClick}>
            {session ? "Log Out" : "Log In"}
        </div>
    )
}