"use client";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  getAllUser,
  deleteUser,
  createUser,
  updateUser,
} from "@/features/admin/admin.user";

import UserTable from "./../UserTable/UserTable";
import Pagination from "@/components/Pagination/Pagination";
import UserForm from "./../UserForm/UserForm";
import { UserFormData } from "./../schema";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllUser({ page, pageSize: 10, keyword: "" });
      setUsers(res.data);
      setTotalPage(res.totalPage);
    } catch {
      toast.error("Không thể tải danh sách");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onHandleCreate = async (data: UserFormData) => {
    try {
      await createUser(data);
      toast.success("Thêm thành công!");
      setIsCreateModalOpen(false);
      fetchUsers();
    } catch {
      toast.error("Lỗi khi tạo!");
    }
  };

  const onHandleUpdate = async (data: UserFormData) => {
    if (!selectedUser) return;
    try {
      await updateUser(selectedUser.user_id, data);
      toast.success("Cập nhật thành công!");
      setIsUpdateModalOpen(false);
      fetchUsers();
    } catch {
      toast.error("Lỗi cập nhật!");
    }
  };

  const onHandleDelete = (id: number) => {
    toast(
      (t) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span className="text-sm font-medium">
            Bạn có chắc muốn xóa user này?
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteUser(id);
                  toast.success("Đã xóa thành công");
                  fetchUsers();
                } catch {
                  toast.error("Xóa thất bại");
                }
              }}
              style={{
                cursor: "pointer",
                background: "red",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: 5,
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Xóa
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                cursor: "pointer",
                background: "#ccc",
                color: "#333",
                padding: "5px 10px",
                borderRadius: 5,
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  return (
    <div className="min-h-screen  text-gray-100 p-0 sm:p-6">
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 px-4 sm:px-0 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Quản lý người dùng
            </h1>
            <p className="text-sm text-gray-400">
              Danh sách thành viên và phân quyền hệ thống
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/20 active:scale-95 font-semibold"
          >
            <PlusIcon className="w-5 h-5 stroke-2" />{" "}
            <span>Thêm người dùng</span>
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden mx-4 sm:mx-0">
          <UserTable
            users={users}
            isLoading={isLoading}
            onEdit={(u: any) => {
              setSelectedUser(u);
              setIsUpdateModalOpen(true);
            }}
            onDelete={onHandleDelete}
          />
          <Pagination
            page={page}
            totalPage={totalPage}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Thêm Người Dùng Mới"
      >
        <UserForm
          onSubmit={onHandleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedUser(null);
        }}
        title="Chỉnh Sửa Thông Tin"
      >
        <UserForm
          initialData={selectedUser}
          onSubmit={onHandleUpdate}
          onCancel={() => setIsUpdateModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
