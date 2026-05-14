import { getInfoRoad } from "@/features/client/map/getInfo";
import { formatArea, formatMoney } from "../utils/format";

export const handleRoadClick = async (layer: any, e: any) => {
  const { lat, lng } = e.latlng;

  layer.bindPopup("Đang tải dữ liệu đường...").openPopup();

  try {
    const res = await getInfoRoad(lat, lng);

    if (!res?.features?.length) {
      layer.bindPopup("Không có dữ liệu đường").openPopup();
      return;
    }

    const props = res.features[0].properties;
    const isHem = props?.ten_duong?.toLowerCase().includes("hẽm");

    const popup = `
    <div class="w-64 overflow-hidden rounded-2xl shadow-xl bg-white border border-slate-200 font-sans">
  <!-- Header: Light Teal Gradient -->
  <div class="bg-gradient-to-r from-teal-50 to-white px-4 py-3 border-b border-teal-100">
    <h3 class="text-teal-700 text-sm font-bold uppercase tracking-widest m-0 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-teal-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      Thông tin đường
    </h3>
  </div>

  <!-- Body Content -->
  <div class="p-4 flex flex-col gap-4">
    
    <!-- Tên đường chính -->
    <div class="space-y-0.5">
      <span class="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Tên tuyến đường</span>
      <div class="text-base font-bold text-slate-800 leading-snug">
        ${props?.ten_duong || "N/A"}
      </div>
    </div>


   ${
     !isHem
       ? `
    <div class="grid gap-2.5 pt-3 border-t border-slate-100">
      <div class="flex justify-between items-center group">
        <span class="text-xs text-slate-500 font-medium">Giá đất: ODT</span>
        <span class="text-sm font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
          ${formatMoney(props?.price?.odt)}/m²
        </span>
      </div>

      <div class="flex justify-between items-center group">
        <span class="text-xs text-slate-500 font-medium">Giá đất: TMV</span>
        <span class="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          ${formatMoney(props?.price?.tmv)}/m²
        </span>
      </div>

      <div class="flex justify-between items-center group">
        <span class="text-xs text-slate-500 font-medium">Giá đất: SKC</span>
        <span class="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
          ${formatMoney(props?.price?.skc)}/m²
        </span>
      </div>
    </div>
    `
       : `
    <div class="pt-3 border-t border-slate-100 text-xs text-slate-400 italic text-center">
      (Không áp dụng bảng giá cho đường hẻm)
    </div>
    `
   }

    <div class="mt-1 flex justify-between items-center text-[9px] text-slate-400 font-medium border-t border-slate-50 pt-3">
      <span class="flex items-center gap-1.5 italic">
        <span class="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_4px_rgba(20,184,166,0.5)]"></span>
        Dữ liệu trực tuyến
      </span>
      <span>${new Date().toLocaleDateString("vi-VN")}</span>
    </div>
  </div>
</div>



    <!-- Metadata Footer -->
    <div class="mt-1 flex justify-between items-center text-[9px] text-slate-400 font-medium border-t border-slate-50 pt-3">
      <span class="flex items-center gap-1.5 italic">
        <span class="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_4px_rgba(20,184,166,0.5)]"></span>
        Dữ liệu trực tuyến
      </span>
      <span>${new Date().toLocaleDateString("vi-VN")}</span>
    </div>
  </div>
</div>
    `;

    layer.bindPopup(popup).openPopup();
  } catch (err) {
    console.error(err);
    layer.bindPopup("Lỗi tải dữ liệu đường").openPopup();
  }
};
