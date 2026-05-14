type Props = {
  tab: "info" | "password";
  setTab: (t: "info" | "password") => void;
};

export default function ProfileTabs({ tab, setTab }: Props) {
  return (
    <div className="mt-6 flex gap-6 border-b">
      <button
        onClick={() => setTab("info")}
        className={`pb-2 text-sm ${
          tab === "info"
            ? "border-b-2 border-blue-500 font-semibold text-gray-900"
            : "text-gray-700"
        }`}
      >
        Thông tin
      </button>

      <button
        onClick={() => setTab("password")}
        className={`pb-2 text-sm ${
          tab === "password"
            ? "border-b-2 border-blue-500 font-semibold text-gray-900"
            : "text-gray-700"
        }`}
      >
        Mật khẩu
      </button>
    </div>
  );
}
