"use client";

import { memo } from "react";
import {
  PencilSquareIcon,
  ArrowPathIcon,
  MapIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

// ================= TYPE =================

export interface GiaoThong {
  gid: number | string;
  ten_duong: string;
  doan_duong: string;
  odt: number;
  tmv: number;
  skc: number;
}

interface Props {
  data: GiaoThong[];
  isLoading: boolean;
  onEdit: (item: GiaoThong) => void;
}

// ================= ROW =================

const TableRow = memo(
  ({
    item,
    onEdit,
  }: {
    item: GiaoThong;
    onEdit: (item: GiaoThong) => void;
  }) => (
    <tr className="hover:bg-indigo-500/[0.03] transition-all group">
      {/* ID */}
      <td className="px-4 py-3 text-[11px] font-mono text-slate-600">
        #{item.gid}
      </td>

      {/* Tên đường */}
      <td className="px-4 py-3 text-sm text-slate-300 font-medium">
        <div className="flex items-center gap-2">
          <MapIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400" />
          {item.ten_duong || "N/A"}
        </div>
      </td>

      {/* Đoạn đường */}
      <td className="px-4 py-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <ArrowsRightLeftIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
          {item.doan_duong || "—"}
        </div>
      </td>

      {/* ODT */}
      <td className="px-4 py-3 text-right">
        <Price value={item.odt} color="text-orange-400" />
      </td>

      {/* TMV */}
      <td className="px-4 py-3 text-right">
        <Price value={item.tmv} color="text-yellow-400" />
      </td>

      {/* SKC */}
      <td className="px-4 py-3 text-right">
        <Price value={item.skc} color="text-cyan-400" />
      </td>

      {/* ACTION */}
      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all active:scale-90"
        >
          <PencilSquareIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  ),
);

TableRow.displayName = "GiaoThongRow";

// ================= PRICE COMPONENT =================

function Price({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <BanknotesIcon className={`w-3.5 h-3.5 ${color}`} />
      <span className={`text-sm font-semibold ${color}`}>
        {value?.toLocaleString("vi-VN")}
      </span>
    </div>
  );
}

// ================= TABLE =================

export default function GiaoThongTable({ data, isLoading, onEdit }: Props) {
  return (
    <div className="w-full rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md overflow-hidden">
      <div className="overflow-x-auto overflow-y-auto max-h-[650px] scrollbar-thin scrollbar-thumb-slate-700">
        <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
          <thead className="sticky top-0 z-20">
            <tr className="bg-slate-800/95 backdrop-blur-sm">
              <th className="w-[6%] px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                ID
              </th>

              <th className="w-[20%] px-4 py-3 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                Tên đường
              </th>

              <th className="w-[18%] px-4 py-3 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                Đoạn đường
              </th>

              <th className="w-[15%] px-4 py-3 text-[10px] font-bold text-orange-400 uppercase tracking-widest text-right">
                ODT
              </th>

              <th className="w-[15%] px-4 py-3 text-[10px] font-bold text-yellow-400 uppercase tracking-widest text-right">
                TMV
              </th>

              <th className="w-[15%] px-4 py-3 text-[10px] font-bold text-cyan-400 uppercase tracking-widest text-right">
                SKC
              </th>

              <th className="w-[10%] px-4 py-3 text-[10px] font-bold text-indigo-300 uppercase tracking-widest text-right">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-24 text-center">
                  <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto text-indigo-500/50 mb-3" />
                  <span className="text-slate-500 text-xs font-medium animate-pulse">
                    Đang nạp dữ liệu giao thông...
                  </span>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.gid} item={item} onEdit={onEdit} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-20 text-center text-slate-600 text-sm italic"
                >
                  Không có dữ liệu giao thông.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      {!isLoading && data.length > 0 && (
        <div className="px-4 py-2 border-t border-slate-800/50 bg-slate-900/80 flex justify-between items-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
            Danh sách tuyến đường
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
