"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar-client/Sidebar";
import AiChatBot from "@/components/Chatbot/AiChatbot";

type TProps = { children: React.ReactNode };
export default function ClientLayout({ children }: TProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} />

      <div
        className={`
          flex-1 min-h-screen transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="">{children}</div>
        <AiChatBot />
      </div>
    </div>
  );
}
