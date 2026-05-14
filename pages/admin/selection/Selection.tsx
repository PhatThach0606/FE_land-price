"use client";

import { useRouter } from "next/navigation";
import { MapIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Selection() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
      {/* background gradient nhẹ */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-white to-green-100" />

      <div className="relative z-10 w-full max-w-5xl px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Lựa chọn tác vụ
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Chọn chức năng bạn muốn truy cập trong hệ thống WebGIS
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CARD 1 */}
            <div
              onClick={() => router.push("/home")}
              className="
                group cursor-pointer rounded-xl p-6
                border border-slate-200
                bg-white hover:bg-blue-50
                transition-all duration-200
                hover:shadow-md
              "
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition">
                  <MapIcon className="w-6 h-6 text-blue-600" />
                </div>

                <h2 className="text-lg font-medium text-slate-900 group-hover:text-blue-600 transition">
                  Tra cứu thông tin
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                Truy cập bản đồ, dịch vụ GIS và dữ liệu không gian.
              </p>
            </div>

            {/* CARD 2 */}
            <div
              onClick={() => router.push("/dashboard")}
              className="
                group cursor-pointer rounded-xl p-6
                border border-slate-200
                bg-white hover:bg-green-50
                transition-all duration-200
                hover:shadow-md
              "
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-100 group-hover:bg-green-200 transition">
                  <ChartBarIcon className="w-6 h-6 text-green-600" />
                </div>

                <h2 className="text-lg font-medium text-slate-900 group-hover:text-green-600 transition">
                  Quản trị hệ thống
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                Quản lý người dùng, dữ liệu, layer và phân quyền hệ thống.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-6">
          WebGIS Platform • Internal System
        </p>
      </div>
    </div>
  );
}
