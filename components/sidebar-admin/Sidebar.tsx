"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import {
  ChartBarIcon,
  UserIcon,
  MapIcon,
  Squares2X2Icon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Tổng quan", path: "/dashboard", icon: ChartBarIcon },
  { name: "Người dùng", path: "/user", icon: UserIcon },
  { name: "Thửa đất", path: "/thuadat", icon: Squares2X2Icon },
  { name: "Giao thông", path: "/giaothong", icon: TruckIcon },
];

export default function Sidebar({ collapsed, setCollapsed }: any) {
  const router = useRouter();
  const pathname: any = usePathname();
  const { user } = useUserStore();

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
        transition-all duration-300
        bg-white/5 backdrop-blur-xl border-r border-white/10
        p-4 flex flex-col
      `}
    >
      {/* LOGO */}
      <div className="mb-8 flex items-center justify-between">
        <div
          onClick={() => {
            if (user?.role === "ADMIN") {
              router.push("/selection");
            } else {
              router.push("/dashboard");
            }
          }}
          className={`
            flex items-center cursor-pointer
            ${collapsed ? "justify-center w-full" : "gap-2"}
            hover:opacity-80 transition
          `}
          title="Trang điều hướng"
        >
          <img src="/logo.png" className="w-9 h-9" />

          {!collapsed && (
            <span className="text-lg font-bold text-cyan-400">
              Quản lý dữ liệu
            </span>
          )}
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          // ✅ active chuẩn hơn (hỗ trợ /users/123)
          const active = pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              title={collapsed ? item.name : ""}
              className={`
                flex items-center
                ${collapsed ? "justify-center" : "gap-3"}
                px-4 py-3 rounded-xl cursor-pointer
                transition-all duration-200 group

                ${
                  active
                    ? "bg-cyan-500/20 text-cyan-300 shadow-lg"
                    : "hover:bg-white/10 text-gray-300"
                }
              `}
            >
              <Icon
                className={`
                  w-5 h-5 transition
                  ${
                    active
                      ? "text-cyan-300"
                      : "text-gray-400 group-hover:text-white"
                  }
                `}
              />

              {!collapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto text-xs text-gray-500 text-center">
        {!collapsed && "© WebGIS Admin 2026"}
      </div>
    </aside>
  );
}
