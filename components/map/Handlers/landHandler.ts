import { getInfoLand } from "@/features/client/map/getInfo";
import { formatMoney, formatArea } from "./../utils/format";

export const handleLandClick = async (layer: any, e: any) => {
  const { lat, lng } = e.latlng;

  layer.bindPopup("Đang tải dữ liệu...").openPopup();

  try {
    const res = await getInfoLand(lat, lng);
    if (!res?.features?.length) {
      layer.bindPopup("Không có dữ liệu").openPopup();
      return;
    }

    const props = res.features[0].properties;
    const popup = `
<div class="w-64 overflow-hidden rounded-2xl shadow-xl bg-white border border-slate-200 font-sans">
  <!-- Header: Light Indigo Gradient -->
  <div class="bg-gradient-to-r from-indigo-50 to-white px-4 py-3 border-b border-indigo-100">
    <h3 class="text-indigo-700 text-sm font-bold uppercase tracking-widest m-0 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600">
        <path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/><path d="M3 3h6v2H5v4H3V3zm18 0h-6v2h4v4h2V3zM3 21h6v-2H5v-4H3v6zm18 0h-6v-2h4v-4h2v6z"/>
      </svg>
      Thông tin thửa đất
    </h3>
  </div>

  <!-- Body Content -->
  <div class="p-4 flex flex-col gap-3">
    
    <!-- Số tờ & Số thửa (Hai cột) -->
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-0.5">
        <span class="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Số tờ</span>
        <div class="text-sm font-bold text-slate-800">${props?.so_to || "---"}</div>
      </div>
      <div class="space-y-0.5 border-l border-slate-100 pl-4">
        <span class="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Số thửa</span>
        <div class="text-sm font-bold text-slate-800">${props?.so_thua || "---"}</div>
      </div>
    </div>

    <!-- Diện tích & Loại đất -->
    <div class="pt-2 border-t border-slate-50 space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 font-medium">Diện tích:</span>
        <span class="text-sm font-bold text-slate-700">${formatArea(props?.dien_tich)}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 font-medium">Loại đất:</span>
        <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded italic">
          ${props?.loai_dat || "---"}
        </span>
      </div>
    </div>

    <!-- Vị trí & Giá tổng -->
    <div class="pt-3 border-t border-slate-100">
       <div class="mb-2">
        <span class="text-[10px] text-slate-400 uppercase font-bold tracking-tight block">Vị trí</span>
        <span class="text-xs text-slate-600 font-medium leading-tight">${props?.position || "N/A"}</span>
      </div>
      <div class="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
        <span class="text-xs font-bold text-slate-700">Tổng giá:</span>
        <span class="text-sm font-extrabold text-rose-600">
          ${formatMoney(props?.totalPrice)}
        </span>
      </div>
    </div>

    <!-- Metadata Footer -->
    <div class="mt-1 flex justify-between items-center text-[9px] text-slate-400 font-medium border-t border-slate-50 pt-2">
      <span class="flex items-center gap-1.5 italic">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_4px_rgba(99,102,241,0.5)]"></span>
        Dữ liệu địa chính
      </span>
      <span>${new Date().toLocaleDateString("vi-VN")}</span>
    </div>
  </div>
</div>
`;

    layer.bindPopup(popup).openPopup();
  } catch (err) {
    console.error(err);
    layer.bindPopup("Không tìm thấy thửa đất").openPopup();
  }
};
