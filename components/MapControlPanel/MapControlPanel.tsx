"use client";

import { useState } from "react";

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

type Props = {
  baseMap: string;
  setBaseMap: (val: string) => void;

  layers: {
    benThanh: boolean;
    traffic: boolean;
    lineString: boolean;
  };

  toggleLayer: (key: "benThanh" | "traffic" | "lineString") => void;
};

export default function MapControlPanel({
  baseMap,
  setBaseMap,
  layers,
  toggleLayer,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-100">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur-md shadow-md border border-gray-200 hover:bg-white transition-all duration-200 ease-out active:scale-95"
      >
        <div>
          <i className="fa-solid fa-layer-group"></i>
        </div>

        {/* soft indicator */}
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
            open ? "bg-blue-500 scale-110" : "bg-gray-300 scale-100"
          }`}
        />
      </button>
      {/* DROPDOWN */}
      {open && (
        <div
          className="mt-2 w-64 rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200 p-4 space-y-4
    animate-in fade-in zoom-in-95 duration-300"
        >
          {/* BASE MAP */}
          <div>
            <div className="text-xs font-semibold text-black mb-2">
              Base Map
            </div>

            <div className="space-y-2">
              {Object.entries(baseMaps).map(([key, map]) => (
                <button
                  key={key}
                  onClick={() => setBaseMap(key)}
                  className={`w-full flex justify-between px-3 py-2 rounded-xl text-sm text-black ${
                    baseMap === key
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {map.name}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      baseMap === key ? "bg-white" : "bg-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <hr />

          {/* LAYERS */}
          <div>
            <div className="text-xs font-semibold text-black mb-2">Layers</div>

            {[
              { key: "benThanh", label: "Thửa đất" },
              { key: "traffic", label: "Giao thông" },
              { key: "lineString", label: "Tim đường" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-1"
              >
                <span className="text-sm text-black">{item.label}</span>

                {/* toggle */}
                <button
                  onClick={() => toggleLayer(item.key as any)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                    layers[item.key as keyof typeof layers]
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                      layers[item.key as keyof typeof layers]
                        ? "translate-x-5"
                        : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
