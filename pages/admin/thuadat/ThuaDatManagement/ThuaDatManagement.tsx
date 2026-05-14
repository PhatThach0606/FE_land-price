"use client";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal/Modal";
import { useSearchStore } from "@/store/search";
import { getAllThuaDat, updateThuaDat } from "@/features/admin/admin.map";
import ThuaDatTable from "./../ThuadatTable/ThuadatTable";
import Pagination from "@/components/Pagination/Pagination";

export default function ThuaDatManagement() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    loai_dat: "",
    dien_tich: 0,
  });

  const { keyword, trigger } = useSearchStore();
  // ================= FETCH =================

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllThuaDat({
        page,
        pageSize: 100,
        keyword: "",
      });

      setData(res.data);
      setTotalPage(res.totalPage);
    } catch {
      toast.error("Không thể tải danh sách");
    } finally {
      setIsLoading(false);
    }
  }, [page, keyword]);

  // ================= UPDATE =================

  const onHandleUpdate = async () => {
    if (!selectedItem) return;

    try {
      await updateThuaDat(selectedItem.gid, formData);
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
      loai_dat: item.loai_dat || "",
      dien_tich: item.dien_tich || 0,
    });
    setIsUpdateModalOpen(true);
  };

  // ================= UI =================
  useEffect(() => {
    setPage(1); // reset page
    fetchData();
  }, [trigger]);

  return (
    <div className="min-h-screen  text-gray-100 p-0 sm:p-10 ">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 px-4 sm:px-0 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Quản lý thửa đất
            </h1>
            <p className="text-sm text-gray-400">
              Danh sách thửa đất trong hệ thống GIS
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden mx-4 sm:mx-0">
          <ThuaDatTable data={data} isLoading={isLoading} onEdit={openEdit} />

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
        title="Chỉnh sửa thửa đất"
      >
        <div className="space-y-4">
          {/* Số tờ */}
          <div>
            <label className="text-sm text-gray-400">Số tờ</label>
            <input
              value={selectedItem?.so_to || ""}
              disabled
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Số thửa */}
          <div>
            <label className="text-sm text-gray-400">Số thửa</label>
            <input
              value={selectedItem?.so_thua || ""}
              disabled
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Loại đất */}
          <div>
            <label className="text-sm text-gray-400">Loại đất</label>
            <input
              value={formData.loai_dat}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  loai_dat: e.target.value,
                })
              }
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Diện tích */}
          <div>
            <label className="text-sm text-gray-400">Diện tích (m²)</label>
            <input
              type="number"
              value={formData.dien_tich}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dien_tich: Number(e.target.value),
                })
              }
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
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
