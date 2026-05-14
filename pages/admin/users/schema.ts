import { z } from "zod";

export const userSchema = z.object({
  full_name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(
      /^(0)(3[2-9]|5[689]|7[06-9]|8[1-5]|9[0-9])\d{7}$/,
      "Số điện thoại không hợp lệ",
    ),
  role: z.enum(["ADMIN", "USER"]),
  password: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(val);
      },
      {
        message: "Mật khẩu ≥ 6 ký tự, có chữ hoa, chữ thường và số",
      },
    ),
});

export type UserFormData = z.infer<typeof userSchema>;
