"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Map,
  Route,
  Activity,
  Database,
  ChevronRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { getDashboardData } from "@/features/admin/admin.dashboard";

// --- Sub-components để code sạch hơn ---

const StatCard = ({ title, value, icon: Icon, color, loading }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 shadow-xl shadow-black/20"
  >
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <Activity className="w-4 h-4 text-gray-600" />
    </div>
    <div className="mt-4">
      <h2 className="text-sm text-gray-400 font-medium">{title}</h2>
      {loading ? (
        <div className="h-8 w-24 bg-white/5 animate-pulse rounded mt-1" />
      ) : (
        <p className="text-2xl font-bold mt-1 tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      )}
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    thuaDat: 0,
    giaoThong: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDashboardData();
        setStats({
          users: res.usersTotal,
          thuaDat: res.thuaDatTotal,
          giaoThong: res.giaoThongTotal,
        });
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Data cho Biểu đồ
  const chartData = [
    { name: "Người dùng", value: stats.users, color: "#60a5fa" },
    { name: "Thửa đất", value: stats.thuaDat, color: "#818cf8" },
    { name: "Giao thông", value: stats.giaoThong, color: "#34d399" },
  ];

  const quickNav = [
    {
      name: "Quản lý Người dùng",
      icon: Users,
      href: "/user",
      color: "text-blue-400",
    },
    {
      name: "Quản lý Thửa đất",
      icon: Map,
      href: "/thuadat",
      color: "text-indigo-400",
    },
    {
      name: "Quản lý Giao Thông",
      icon: Route,
      href: "/giaothong",
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="bg-[#0b1220] min-h-full text-white px-6 py-8 space-y-6 overflow-x-hidden">
      {/* HEADER */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Tổng quan hệ thống
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Trình quản trị dữ liệu không gian thời gian thực
          </p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-500 text-[10px] font-bold uppercase tracking-wider">
            Server Online
          </span>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Người dùng"
          value={stats.users}
          icon={Users}
          color="text-blue-400"
          loading={loading}
        />
        <StatCard
          title="Thửa đất"
          value={stats.thuaDat}
          icon={Map}
          color="text-indigo-400"
          loading={loading}
        />
        <StatCard
          title="Giao thông"
          value={stats.giaoThong}
          icon={Route}
          color="text-emerald-400"
          loading={loading}
        />
        <StatCard
          title="Trạng thái"
          value="ỔN ĐỊNH"
          icon={Activity}
          color="text-green-400"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART - TỔNG QUAN DỮ LIỆU */}
        <div className="lg:col-span-2 bg-[#111a2e] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Database size={120} />
          </div>

          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Phân tích tỷ trọng dữ liệu
          </h3>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111a2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QUICK NAVIGATION - ĐIỀU HƯỚNG THẬT */}
        <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-6 tracking-tight">
            Truy cập nhanh
          </h3>
          <nav className="space-y-3">
            {quickNav.map((item, i) => (
              <Link key={i} href={item.href}>
                <div className="group w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-transparent hover:border-white/10 hover:bg-white/[0.08] transition-all mb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg bg-gray-900 group-hover:scale-110 transition-transform ${item.color}`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* FOOTER SYSTEM STATUS */}
      <footer className="bg-gradient-to-r from-indigo-500/5 to-transparent border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-500/20 p-3 rounded-full">
            <Database className="text-indigo-400 w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm">PostgreSQL + PostGIS</h4>
            <p className="text-xs text-gray-500">
              Cơ sở dữ liệu đang kết nối qua cổng 5432
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 italic">
            Cập nhật lần cuối: {new Date().toLocaleTimeString("vi-VN")}
          </p>
        </div>
      </footer>
    </div>
  );
}
