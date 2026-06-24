"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/features/user/profile/getProfile";
import ProfileHeader from "@/components/Profile/Header/ProfileHeader";
import ProfileTabs from "@/components/Profile/Tab/ProfileTabs";
import ProfileInfoForm from "@/components/Profile/Form/ProfileInfoForm";
import ProfilePasswordForm from "@/components/Profile/PasswordForm/ProfilePasswordForm";
import { useUserStore } from "@/store/user";
import { Card, CardBody, Spinner } from "@nextui-org/react";

export default function ProfilePage() {
  const { user, setUser, updateUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"info" | "password">("info");
  
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile();
        const profileData = {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          avatar: data.avatar ?? null,
          role: data.role,
        };
        
        setUser(profileData);
        setForm({
          full_name: data.full_name || "",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Lỗi khi tải thông tin tài khoản:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [setUser]);

  const handleAvatarChange = (url: string) => {
    updateUser({
      avatar: `${url}?t=${Date.now()}`,
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400 gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-sm font-medium">Đang cấu hình không gian làm việc...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 pb-16 antialiased transition-colors duration-200 relative">
      
      {/* 1. KHỐI BACKGROUND GIS CHIẾM 70% CHIỀU CAO MÀN HÌNH */}
      <div className="absolute top-0 left-0 w-full h-[70vh] z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074"
          className="w-full h-full object-cover brightness-95 dark:brightness-[0.6] dark:opacity-50 filter contrast-125 scale-100"
          alt="GIS Map Grid Background"
        />
        
        {/* Lớp phủ lưới tọa độ tinh tế cho dân GIS */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Lớp chuyển màu mượt mà (Fade Out) từ ảnh sang màu nền gốc ở đoạn 70vh */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent dark:from-slate-950 dark:via-slate-950/40" />
      </div>

      {/* 2. KHỐI CARD NỘI DUNG (Nổi lên trên lớp Background) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 relative z-10">
        
        {/* Card kính mờ trong suốt nhẹ ăn theo chế độ màu */}
        <Card className="bg-white/50 border border-slate-200/60 shadow-2xl rounded-2xl overflow-visible backdrop-blur-sm dark:bg-slate-900/600 dark:border-slate-800/80">
          <CardBody className="p-6 sm:p-10">
            
            {/* Header chứa thông tin Avatar & Phân quyền */}
            <div className="border-b border-slate-100 dark:border-slate-800/60 pb-6">
              <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
            </div>

            {/* Điều hướng Tabs */}
            <div className="mt-6 p-1 bg-slate-100/80 border border-slate-200/50 rounded-xl max-w-xs ">
              <ProfileTabs tab={tab} setTab={setTab} />
            </div>

            {/* Phân khu hiển thị Form */}
            <div className="mt-8 transition-all duration-300 ease-in-out">
              {tab === "info" && (
                <ProfileInfoForm
                  user={user}
                  form={form}
                  setForm={setForm}
                  saving={saving}
                  setSaving={setSaving}
                  setUser={setUser}
                />
              )}
              
              {tab === "password" && (
                <ProfilePasswordForm
                  password={password}
                  setPassword={setPassword}
                  saving={saving}
                  setSaving={setSaving}
                />
              )}
            </div>

          </CardBody>
        </Card>
        
      </div>
    </div>
  );
}