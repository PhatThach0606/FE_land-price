import { getInfoRoad } from "@/features/client/map/getInfo";
import { formatArea, formatMoney, formatMoneyShort } from "../utils/format";

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

    // --- XỬ LÝ KIỂM TRA ĐƯỜNG ĐẶC BIỆT (HẺM / BÙNG BINH) ---
    const tenDuongLower = (props?.ten_duong || "").trim().toLowerCase();

    // Kiểm tra xem có phải hẻm hoặc bùng binh không
    const isHem =
      tenDuongLower.startsWith("hẻm") ||
      tenDuongLower.startsWith("hẽm") ||
      tenDuongLower.includes("hẽm") ||
      tenDuongLower.includes("hẻm");
    const isBungBinh =
      tenDuongLower.startsWith("bùng binh") ||
      tenDuongLower.startsWith("vòng xoay") ||
      tenDuongLower.includes("bùng binh");

    // Gom chung lại thành một biến cờ để quyết định ẩn/hiển thị bảng giá
    const isKhongApDungGia = isHem || isBungBinh;

    // --- XỬ LÝ FORMAT ĐOẠN ĐƯỜNG BIẾN THỂ ---
    const doanDuongRaw = props?.doan_duong?.trim() || "";
    let doanDuongHtml = "";

    if (!doanDuongRaw || doanDuongRaw.toLowerCase() === "trọn đường") {
      doanDuongHtml = `
        <span class="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><path d="M2 12h20"/><path d="M20 12v8H4v-8"/></svg>
          Toàn bộ tuyến đường
        </span>
      `;
    } else if (doanDuongRaw.includes("-")) {
      const points = doanDuongRaw.split("-").map((p: string) => p.trim());
      doanDuongHtml = `
        <div class="flex items-center gap-4 bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm mt-1">
          <div class="flex-1 min-w-0">
            <span class="text-[9px] text-teal-600 uppercase font-extrabold block mb-0.5 tracking-wider">Từ giao điểm</span>
            <div class="text-xs font-bold text-slate-700 truncate" title="${points[0]}">${points[0]}</div>
          </div>
          
          <div class="flex flex-col items-center justify-center px-1 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse text-teal-400"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
          
          <div class="flex-1 min-w-0">
            <span class="text-[9px] text-rose-500 uppercase font-extrabold block mb-0.5 tracking-wider">Đến giao điểm</span>
            <div class="text-xs font-bold text-slate-700 truncate" title="${points[1] || "---"}">${points[1] || "---"}</div>
          </div>
        </div>
      `;
    } else {
      doanDuongHtml = `<span class="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">${doanDuongRaw}</span>`;
    }

    // --- HIỂN THỊ HTML GIAO DIỆN HỢP LÝ KHI KHÔNG CÓ GIÁ ĐẤT ---
    let thongBaoKhongGiaHtml = "";
    if (isHem) {
      thongBaoKhongGiaHtml = `
        <div class="flex flex-col items-center justify-center py-5 px-4 text-center bg-amber-50/50 rounded-xl border border-dashed border-amber-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500 mb-2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <span class="text-xs font-bold text-amber-800">Khu vực tuyến hẻm</span>
          <span class="text-[11px] text-slate-500 mt-1">Không áp dụng  giá đất. </span>
        </div>
      `;
    } else if (isBungBinh) {
      thongBaoKhongGiaHtml = `
        <div class="flex flex-col items-center justify-center py-5 px-4 text-center bg-indigo-50/50 rounded-xl border border-dashed border-indigo-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500 mb-2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          <span class="text-xs font-bold text-indigo-800">Khu vực Bùng binh / Vòng xoay</span>
          <span class="text-[11px] text-slate-500 mt-1">Giá đất tại nút giao giao thông (bùng binh) được tính toán dựa trên các tuyến đường nhánh kết nối trực tiếp.</span>
        </div>
      `;
    }

    const popup = `
    <div class="w-[400px] overflow-hidden rounded-2xl shadow-2xl bg-white border border-slate-200 font-sans">
      <div class="bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3.5 project-header">
        <h3 class="text-white text-sm font-bold uppercase tracking-wider m-0 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          Thông tin chi tiết tuyến đường
        </h3>
      </div>

      <div class="p-4 flex flex-col gap-4">
        
        <div class="flex flex-col gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div class="space-y-0.5">
            <span class="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Tên đường / Khu vực</span>
            <div class="text-lg font-black text-slate-800 leading-tight">
              ${props?.ten_duong || "Chưa có tên"}
            </div>
          </div>
          
          <div class="space-y-1 border-t border-slate-200/60 pt-2.5">
            <span class="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">Phạm vi / Đoạn đường áp dụng</span>
            <div>
              ${doanDuongHtml}
            </div>
          </div>
        </div>

        ${
          !isKhongApDungGia
            ? `
          <div class="flex flex-col gap-2.5 pt-1">
            
            <div class="flex justify-between items-center bg-rose-50/30 border border-rose-100/70 rounded-xl p-2.5 transition-all hover:bg-rose-50/50">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700">Giá đất ở</span>
                <span class="text-[10px] text-slate-400 font-medium font-mono uppercase">Mã loại: ODT</span>
              </div>
              <span class="text-base font-black text-rose-600 bg-white border border-rose-200 px-4 py-1.5 rounded-lg min-w-[130px] text-right shadow-sm">
                ${formatMoneyShort(props?.price?.odt)}/m²
              </span>
            </div>

            <div class="flex justify-between items-center bg-blue-50/30 border border-blue-100/70 rounded-xl p-2.5 transition-all hover:bg-blue-50/50">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700">Thương mại, dịch vụ</span>
                <span class="text-[10px] text-slate-400 font-medium font-mono uppercase">Mã loại: TMD</span>
              </div>
              <span class="text-base font-black text-blue-600 bg-white border border-blue-200 px-4 py-1.5 rounded-lg min-w-[130px] text-right shadow-sm">
                ${formatMoneyShort(props?.price?.tmd)}/m²
              </span>
            </div>

            <div class="flex justify-between items-center bg-emerald-50/30 border border-emerald-100/70 rounded-xl p-2.5 transition-all hover:bg-emerald-50/50">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-700">Cơ sở sản xuất phi nông nghiệp</span>
                <span class="text-[10px] text-slate-400 font-medium font-mono uppercase">Mã loại: SKC</span>
              </div>
              <span class="text-base font-black text-emerald-600 bg-white border border-emerald-200 px-4 py-1.5 rounded-lg min-w-[130px] text-right shadow-sm">
                ${formatMoneyShort(props?.price?.skc)}/m²
              </span>
            </div>

          </div>
          `
            : thongBaoKhongGiaHtml
        }

        <div class="flex justify-between items-center text-[9px] text-slate-400 font-semibold border-t border-slate-100 pt-3 mt-1 tracking-wide">
          <span class="flex items-center gap-1.5 italic">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.6)]"></span>
            Dữ liệu trực tuyến hệ thống
          </span>
          <span>Cập nhật: ${new Date().toLocaleDateString("vi-VN")}</span>
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
