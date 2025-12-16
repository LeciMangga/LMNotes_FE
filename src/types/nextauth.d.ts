import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    tokenType?: string;
    name?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      tokenType?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    tokenType?: string;
    name?: string;
  }
}
