"use client";

import React from "react";
import Sidebar from "./sidebar";

export default function SidebarArea() {
  return (
    <div className="fixed top-[100px] bottom-0 bg-[#1e1e1e] flex-shrink-0 w-16 md:w-64">
      <Sidebar />
    </div>
  );
}
