

export default function Login({onClick}: {onClick?: () => void}) {
    return (
        <div className="bg-[#e3e3e3] text-[#1e1e1e] group-hover:text-[#000000] cursor-pointer px-4 py-2 rounded-lg" onClick={onClick}>Sign In</div>
    )
}