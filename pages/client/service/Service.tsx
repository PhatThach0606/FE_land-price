"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  MapIcon,
  Square3Stack3DIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

// animation config
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Service() {
  const router = useRouter();

  const services = [
    {
      title: "Tra cứu Thông tin Đất đai",
      icon: MagnifyingGlassIcon,
      color: "bg-blue-50 text-blue-600",
      desc: "Truy vấn dữ liệu địa chính, diện tích, mục đích sử dụng và pháp lý của từng thửa đất.",
      action: () => router.push("/map"),
      tag: "Dữ liệu thực",
    },
    {
      title: "Bản đồ Quy hoạch Trực tuyến",
      icon: MapIcon,
      color: "bg-emerald-50 text-emerald-600",
      desc: "Xem trực quan các lớp quy hoạch giao thông và phát triển đô thị.",
      action: () => router.push("/map"),
      tag: "Cập nhật 2026",
    },
    {
      title: "Phân tích Vị trí & Giá đất",
      icon: Square3Stack3DIcon,
      color: "bg-amber-50 text-amber-600",
      desc: "Xác định vị trí thửa đất phục vụ định giá và quản lý.",
      action: () => router.push("/map"),
      tag: "Độ chính xác cao",
    },
    {
      title: "Công cụ Đo đạc & Tính toán",
      icon: Square3Stack3DIcon, // fix thiếu icon
      color: "bg-rose-50 text-rose-600",
      desc: "Đo khoảng cách, diện tích và chu vi trực tiếp trên WebGIS.",
      action: () => router.push("/map"),
    },
    {
      title: "Thống kê & Báo cáo số",
      icon: ChartBarIcon,
      color: "bg-indigo-50 text-indigo-600",
      desc: "Tổng hợp dữ liệu phục vụ quản lý nhà nước.",
      action: () =>
        alert("Tính năng dành cho quản trị viên đang được bảo trì 😎"),
    },
    {
      title: "Trợ lý ảo AI Bến Thành",
      icon: CpuChipIcon,
      color: "bg-purple-50 text-purple-600",
      desc: "Hỗ trợ tra cứu thủ tục hành chính bằng AI.",
      action: () => alert("Nhấn vào chatbot góc phải để sử dụng!"),
      tag: "Smart City",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HEADER */}
      <section className="bg-white border-b pt-20 pb-16 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Hệ Thống Dịch Vụ Công Số
          </h1>
          <p className="text-lg text-slate-600">
            Ứng dụng WebGIS và AI trong quản lý đô thị, cung cấp dữ liệu minh
            bạch và nhanh chóng.
          </p>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              onClick={item.action}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-8 shadow-sm border cursor-pointer 
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Badge */}
              {item.tag && (
                <span className="absolute top-4 right-6 bg-white border text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider text-slate-400">
                  {item.tag}
                </span>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6">{item.desc}</p>

              {/* Action */}
              <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                Truy cập ứng dụng
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-blue-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bạn cần hỗ trợ trực tiếp?
          </h2>
          <p className="text-blue-100 mb-10 max-w-xl mx-auto">
            Hệ thống WebGIS hoạt động 24/7, sẵn sàng phục vụ người dân.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/map")}
              className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-2xl transition-all active:scale-95"
            >
              Mở Bản Đồ WebGIS
            </button>

            <button
              onClick={() => alert("Tổng đài: (028) 3829 7453")}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl"
            >
              Liên hệ kỹ thuật
            </button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t">
        <p className="text-slate-400 text-xs uppercase tracking-[0.2em]">
          © 2026 Trung tâm Chuyển đổi số - Phường Bến Thành, Quận 1
        </p>
      </footer>
    </div>
  );
}
