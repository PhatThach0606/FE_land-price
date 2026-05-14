"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { getProfile } from "@/features/user/profile/getProfile";
import { useRouter } from "next/navigation";

import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/user";
import { useTheme } from "@/hooks/theme/useTheme";
import { Bars3Icon } from "@heroicons/react/24/outline";
export default function Navbar({ collapsed, setCollapsed }: any) {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const data = await getProfile();
      setUser(data);
    };
    init();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav
      className="
        h-20
      

        bg-white/80 dark:bg-[#0F172B]
        backdrop-blur-md
        border-b border-slate-200 dark:border-slate-800
        shadow-sm
        flex items-center justify-between px-6
        sticky top-0 z-40
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 w-full max-w-md">
        {/* TOGGLE SIDEBAR */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
        p-2 rounded-lg
        hover:bg-slate-200 dark:hover:bg-slate-700
        transition
      "
        >
          <Bars3Icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        </button>

        {/* SEARCH */}
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Tìm kiếm thửa đất, địa chỉ..."
            className="
          w-full px-4 py-2 pl-10
          border border-slate-200 dark:border-slate-700
          rounded-full text-sm
          bg-slate-50 dark:bg-slate-800
          text-slate-400
          focus:outline-none focus:ring-2 focus:ring-sky-400
        "
          />
          <div className="absolute left-3 top-2.5 text-slate-400">🔍</div>
        </div>
      </div>

      {/* RIGHT giữ nguyên */}

      {/* RIGHT */}
      <div className="flex items-center gap-3 ml-4">
        {/* 🌗 DARK MODE TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
    p-2 rounded-full
    bg-slate-100 dark:bg-slate-800
    cursor-pointer
    hover:bg-slate-200 dark:hover:bg-slate-700
    transition
  "
        >
          {dark ? (
            <SunIcon className="w-5 h-5 text-slate-700" />
          ) : (
            <MoonIcon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* USER NAME */}
        <div className="text-sm text-slate-600 dark:text-slate-300 hidden sm:block">
          <span className="font-semibold ml-1 text-slate-700 dark:text-slate-300">
            {user?.full_name || "User"}
          </span>
        </div>

        {/* AVATAR */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full overflow-hidden shadow hover:scale-105 transition"
          >
            {user?.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" />
            ) : (
              <div
                className="
                w-full h-full
                bg-gradient-to-r from-blue-500 to-cyan-500
                flex items-center justify-center
                text-white text-sm font-semibold
              "
              >
                {user?.full_name?.charAt(0) || "U"}
              </div>
            )}
          </button>

          {/* DROPDOWN */}
          {open && (
            <div
              className="
              absolute right-0 z-50 mt-2 w-40
              bg-white dark:bg-slate-800
text-slate-700 dark:text-slate-400
              rounded-xl shadow-lg overflow-hidden
            "
            >
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="
                  flex items-center gap-2 px-4 py-2 text-sm
                  hover:bg-green-100 dark:hover:bg-green-100
                "
              >
                <UserIcon className="w-4 h-4" />
                Hồ sơ cá nhân
              </Link>

              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center gap-2 px-4 py-2 text-sm
                  text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                "
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
