"use client";
import { useRef, useState } from "react";
import { uploadAvatar } from "@/features/user/profile/upload-avatar";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/user";

type Props = {
  user: {
    full_name: string;
    email: string;
    role?: string;
    avatar?: string | null;
    phone?: string;
  };
  onAvatarChange: (url: string) => void;
};
export default function ProfileHeader({ user, onAvatarChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { updateUser } = useUserStore();
  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      toast.loading("Đang upload avatar...", { id: "avatar" });
      const res = await uploadAvatar(formData);
      updateUser({
        avatar: res.avatar + `?t=${Date.now()}`,
      });
      toast.success("Cập nhật avatar thành công", {
        id: "avatar",
      });
    } catch (err) {
      console.error(err);
      toast.error("Upload avatar thất bại", {
        id: "avatar",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div
        onClick={() => fileRef.current?.click()}
        className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow bg-gray-200 relative group cursor-pointer"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            key={user.avatar}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-blue-500 to-cyan-400 text-white text-2xl font-bold">
            {user?.full_name ? user.full_name.charAt(0) : "U"}
          </div>
        )}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
          {uploading ? "Đang tải..." : "Đổi ảnh"}
        </div>

        {/* input file */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </div>

      {/* INFO */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {user.full_name}
        </h2>
        <p className="text-gray-700 text-sm">{user.email}</p>
      </div>
    </div>
  );
}
