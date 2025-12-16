import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const backendUrl = process.env.BACKEND_URL;
const publicBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                Email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try{
                    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.Email,
                            password: credentials?.password
                        })
                    });
                    if (res.status == 401) {
                        throw new Error("Invalid credentials");
                    }
                    if (!res.ok) {
                        throw new Error("Failed to authenticate");
                    }
                    const tokenData = await res.json()
                    return {
                        id: credentials?.Email || '',
                        email: credentials?.Email || '',
                        name: tokenData.username || '',
                        accessToken: tokenData.access_token || '',
                        tokenType: tokenData.token_type || ''
                    };
                } catch (error) {
                    console.error("Error during authentication:", error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                if (account.provider === "google"){
                    token.accessToken = account.id_token;
                } else {
                    token.accessToken = account.access_token;
                }
                token.tokenType = account.token_type;
                token.provider = account.provider;
            }
            if (user) {
                token.name = (user as any).name;
                if (!token.accessToken && (user as any).accessToken) {
                    token.accessToken = (user as any).accessToken;
                }
                if (!token.tokenType && (user as any).tokenType) {
                    token.tokenType = (user as any).tokenType;
                }
                if (!token.provider && (user as any).provider) {
                    token.provider = "credentials";
                }
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session as any).tokenType = token.tokenType;
            (session as any).name = token.name;
            (session as any).provider = token.provider;
            return session;
        },
        async signIn({user, account, profile, email, credentials}) {
            console.log("SignIn account:", account?.provider);
            if (account?.provider === "github" || account?.provider === "google") {
                try {
                    await register(user.name || '', user.email || '', "oauth_default_password");
                } catch (err) {
                    console.error("Failed to register user:", err);
                }
            }
            return true;
        }
    }
}

export default async function register(username: string,email: string, password: string) {
    try{
        const res = await fetch(`${publicBackendUrl}/api/v1/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        });
        if (!res.ok) {
            if (res.status === 400) {
                const errorData = await res.json();
                console.error("Registration error details:", errorData);
                return { error: "Email already in use" };
            }
            throw new Error("Failed to register");
        }
        const data = await res.json();
        console.log("Registration successful:", data);
        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}


export async function getUserbyEmail(email: string) {
    try{
        const res = await fetch(`${publicBackendUrl}/api/v1/users/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            throw new Error("Failed to fetch user");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
}