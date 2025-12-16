import { useSession } from "next-auth/react";

export default function Register({onClick}: {onClick?: () => void}) {
    const { data: session } = useSession();
    return (
        <>
            {session ? null : <div className="bg-[#2c2c2c] text-[#f5f5f5] group-hover:text-[#e3e3e3] cursor-pointer px-4 py-2 rounded-lg" onClick={onClick}>Register</div>}
        </>
    );
}