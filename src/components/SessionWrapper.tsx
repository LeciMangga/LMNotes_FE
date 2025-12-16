"use client";

import { SessionProvider } from "next-auth/react";
import {HeroUIProvider} from "@heroui/react";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider><HeroUIProvider>{children}</HeroUIProvider></SessionProvider>;
}