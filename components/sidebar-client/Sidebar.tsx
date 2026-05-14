"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  MapIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const menu = [
    { name: "Trang chủ", href: "/home", icon: HomeIcon },
    { name: "Bản đồ", href: "/map", icon: MapIcon },
    { name: "Dịch vụ", href: "/service", icon: WrenchScrewdriverIcon },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`
        ${collapsed ? "w-20" : "w-64"}
        h-screen fixed left-0 top-0 z-40
        transition-all duration-300

        bg-white/60 dark:bg-[#0F172B]
        backdrop-blur-lg

        border-r border-slate-200/70 dark:border-slate-800/70
        shadow-sm

        text-slate-800 dark:text-slate-200
      `}
      >
        {/* Logo */}
        <div
          onClick={(e) => {
            if (e.ctrlKey && user?.role === "ADMIN") {
              router.push("/selection");
            } else {
              router.push("/home");
            }
          }}
          className={`
    flex items-center cursor-pointer
    ${collapsed ? "justify-center" : "gap-2"}
    p-5 font-bold
    border-b border-slate-200 dark:border-slate-800
    hover:bg-slate-100 dark:hover:bg-slate-800
    transition
  `}
        >
          <img className="w-10 h-10" src="/logo.png" alt="logo" />
          {!collapsed && <span>Phường Bến Thành</span>}
        </div>
        {/* Menu */}
        <ul className="mt-4 space-y-1 px-3">
          {menu.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
    ${collapsed ? "justify-center" : ""}

    ${
      active
        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
        : "text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-white"
    }
  `}
                >
                  <Icon className="w-5 h-5" />

                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
