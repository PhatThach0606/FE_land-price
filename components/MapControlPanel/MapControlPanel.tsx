"use client";

import { useState } from "react";
import {
  Squares2X2Icon,
  PaintBrushIcon,
  MapIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const baseMaps = {
  google: { name: "Google Map" },
  esri: { name: "Street (Google-like)" },
  voyager: { name: "Voyager" },
  dark: { name: "Dark" },
};

type LayerKey = "benThanh" | "trafficLogic" | "lineString";

type Props = {
  baseMap: string;

  setBaseMap: (val: string) => void;

  layers: {
    benThanh: boolean;
    trafficLogic: boolean;
    lineString: boolean;
  };
  toggleLayer: (key: LayerKey) => void;

  styleSettings: {
    landFillOpacity: number;
    landWeight: number;

    roadFillOpacity: number;
    roadWeight: number;

    lineOpacity: number;
    lineWeight: number;
  };

  setStyleSettings: React.Dispatch<
    React.SetStateAction<{
      landFillOpacity: number;
      landWeight: number;

      roadFillOpacity: number;
      roadWeight: number;

      lineOpacity: number;
      lineWeight: number;
    }>
  >;
};
export default function MapControlPanel({
  baseMap,
  setBaseMap,
  layers,
  toggleLayer,
  styleSettings,
  setStyleSettings,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<
    "base" | "layers" | "style" | null
  >("layers");

  const toggleSection = (section: "base" | "layers" | "style") => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] max-sm:top-auto max-sm:bottom-4 max-sm:right-4 max-sm:left-4">
      <div className="relative flex flex-col items-end max-sm:items-stretch">
        {/* NÚT BẤM KÍCH HOẠT */}
        <button
          onClick={() => setOpen(!open)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg
            backdrop-blur-md cursor-pointer transition-all duration-200 border
            ${
              open
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
            }
          `}
        >
          <Squares2X2Icon className="w-5 h-5" />
          <span className="text-sm font-medium max-sm:hidden">
            Bảng điều khiển
          </span>
          {open && <XMarkIcon className="w-4 h-4 ml-1 sm:hidden" />}
        </button>

        {/* MENU THẢ XUỐNG / BOTTOM PANEL */}
        {open && (
          <div
            className="
              absolute right-0 top-14 w-72 rounded-2xl
              bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl
              border border-slate-200 dark:border-slate-800 p-3 flex flex-col
              animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200
              cursor-pointer
              /* Thiết lập Mobile Responsive (Biến thành thanh trượt phía dưới) */
              max-sm:fixed max-sm:bottom-20 max-sm:top-auto max-sm:left-4 max-sm:right-4 max-sm:w-auto
              max-h-[60vh] sm:max-h-[80vh]
            "
          >
            {/* Vùng nội dung có thanh cuộn tự động nếu quá dài */}
            <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {/* PHẦN 1: BASE MAP */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("base")}
                  className="w-full flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <MapIcon className="w-4 h-4 text-slate-500" />
                    Bản đồ nền
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSection === "base" ? "rotate-180" : ""}`}
                  />
                </button>

                {openSection === "base" && (
                  <div className="p-2 bg-white dark:bg-slate-900/50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {Object.entries(baseMaps).map(([key, map]) => (
                      <button
                        key={key}
                        onClick={() => setBaseMap(key)}
                        className={`
                          w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm transition-all
                          ${
                            baseMap === key
                              ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }
                        `}
                      >
                        {map.name}
                        <div
                          className={`w-2 h-2 rounded-full ${baseMap === key ? "bg-blue-500" : "bg-transparent border border-slate-300 dark:border-slate-600"}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PHẦN 2: LAYERS */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("layers")}
                  className="w-full flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Squares2X2Icon className="w-4 h-4 text-slate-500" />
                    Lớp dữ liệu
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSection === "layers" ? "rotate-180" : ""}`}
                  />
                </button>

                {openSection === "layers" && (
                  <div className="p-2 bg-white dark:bg-slate-900/50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {[
                      { key: "benThanh", label: "Thửa đất" },
                      { key: "trafficLogic", label: "Giao thông" },
                      { key: "lineString", label: "Tim đường" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 rounded-lg"
                      >
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.label}
                        </span>
                        <button
                          onClick={() => toggleLayer(item.key as LayerKey)}
                          className={`
                            w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none
                            ${layers[item.key as keyof typeof layers] ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}
                          `}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${layers[item.key as keyof typeof layers] ? "translate-x-4" : "translate-x-0"}`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PHẦN 3: STYLE CONTROLS */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("style")}
                  className="w-full flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <PaintBrushIcon className="w-4 h-4 text-slate-500" />
                    Tùy chỉnh Style
                  </div>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSection === "style" ? "rotate-180" : ""}`}
                  />
                </button>

                {openSection === "style" && (
                  <div className="p-3 bg-white dark:bg-slate-900/50 space-y-4 max-h-64 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* Hộp slider dùng chung cấu trúc */}
                    {[
                      {
                        label: "Thửa đất - Độ đậm",
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: styleSettings.landFillOpacity,
                        key: "landFillOpacity",
                      },
                      {
                        label: "Thửa đất - Viền",
                        min: 0.5,
                        max: 5,
                        step: 0.5,
                        value: styleSettings.landWeight,
                        key: "landWeight",
                      },
                      {
                        label: "Giao thông - Độ đậm",
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: styleSettings.roadFillOpacity,
                        key: "roadFillOpacity",
                      },
                      {
                        label: "Giao thông - Độ dày",
                        min: 1,
                        max: 10,
                        step: 0.5,
                        value: styleSettings.roadWeight,
                        key: "roadWeight",
                      },
                      {
                        label: "Tim đường - Độ đậm",
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: styleSettings.lineOpacity,
                        key: "lineOpacity",
                      },
                      {
                        label: "Tim đường - Độ dày",
                        min: 1,
                        max: 10,
                        step: 0.5,
                        value: styleSettings.lineWeight,
                        key: "lineWeight",
                      },
                    ].map((slider) => {
                      // Tính toán phần trăm (%) đã kéo để làm hiệu ứng thanh Volume
                      const percentage =
                        ((slider.value - slider.min) /
                          (slider.max - slider.min)) *
                        100;

                      return (
                        <div key={slider.key} className="space-y-2 py-1.5">
                          {/* Tiêu đề lớp (Đã ẩn phần hiển thị số) */}
                          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            {slider.label}
                          </div>

                          <div className="relative flex items-center group">
                            <input
                              type="range"
                              min={slider.min}
                              max={slider.max}
                              step={slider.step}
                              value={slider.value}
                              onChange={(e) =>
                                setStyleSettings((prev) => ({
                                  ...prev,
                                  [slider.key]: Number(e.target.value),
                                }))
                              }
                              style={{
                                // Tạo hiệu ứng màu fill chuẩn Volume: Bên trái xanh lam, bên phải xám nhạt
                                backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
                              }}
                              className="
            w-full h-2 rounded-full appearance-none cursor-pointer bg-no-repeat transition-all
            dark:[style*='--tw-bg-opacity'] /* Để tương thích mượt với cả Dark Mode */
            
            /* Custom nút vặn Tròn (Thumb) - Hiển thị rõ ràng và tương tác mượt */
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:dark:bg-blue-500
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:dark:border-slate-900
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-100
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-webkit-slider-thumb]:active:scale-95

            /* Hỗ trợ hiển thị trên Firefox */
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-blue-600
            [&::-moz-range-thumb]:dark:bg-blue-500
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:dark:border-slate-900
            [&::-moz-range-thumb]:transition-transform
            [&::-moz-range-thumb]:duration-100
            [&::-moz-range-thumb]:hover:scale-125
            [&::-moz-range-thumb]:border-none
          "
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
