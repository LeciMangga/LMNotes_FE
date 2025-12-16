"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import Logo from "@/assets/logo_circled.svg";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoadingCredentials, setIsLoadingCredentials] = React.useState(false);
    const [isLoadingGithub, setIsLoadingGithub] = React.useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoadingCredentials(true);
        const result = await signIn("credentials", {
            redirect: false,
            Email: email,
            password: password,
        });
        if (result?.error) {
            setError("Invalid email or password");
        } else {
            window.dispatchEvent(new Event("refresh-workspace"));
            router.push("/");
        }
        setIsLoadingCredentials(false);
    };

    const handleGitHubLogin = async () => {
        setIsLoadingGithub(true);
        await signIn("github", { callbackUrl: "/" });
        window.dispatchEvent(new Event("refresh-workspace"));
        setIsLoadingGithub(false);
    };
    const handleGoogleLogin = async () => {
        setIsLoadingGoogle(true);
        await signIn("google", { callbackUrl: "/" });
        window.dispatchEvent(new Event("refresh-workspace"));
        setIsLoadingGoogle(false);
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image src={Logo} alt="LM Notes Logo" className="mx-auto h-40 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>
             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                        <div className="mt-2">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email" 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-grey-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                        </div>
                        <div className="mt-2">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6" />
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div>
                        {isLoadingCredentials ? (
                            <div className="flex items-center justify-center h-10">
                                <div className="h-10 w-10 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
                            </div>
                        ) : (
                            <button
                            type="submit"
                            className="cursor-pointer flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            disabled={isLoadingCredentials}
                            >
                            Sign in
                            </button>
                        )}
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#2c2c2c] text-gray-100">Or</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        {isLoadingGithub ? (
                        <div className="flex items-center justify-center h-10">
                            <div className="h-10 w-10 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
                        </div>
                        ) : (
                        <button
                            onClick={handleGitHubLogin}
                            disabled={isLoadingGithub}
                            className="cursor-pointer flex w-full justify-center items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                            Sign in with GitHub
                        </button>
                        )}
                    </div>
                    <div className="mt-4">
                        {isLoadingGoogle ? (
                        <div className="flex items-center justify-center h-10">
                            <div className="h-10 w-10 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
                        </div>
                        ) : (
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoadingGoogle}
                                className="cursor-pointer flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
                                    <path
                                        fill="#4285F4"
                                        d="M533.5 278.4c0-17.4-1.4-34.1-4-50.3H272v95.3h146.9c-6.3 34-25 62.8-53.4 82l86.3 67.1c50.3-46.4 81.7-114.8 81.7-194.1z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M272 544.3c72.7 0 133.7-24 178.3-65.4l-86.3-67.1c-23.9 16.1-54.5 25.5-92 25.5-70.7 0-130.6-47.7-152.1-111.6H28.4v69.8C73.4 477.2 166.6 544.3 272 544.3z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M119.9 325.7c-10.8-32-10.8-66.7 0-98.7V157.2H28.4c-38.2 76.3-38.2 165.6 0 241.9l91.5-73.4z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M272 107.7c39.6 0 75 13.6 103.1 40.3l77.2-77.2C405.7 24 344.7 0 272 0 166.6 0 73.4 67.1 28.4 157.2l91.5 69.8C141.4 155.3 201.3 107.7 272 107.7z"
                                    />
                                </svg>
                                Sign in with Google
                            </button>
                        )}
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-100">
                    Don't have an account?{" "}
                    <button
                        onClick={() => router.push("/auth/register")}
                        className="font-semibold text-gray-400 hover:text-gray-300"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}