"use client";
import { useEffect, useState } from "react";
import { getProfile } from "@/features/user/profile/getProfile";
import ProfileHeader from "@/components/Profile/Header/ProfileHeader";
import ProfileTabs from "@/components/Profile/Tab/ProfileTabs";
import ProfileInfoForm from "@/components/Profile/Form/ProfileInfoForm";
import ProfilePasswordForm from "@/components/Profile/PasswordForm/ProfilePasswordForm";
import { useUserStore } from "@/store/user";
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
    const fetch = async () => {
      const data = await getProfile();

      setUser({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar ?? null,
        role: data.role,
      });

      setLoading(false);
    };

    fetch();
  }, []);

  const handleAvatarChange = (url: string) => {
    updateUser({
      avatar: `${url}?t=${Date.now()}`,
    });
  };

  if (loading || !user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 gap-3">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Đang tải profile...</p>
      </div>
    );
  return (
    <div className="bg-slate-100">
      <div className="h-70 w-full relative">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-5">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
          <ProfileTabs tab={tab} setTab={setTab} />
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
      </div>
    </div>
  );
}
