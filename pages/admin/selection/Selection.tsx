"use client";

import { useRouter } from "next/navigation";
import {
  MapIcon,
  ChartBarIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Selection() {
  const router = useRouter();

  const menus = [
    {
      title: "Tra cứu thông tin",
      description:
        "Khám phá dữ liệu bản đồ trực quan, truy xuất thông tin GIS và các dịch vụ không gian nâng cao.",
      icon: MapIcon,
      route: "/home",
      theme: {
        border: "hover:border-blue-500/30",
        glow: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]",
        iconBg: "text-blue-600 bg-blue-50",
        arrowBg: "group-hover:bg-blue-600 group-hover:border-blue-600",
        line: "bg-gradient-to-r from-sky-400 to-blue-600",
      },
    },
    {
      title: "Quản trị hệ thống",
      description:
        "Quản lý tài khoản, phân quyền, cấu hình lớp dữ liệu và giám sát toàn bộ hệ thống WebGIS.",
      icon: ChartBarIcon,
      route: "/dashboard",
      theme: {
        border: "hover:border-emerald-500/30",
        glow: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)]",
        iconBg: "text-emerald-600 bg-emerald-50",
        arrowBg: "group-hover:bg-emerald-600 group-hover:border-emerald-600",
        line: "bg-gradient-to-r from-emerald-400 to-teal-600",
      },
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/80 transition-colors duration-500">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100" />

        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-red-400/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-red-400/10 blur-[130px] rounded-full" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl">
          {/* HEADER */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-600 text-xs font-semibold shadow-sm uppercase tracking-wider">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
              WebGIS Internal Platform
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              LỰA CHỌN
              <span className="block mt-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                TÁC VỤ HỆ THỐNG
              </span>
            </h1>

            {/* <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
              Chọn module ứng dụng bên dưới để bắt đầu làm việc với dữ liệu
              không gian.
            </p> */}
          </div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menus.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  onClick={() => router.push(item.route)}
                  className={`
                    group relative overflow-hidden cursor-pointer
                    rounded-3xl border border-slate-200/80
                    bg-white/90 backdrop-blur-xl
                    p-8 md:p-10
                    transition-all duration-500 ease-out
                    hover:-translate-y-1.5
                    ${item.theme.border}
                    ${item.theme.glow}
                  `}
                >
                  {/* Subtle Top-Light Flare */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none" />

                  {/* CARD HEADER */}
                  <div className="flex items-start justify-between">
                    {/* Icon Box */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${item.theme.iconBg}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Action Arrow Button */}
                    <div
                      className={`w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center transition-all duration-300 ${item.theme.arrowBg}`}
                    >
                      <ArrowRightIcon className="w-4 h-4 text-slate-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="mt-8">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Animated Bottom Progress Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out ${item.theme.line}`}
                  />
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="mt-16 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-slate-400">
              Secure • Modern • GIS Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
