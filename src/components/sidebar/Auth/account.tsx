import { UserCircle2Icon } from "lucide-react";

export default function AccountButton({onClick}: {onClick?: () => void}) {
    return (
        <div className="flex flex-row justify-around bg-[#2c2c2c] text-[#f5f5f5] group-hover:text-[#e3e3e3] cursor-pointer px-10 py-2 rounded-lg" onClick={onClick}>
            <UserCircle2Icon/>
            Account
        </div>
    );
}