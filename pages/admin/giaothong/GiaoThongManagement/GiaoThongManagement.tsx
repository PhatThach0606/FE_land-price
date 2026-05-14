"use client";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal/Modal";
import { getAllGiaoThong, updateGiaoThong } from "@/features/admin/admin.map";
import GiaoThongTable from "./../GiaoThongTable/GiaoThongTable";
import Pagination from "@/components/Pagination/Pagination";
import { useSearchStore } from "@/store/search";
export default function GiaoThongManagement() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    ten_duong: "",
    odt: 0,
    tmv: 0,
    skc: 0,
  });

  const { keyword, trigger } = useSearchStore();
  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllGiaoThong({
        page,
        pageSize: 10,
        keyword,
      });

      setData(res.data);
      setTotalPage(res.totalPage);
    } finally {
      setIsLoading(false);
    }
  }, [page, keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    getAllGiaoThong({
      page,
      pageSize: 10,
      keyword,
    });
  }, [page, trigger]);
  // ================= UPDATE =================

  const onHandleUpdate = async () => {
    if (!selectedItem) return;

    try {
      await updateGiaoThong(selectedItem.gid, formData);
      toast.success("Cập nhật thành công!");
      setIsUpdateModalOpen(false);
      fetchData();
    } catch {
      toast.error("Lỗi cập nhật!");
    }
  };

  // ================= OPEN MODAL =================

  const openEdit = (item: any) => {
    setSelectedItem(item);
    setFormData({
      ten_duong: item.ten_duong || "",
      odt: item.odt || 0,
      tmv: item.tmv || 0,
      skc: item.skc || 0,
    });
    setIsUpdateModalOpen(true);
  };

  // ================= UI =================

  return (
    <div className="min-h-screen text-gray-100 p-0 sm:p-10">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 px-4 sm:px-0 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Quản lý giao thông
            </h1>
            <p className="text-sm text-gray-400">
              Danh sách tuyến đường và giá đất
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden mx-4 sm:mx-0">
          <GiaoThongTable data={data} isLoading={isLoading} onEdit={openEdit} />

          <Pagination
            page={page}
            totalPage={totalPage}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* MODAL UPDATE */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedItem(null);
        }}
        title="Chỉnh sửa giao thông"
      >
        <div className="space-y-4">
          {/* Tên đường */}
          <div>
            <label className="text-sm text-gray-400">Tên đường</label>
            <input
              value={formData.ten_duong}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ten_duong: e.target.value,
                })
              }
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* Đoạn đường (readonly) */}
          <div>
            <label className="text-sm text-gray-400">Đoạn đường</label>
            <input
              value={selectedItem?.doan_duong || ""}
              disabled
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400"
            />
          </div>

          {/* ODT */}
          <div>
            <label className="text-sm text-orange-400">Giá ODT</label>
            <input
              type="number"
              value={formData.odt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  odt: Number(e.target.value),
                })
              }
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* TMV */}
          <div>
            <label className="text-sm text-yellow-400">Giá TMV</label>
            <input
              type="number"
              value={formData.tmv}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tmv: Number(e.target.value),
                })
              }
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* SKC */}
          <div>
            <label className="text-sm text-cyan-400">Giá SKC</label>
            <input
              type="number"
              value={formData.skc}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skc: Number(e.target.value),
                })
              }
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
            >
              Hủy
            </button>
            <button
              onClick={onHandleUpdate}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
