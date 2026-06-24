import { Input } from "@/components/Input/Input";
import { updateProfile } from "@/features/user/profile/update";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

type Props = {
  form: any;
  setForm: any;
  saving: boolean;
  setSaving: any;
};

export default function ProfileInfoForm({
  form,
  setForm,
  saving,
  setSaving,
}: Props) {
  const { user, updateUser } = useUserStore();
useEffect(() => {
  if (user) {
    setForm({
      full_name: user.full_name || "",
      phone: user.phone || "",
    });
  }
}, [user]);
  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await updateProfile({
        full_name: form.full_name,
        phone: form.phone,
      });

      updateUser({
        full_name: res?.full_name,
        phone: res?.phone,
      });

      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <Input
        label="Họ tên"
        value={form?.full_name || ""}
        onChange={(v: string) =>
          setForm((p: any) => ({ ...p, full_name: v }))
        }
      />

      <Input
        label="Email"
        value={user?.email || ""}
        disabled
      />

      <Input
        label="Số điện thoại"
        value={form?.phone || ""}
        onChange={(v: string) =>
          setForm((p: any) => ({ ...p, phone: v }))
        }
      />

      <div className="md:col-span-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-2 px-5 py-2 bg-green-500 text-white rounded-lg"
        >
          {saving ? "Đang lưu..." : "Cập nhật thông tin"}
        </button>
      </div>
    </div>
  );
}