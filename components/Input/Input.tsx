export function Input({
  label,
  value,
  onChange,
  disabled = false,
  type = "text",
}: any) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-900"
      />
    </div>
  );
}
