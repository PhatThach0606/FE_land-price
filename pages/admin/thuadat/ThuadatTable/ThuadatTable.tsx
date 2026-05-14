import { memo } from "react";
import {
  PencilSquareIcon,
  MapIcon,
  Squares2X2Icon,
  ArrowsPointingOutIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Định nghĩa Interface rõ ràng thay vì dùng 'any' để tránh lỗi runtime
export interface ThuaDat {
  gid: number | string;
  so_to: string | number;
  so_thua: string | number;
  loai_dat: string;
  dien_tich: number;
}

interface Props {
  data: ThuaDat[];
  isLoading: boolean;
  onEdit: (item: ThuaDat) => void;
}

// Tách Row ra để tối ưu re-render khi map 100+ items
const TableRow = memo(
  ({ item, onEdit }: { item: ThuaDat; onEdit: (item: ThuaDat) => void }) => (
    <tr className="hover:bg-slate-800/50 transition-all duration-200 group border-b border-slate-800/50 last:border-0">
      <td className="px-6 py-4 text-xs font-mono text-slate-500">
        #{item.gid}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2.5 text-slate-300">
          <div className="p-1.5 rounded bg-slate-800 text-slate-500 group-hover:text-indigo-400 transition-colors">
            <MapIcon className="w-4 h-4" />
          </div>
          <span className="font-medium">{item.so_to}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2.5 text-slate-300">
          <div className="p-1.5 rounded bg-slate-800 text-slate-500 group-hover:text-emerald-400 transition-colors">
            <Squares2X2Icon className="w-4 h-4" />
          </div>
          <span className="font-medium">{item.so_thua}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          {item.loai_dat || "N/A"}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 text-slate-300 font-semibold">
          <ArrowsPointingOutIcon className="w-4 h-4 text-slate-600" />
          {item.dien_tich?.toLocaleString("vi-VN")}{" "}
          <span className="text-[10px] text-slate-500 font-normal">m²</span>
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onEdit(item)}
          className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all active:scale-90"
          title="Chỉnh sửa"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  ),
);

TableRow.displayName = "TableRow";

// ... các imports giữ nguyên

export default function ThuaDatTable({ data, isLoading, onEdit }: Props) {
  return (
    <div className="w-full rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md overflow-hidden">
      {/* 
          - Dùng table-fixed để kiểm soát % chiều ngang tuyệt đối.
          - Ẩn scrollbar ngang trên desktop, chỉ hiện khi thực sự cần.
      */}
      <div className="overflow-x-auto overflow-y-auto max-h-[650px] scrollbar-thin scrollbar-thumb-slate-700">
        <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-slate-800/95 backdrop-blur-sm shadow-sm">
              {/* Căn chỉnh tỷ lệ % để table luôn cân đối */}
              <th className="w-[8%] px-4 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                ID
              </th>
              <th className="w-[15%] px-4 py-3.5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                Số tờ
              </th>
              <th className="w-[15%] px-4 py-3.5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                Số thửa
              </th>
              <th className="w-[12%] px-4 py-3.5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest text-center">
                Loại đất
              </th>
              <th className="w-[30%] px-4 py-3.5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest text-right">
                Diện tích
              </th>
              <th className="w-[10%] px-4 py-3.5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest text-right">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-24 text-center">
                  <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto text-indigo-500/50 mb-3" />
                  <span className="text-slate-500 text-xs font-medium animate-pulse">
                    Đang nạp 100 dữ liệu thửa đất...
                  </span>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.gid}
                  className="hover:bg-indigo-500/[0.03] transition-all group"
                >
                  <td className="px-4 py-3 text-[11px] font-mono text-slate-600 truncate">
                    #{item.gid}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-300 font-medium">
                    <div className="flex items-center gap-2">
                      <MapIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400" />
                      {item.so_to}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-300 font-medium">
                    <div className="flex items-center gap-2">
                      <Squares2X2Icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                      {item.so_thua}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {/* Badge ODT tối ưu cho 3 ký tự */}
                    <span
                      className={`
                      inline-block px-1.5 py-0.5 rounded text-[10px] font-black tracking-tighter
                      ${item.loai_dat === "ODT" ? "bg-orange-500/10 text-purple-400 border border-orange-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}
                    `}
                    >
                      {item.loai_dat || "N/A"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-sm font-semibold text-slate-200">
                        {item.dien_tich?.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-600 font-normal">
                        m²
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all active:scale-90"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-20 text-center text-slate-600 text-sm italic"
                >
                  Không có dữ liệu hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Info Bar giúp cân đối phần dưới của table */}
      {!isLoading && data.length > 0 && (
        <div className="px-4 py-2 border-t border-slate-800/50 bg-slate-900/80 flex justify-between items-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
            Danh sách thửa đất
          </p>
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 font-bold">
              {data.length} RECORDS LOADED
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
