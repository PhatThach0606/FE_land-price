import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "./../schema";

interface Props {
  initialData?: any;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

export default function UserForm({ initialData, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
    },
  });

  const labelStyle = "block text-sm font-medium text-gray-400 mb-1";
  const inputStyle = (error?: any) =>
    `w-full p-2.5 bg-gray-800 border rounded-lg outline-none transition-all ${
      error
        ? "border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-700 focus:border-indigo-500"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-200">
      <div>
        <label className={labelStyle}>Họ tên</label>
        <input
          {...register("full_name")}
          className={inputStyle(errors.full_name)}
        />
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.full_name.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Email</label>
          <input
            {...register("email")}
            disabled={!!initialData} // Khóa email khi update
            className={`${inputStyle(errors.email)} ${initialData ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className={labelStyle}>Số điện thoại</label>
          <input {...register("phone")} className={inputStyle(errors.phone)} />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Vai trò</label>
          <select {...register("role")} className={inputStyle(errors.role)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        {!initialData && (
          <div>
            <label className={labelStyle}>Mật khẩu</label>
            <input
              type="password"
              {...register("password")}
              className={inputStyle(errors.password)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all"
        >
          {initialData ? "Lưu thay đổi" : "Tạo người dùng"}
        </button>
      </div>
    </form>
  );
}
