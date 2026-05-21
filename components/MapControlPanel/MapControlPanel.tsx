"use client";

import { useState } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

const baseMaps = {
  google: {
    name: "google map",
  },
  esri: {
    name: "Street (Google-like)",
  },
  voyager: {
    name: "Voyager",
  },
  dark: {
    name: "Dark",
  },
};

type LayerKey = "benThanh" | "traffic" | "lineString";

type Props = {
  baseMap: string;
  setBaseMap: (val: string) => void;

  layers: {
    benThanh: boolean;
    traffic: boolean;
    lineString: boolean;
  };

  toggleLayer: (key: LayerKey) => void;
};

export default function MapControlPanel({
  baseMap,
  setBaseMap,
  layers,
  toggleLayer,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <div className="relative">
        {/* BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="
    flex items-center gap-2
    px-3 py-2 rounded-xl
    bg-white/80 dark:bg-slate-900/80
    backdrop-blur-md
    shadow-md
    border border-gray-200 dark:border-slate-700
    hover:bg-white dark:hover:bg-slate-800
    transition-colors duration-200
  "
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Squares2X2Icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </div>

          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              open ? "bg-blue-500" : "bg-gray-300 dark:bg-slate-600"
            }`}
          />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div
            className="
          absolute right-0 top-14
          w-64 rounded-2xl
          bg-white/90 dark:bg-slate-900/95
          backdrop-blur-xl
          shadow-2xl
          border border-gray-200 dark:border-slate-700
          p-4 space-y-4
          animate-in fade-in zoom-in-95 duration-300
        "
          >
            {/* BASE MAP */}
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">
                Base Map
              </div>

              <div className="space-y-2">
                {Object.entries(baseMaps).map(([key, map]) => (
                  <button
                    key={key}
                    onClick={() => setBaseMap(key)}
                    className={`
                    w-full flex justify-between items-center
                    px-3 py-2 rounded-xl
                    text-sm transition-colors duration-200
                    ${
                      baseMap === key
                        ? "bg-blue-500 text-white"
                        : `
                          text-slate-700 dark:text-slate-200
                          hover:bg-gray-100 dark:hover:bg-slate-800
                        `
                    }
                  `}
                  >
                    {map.name}

                    <div
                      className={`w-2 h-2 rounded-full ${
                        baseMap === key
                          ? "bg-white"
                          : "bg-gray-300 dark:bg-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <hr className="border-slate-200 dark:border-slate-700" />
            {/* LAYERS */}
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">
                Layers
              </div>

              {[
                { key: "benThanh", label: "Thửa đất" },
                { key: "traffic", label: "Giao thông" },
                { key: "lineString", label: "Tim đường" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-200">
                    {item.label}
                  </span>

                  {/* TOGGLE */}
                  <button
                    onClick={() => toggleLayer(item.key as LayerKey)}
                    className={`
                    w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300
                    ${
                      layers[item.key as keyof typeof layers]
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-slate-700"
                    }
                  `}
                  >
                    <div
                      className={`
                      w-4 h-4 bg-white rounded-full shadow
                      transform transition-transform duration-300
                      ${
                        layers[item.key as keyof typeof layers]
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                    `}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
