"use client";

import { useState } from "react";

interface UserFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    full_name: initialData?.full_name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "USER",
    password: "", // Chỉ dùng cho Create
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-500";
  const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Họ và Tên</label>
        <input
          required
          className={inputClass}
          placeholder="Nguyễn Văn A"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          required
          type="email"
          className={inputClass}
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Số điện thoại</label>
          <input
            required
            className={inputClass}
            placeholder="09xxx"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div>
          <label className={labelClass}>Vai trò</label>
          <select
            className={inputClass}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {!initialData && (
        <div>
          <label className={labelClass}>Mật khẩu</label>
          <input
            required
            type="password"
            className={inputClass}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? "Đang xử lý..." : initialData ? "Cập nhật" : "Tạo mới"}
        </button>
      </div>
    </form>
  );
}
