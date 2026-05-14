import { Input } from "@/components/Input/Input";

type Props = {
  password: any;
  setPassword: any;
  saving: boolean;
  setSaving: any;
};

export default function ProfilePasswordForm({
  password,
  setPassword,
  saving,
  setSaving,
}: Props) {
  const handleChange = async () => {
    if (password.new !== password.confirm) {
      alert("Không khớp mật khẩu");
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);

    alert("Đổi mật khẩu thành công");
    setPassword({ old: "", new: "", confirm: "" });
  };

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <Input
        type="password"
        label="Mật khẩu cũ"
        value={password.old}
        onChange={(v: string) => setPassword((p: any) => ({ ...p, old: v }))}
      />

      <Input
        type="password"
        label="Mật khẩu mới"
        value={password.new}
        onChange={(v: string) => setPassword((p: any) => ({ ...p, new: v }))}
      />

      <Input
        type="password"
        label="Xác nhận"
        value={password.confirm}
        onChange={(v: string) =>
          setPassword((p: any) => ({ ...p, confirm: v }))
        }
      />

      <div className="md:col-span-2">
        <button
          onClick={handleChange}
          disabled={saving}
          className="px-5 py-2 bg-red-500 text-white rounded-lg"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}
