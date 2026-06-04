import { getInfoLand } from "@/features/client/map/getInfo";
import { formatMoney, formatArea, formatMoneyShort } from "./../utils/format";

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

    const landTypeMap: Record<string, string> = {
      ODT: "Đất ở tại đô thị",
      ONT: "Đất ở tại nông thôn",
      TMD: "Đất thương mại, dịch vụ",
      TMV: "Đất thương mại, dịch vụ",
      SKC: "Đất cơ sở sản xuất phi nông nghiệp",
      CLN: "Đất trồng cây lâu năm",
      HNK: "Đất trồng cây hàng năm khác",
    };

    const maDat = props?.loai_dat || "---";
    const tenLoaiDat =
      landTypeMap[maDat.toUpperCase()] || "Chưa phân loại cụ thể";

    const tuyenDuonChinh =
      props?.tuyen_duong_tinh_gia?.ten_duong_chinh || "Chưa xác định";
    const vtNum = Number(props?.vi_tri || 1);

    // Chuyển đổi hệ số sang định dạng % giống cấu trúc Thông tư quản lý đất đai
    const percentMap: Record<number, string> = {
      1: "100%",
      2: "50%",
      3: "40%",
      4: "32%",
    };
    const phanTramApDung = percentMap[vtNum] || "100%";

    // Render HTML dạng 2 cột ngang rộng rãi w-[580px]
    const popup = `
<div class="w-[580px] overflow-hidden rounded-2xl shadow-2xl bg-white border border-slate-200 font-sans text-slate-800">
  <div class="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5">
    <h3 class="text-white text-sm font-bold uppercase tracking-wider m-0 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>
        <path d="M3 3h6v2H5v4H3V3zm18 0h-6v2h4v4h2V3zM3 21h6v-2H5v-4H3v6zm18 0h-6v-2h4v-4h2v6z"/>
      </svg>
      Thông tin không gian & Giá trị thửa đất công khai
    </h3>
  </div>

  <div class="p-5 flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div class="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-2">
            <div class="space-y-0.5 text-center border-r border-slate-200/60">
              <span class="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">Số tờ bản đồ</span>
              <div class="text-base font-black text-slate-800">${props?.so_to || "---"}</div>
            </div>
            <div class="space-y-0.5 text-center">
              <span class="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">Số hiệu thửa</span>
              <div class="text-base font-black text-slate-800">${props?.so_thua || "---"}</div>
            </div>
          </div>
          <div class="flex justify-between items-center pt-0.5">
            <span class="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Mã thửa:</span>
            <span class="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded font-mono shadow-sm">
              ${props?.mathuadat || "Chưa có"}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center bg-slate-50/50 px-3 py-2 rounded-lg border border-slate-100">
            <span class="text-xs text-slate-500 font-semibold">Diện tích pháp lý:</span>
            <span class="text-sm font-bold text-slate-800 font-mono">${formatArea(props?.dien_tich)}</span>
          </div>

          <div class="flex justify-between items-center bg-indigo-50/30 border border-indigo-100/70 rounded-xl p-2.5">
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-bold text-slate-700 truncate">${tenLoaiDat}</span>
              <span class="text-[9px] text-slate-400 font-medium tracking-wide">Mục đích sử dụng</span>
            </div>
            <span class="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-mono uppercase shadow-sm">
              ${maDat}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-xs justify-between">
        <div class="flex justify-between items-center border-b border-slate-200/40 pb-1.5">
          <span class="text-slate-500 font-semibold">Tuyến tiếp giáp:</span>
          <span class="font-bold text-slate-700 font-mono text-[11px]">${props?.tuyen_duong_tiep_giap || "Chưa xác định"}</span>
        </div>
        <div class="flex justify-between items-center border-b border-slate-200/40 pb-1.5">
          <span class="text-slate-500 font-semibold">Tuyến đường chính:</span>
          <span class="font-bold text-indigo-600 uppercase text-[11px]">${tuyenDuonChinh}</span>
        </div>
        <div class="flex justify-between items-center border-b border-slate-200/40 pb-1.5">
          <span class="text-slate-500 font-semibold">Vị trí áp giá:</span>
          <span class="font-bold text-white bg-slate-800 px-2 py-0.5 rounded shadow-sm">
            Vị trí ${vtNum}
          </span>
        </div>
        
        ${
          vtNum === 1
            ? ""
            : `
        <div class="flex justify-between items-center border-b border-slate-200/40 pb-1.5">
          <span class="text-slate-500 font-semibold">Hệ số áp dụng:</span>
          <span class="font-bold text-amber-600 font-mono bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">${hienThiViTri(phanTramApDung)}</span>
        </div>
        <div class="flex justify-between items-center pb-0.5">
          <span class="text-slate-500 font-semibold">Độ sâu hành lang hẻm ướt tính:</span>
          <span class="font-bold text-slate-700 font-mono">${props?.do_sau_tinh_toan_m ? Number(props.do_sau_tinh_toan_m).toFixed(1) : "0"} m</span>
        </div>
        `
        }
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs items-center">
      <div class="flex flex-col gap-1.5 border-r border-slate-200/60 pr-2">
        <div class="flex justify-between items-center">
          <span class="text-slate-500 font-semibold">Đơn giá gốc đường lớn:</span>
          <span class="font-bold text-slate-600 font-mono">${formatMoney(props?.don_gia_goc_vt1)}/m²</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-500 font-semibold">Đơn giá quy đổi áp dụng:</span>
          <span class="font-black text-emerald-600 font-mono">${formatMoney(props?.don_gia_ap_dung)}/m²</span>
        </div>
      </div>

      <div class="flex flex-col gap-1 pl-1">
        <div class="text-[9px] text-rose-500 uppercase font-extrabold tracking-wider">
          Tổng giá trị định giá thửa đất (Dự tính)
        </div>
        <div class="flex justify-between items-baseline">
          <span class="text-xl font-black text-rose-600 font-mono tracking-tight" title="${formatMoney(props?.tong_gia)} VNĐ">
            ${formatMoneyShort(props?.tong_gia || 0)}
          </span>
          <span class="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100 shadow-sm">
            VNĐ
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center text-[9px] text-slate-400 font-semibold border-t border-slate-100 pt-3 tracking-wide">
      <span class="flex items-center gap-1.5 italic">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_4px_rgba(99,102,241,0.6)]"></span>
        Hệ thống Quản lý Dữ liệu Địa chính WebGIS Ben Thanh
      </span>
      <span>Cập nhật ngày: ${new Date().toLocaleDateString("vi-VN")}</span>
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
function hienThiViTri(phanTram: any) {
  // Chuyển về kiểu số hoặc chuỗi chuẩn để so sánh
  const value = parseInt(phanTram);

  switch (value) {
    case 40:
      return "80% vị trí 2";
    case 50:
      return "50% vị trí 1";
    case 32:
      return "80% vị trí 3";
    default:
      // Trường hợp mặc định nếu phần trăm không rơi vào 3 số trên
      return `${phanTram}% vị trí không xác định`;
  }
}
