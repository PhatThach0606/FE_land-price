"use client";

import { useRef, useState } from "react";
import { uploadAvatar } from "@/features/user/profile/upload-avatar";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/user";

type UserProfile = {
  full_name: string;
  email: string;
  role?: string;
  avatar?: string | null;
  phone?: string;
};

type Props = {
  user: UserProfile;
  onAvatarChange?: (url: string) => void; // Chuyển thành optional nếu dùng song song với Zustand
};

export default function ProfileHeader({ user, onAvatarChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { updateUser } = useUserStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Giới hạn dung lượng file (Ví dụ: 5MB) tránh ép server xử lý file quá lớn
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước ảnh không được vượt quá 5MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      setIsUploading(true);
      toast.loading("Đang upload avatar...", { id: "avatar" });

      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadAvatar(formData);
      const newAvatarUrl = `${res.avatar}?t=${Date.now()}`;

      // Đồng bộ cả global state (Zustand) và local state / parent state nếu có
      updateUser({ avatar: newAvatarUrl });
      onAvatarChange?.(newAvatarUrl);

      toast.success("Cập nhật avatar thành công", { id: "avatar" });
    } catch (err) {
      console.error("[AVATAR_UPLOAD_ERROR]", err);
      toast.error("Upload avatar thất bại", { id: "avatar" });
    } finally {
      setIsUploading(false);
      // Reset value của input file để có thể chọn lại chính file đó nếu muốn
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAvatarClick = () => {
    // Không cho phép bấm chọn file khác khi đang trong quá trình upload
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  // Lấy chữ cái đầu tiên của tên công thức chuẩn hơn
  const avatarFallbackLetter = user?.full_name ? user.full_name.trim().charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-center gap-5">
      {/* AVATAR CONTAINER */}
      <div
        onClick={handleAvatarClick}
        className={`relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow bg-gray-200 group ${
          isUploading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.full_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-2xl font-bold target:">
            {avatarFallbackLetter}
          </div>
        )}

        {/* OVERLAY */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs transition-opacity duration-200 ${
          isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
          {isUploading ? "Đang tải..." : "Đổi ảnh"}
        </div>

        {/* HIDDEN INPUT FILE */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploading}
          onChange={handleFileChange}
        />
      </div>

      {/* USER INFO */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900 leading-tight">
          {user.full_name}
        </h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        {user.role && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {user.role}
          </span>
        )}
      </div>
    </div>
  );
}