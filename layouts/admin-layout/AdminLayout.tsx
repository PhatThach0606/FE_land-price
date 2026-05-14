"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar-admin/Sidebar";
import Navbar from "@/components/navbar-admin/Navbar";
import { motion, AnimatePresence } from "framer-motion";

type TProps = { children: React.ReactNode };

export default function AdminLayout({ children }: TProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-[#020617] text-slate-200 h-screen w-full overflow-hidden font-sans">
      {/* 1. Sidebar - Fixed hoặc Relative tùy vào component Sidebar của bạn */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 2. Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        {/* Background Decor - Tạo hiệu ứng chiều sâu cho toàn bộ admin */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        </div>

        {/* 3. Navbar - Luôn nằm trên cùng */}
        <div className="z-20">
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* 4. Content Area */}
        <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
              flex-1 
              bg-slate-900/40 
              backdrop-blur-md 
              border border-white/[0.05] 
              rounded-[1.5rem] 
              overflow-hidden
              flex flex-col
              shadow-2xl shadow-black/20
            "
          >
            {/* 
                Container bên trong cùng:
                - overflow-y-auto để chỉ cuộn phần nội dung chính
                - H-full để chiếm trọn không gian card
            */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
              {children}
            </div>
          </motion.div>
        </main>
      </div>

      {/* CSS Global tối ưu cho scrollbar trong layout admin */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
