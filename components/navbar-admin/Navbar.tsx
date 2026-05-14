"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/store/search";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/user";
import { getProfile } from "@/features/user/profile/getProfile";
import SearchInput from "./subNavbar";

type SearchType = "thuaDat" | "giaoThong" | "user";

// Cấu hình các route tương ứng với loại tìm kiếm
const ROUTE_CONFIG: Record<string, { type: SearchType; label: string }> = {
  "/thuadat": { type: "thuaDat", label: "Thửa đất" },
  "/giaothong": { type: "giaoThong", label: "Giao thông" },
  "/user": { type: "user", label: "Người dùng" },
};

export default function Navbar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const { user, setUser } = useUserStore();
  const pathname: any = usePathname();
  const { setSearch } = useSearchStore();

  // Xác định cấu hình dựa trên pathname
  const currentConfig = Object.entries(ROUTE_CONFIG).find(([path]) =>
    pathname.startsWith(path),
  )?.[1];

  const [searchParams, setSearchParams] = useState({
    so_to: "",
    so_thua: "",
    loai_dat: "",
    ten_duong: "",
    doan_duong: "",
    full_name: "",
    email: "",
    phone: "",
  });

  // Tự động reset params khi chuyển trang
  useEffect(() => {
    setSearchParams({
      so_to: "",
      so_thua: "",
      loai_dat: "",
      ten_duong: "",
      doan_duong: "",
      full_name: "",
      email: "",
      phone: "",
    });
  }, [pathname]);

  useEffect(() => {
    if (!user) getProfile().then(setUser);
  }, [user, setUser]);

  const updateParam = (key: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = useCallback(() => {
    if (!currentConfig) return;

    let keyword = "";
    const { type } = currentConfig;

    if (type === "thuaDat") {
      const { so_to, so_thua } = searchParams;
      keyword =
        so_to && so_thua ? `${so_to} ${so_thua}` : so_to || so_thua || "";
    } else if (type === "giaoThong") {
      const { ten_duong, doan_duong } = searchParams;
      keyword =
        ten_duong && doan_duong
          ? `${ten_duong} ${doan_duong}`
          : ten_duong || doan_duong || "";
    } else if (type === "user") {
      keyword =
        searchParams.full_name ||
        searchParams.email ||
        searchParams.phone ||
        "";
    }

    setSearch(type, keyword);
  }, [currentConfig, searchParams, setSearch]);

  const renderInputs = useMemo(() => {
    if (!currentConfig) return null;

    const inputStyle = "flex items-center gap-0 divide-x divide-white/5 w-full";
    const onEnter = (e: React.KeyboardEvent) =>
      e.key === "Enter" && handleSearch();

    switch (currentConfig.type) {
      case "thuaDat":
        return (
          <div className={inputStyle}>
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Số tờ"
              value={searchParams.so_to}
              onChange={(e) => updateParam("so_to", e.target.value)}
            />
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Số thửa"
              value={searchParams.so_thua}
              onChange={(e) => updateParam("so_thua", e.target.value)}
            />
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Loại đất"
              value={searchParams.loai_dat}
              onChange={(e) => updateParam("loai_dat", e.target.value)}
            />
          </div>
        );
      case "giaoThong":
        return (
          <div className={inputStyle}>
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Tên đường"
              value={searchParams.ten_duong}
              onChange={(e) => updateParam("ten_duong", e.target.value)}
            />
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Đoạn đường"
              value={searchParams.doan_duong}
              onChange={(e) => updateParam("doan_duong", e.target.value)}
            />
          </div>
        );
      case "user":
        return (
          <div className={inputStyle}>
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Họ tên"
              value={searchParams.full_name}
              onChange={(e) => updateParam("full_name", e.target.value)}
            />
            <SearchInput
              onKeyDown={onEnter}
              placeholder="Email"
              value={searchParams.email}
              onChange={(e) => updateParam("email", e.target.value)}
            />
            <SearchInput
              onKeyDown={onEnter}
              placeholder="SĐT"
              value={searchParams.phone}
              onChange={(e) => updateParam("phone", e.target.value)}
            />
          </div>
        );
    }
  }, [currentConfig, searchParams, handleSearch]);

  const isDashboard = pathname === "/dashboard" || pathname === "/";

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.06] bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1 max-w-5xl">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all active:scale-95 border border-white/[0.05]"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        {!isDashboard && currentConfig ? (
          <div className="flex items-center flex-1 bg-slate-950/40 border border-white/[0.08] rounded-2xl p-1 focus-within:border-cyan-500/40 focus-within:ring-4 focus-within:ring-cyan-500/5 transition-all duration-300">
            {/* Nhãn hiển thị loại đang tìm kiếm (thay cho dropdown) */}
            <div className="px-4 py-2 bg-white/[0.03] rounded-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 whitespace-nowrap">
                {currentConfig.label}
              </span>
            </div>

            <div className="w-[1px] h-5 bg-white/10 mx-1" />
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-500 ml-2 shrink-0" />

            <div className="flex-1 overflow-hidden">{renderInputs}</div>

            <button
              onClick={handleSearch}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/20 active:scale-95 ml-1"
            >
              Tìm kiếm
            </button>
          </div>
        ) : (
          <div className="flex items-center ml-2">
            <h1 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
              Hệ thống quản lý
            </h1>
          </div>
        )}
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4 ml-8">
        <div className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group">
          <div className="text-right hidden lg:block">
            <p className="text-[13px] font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
              {user?.full_name || "Quản trị viên"}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter opacity-70">
              {user ? "Chuyên viên kỹ thuật" : "Guest Mode"}
            </p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl border border-white/10 p-0.5 group-hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-full h-full rounded-[14px] overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                    <UserCircleIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-slate-900 rounded-full shadow-lg shadow-emerald-500/20" />
          </div>
        </div>
      </div>
    </header>
  );
}
