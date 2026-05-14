"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Register() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
  });

  const validate = () => {
    // name
    if (!account.full_name.trim()) {
      toast.error("Vui lòng nhập họ tên");
      return false;
    }

    // email regex chuẩn
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.email)) {
      toast.error("Email không hợp lệ");
      return false;
    }

    // password regex mạnh
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(account.password)) {
      toast.error("Mật khẩu phải ≥ 6 ký tự, có chữ hoa, chữ thường và số");
      return false;
    }

    // phone
    const phoneRegex = /^(0)(3[2-9]|5[689]|7[06-9]|8[1-5]|9[0-9])\d{7}$/;
    if (!phoneRegex.test(account.phone)) {
      toast.error("Số điện thoại không hợp lệ (phải đúng đầu số VN và 10 số)");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await register(account);

      toast.success("Đăng ký thành công 🎉");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center dark:text-white/90 mb-8">
        Đăng ký
      </h1>

      {/* Username */}
      <div className="mb-6">
        <label
          htmlFor="account"
          className="block text-sm dark:text-gray-300 mb-2 cursor-pointer"
        >
          Họ tên
        </label>

        <div className="flex items-center border-b border-gray-300 focus-within:border-blue-500 transition">
          <span className="text-gray-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </span>
          <input
            id="full_name"
            type="text"
            value={account.full_name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
            className="w-full py-2 outline-none border-none dark:text-white text-gray-500 bg-transparent"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm dark:text-gray-300 mb-2 cursor-pointer"
        >
          Email
        </label>

        <div className="flex items-center border-b border-gray-300 focus-within:border-blue-500 transition">
          <span className="text-gray-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0-9.75 6.75L2.25 7.5"
              />
            </svg>
          </span>
          <input
            id="email"
            type="email"
            value={account.email}
            onChange={handleChange}
            placeholder="Nhập email"
            className="w-full py-2 border-none outline-none dark:text-white text-gray-500 bg-transparent"
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm dark:text-gray-300 mb-2 cursor-pointer"
        >
          Mật khẩu
        </label>

        <div className="flex items-center border-b border-gray-300 focus-within:border-blue-500 transition">
          <span className="text-gray-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </span>
          <input
            id="password"
            type="password"
            value={account.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            className="w-full py-2 outline-none border-none text-gray-500 dark:text-white bg-transparent"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm dark:text-gray-300 mb-2 cursor-pointer"
        >
          Số điện thoại
        </label>

        <div className="flex items-center border-b border-gray-300 focus-within:border-blue-500 transition">
          <span className="text-gray-400 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </span>
          <input
            id="phone"
            type="password"
            value={account.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            className="w-full py-2 outline-none border-none text-gray-500 dark:text-white bg-transparent"
          />
        </div>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        disabled={loading}
        className="
        w-full py-3 mt-6 rounded-full text-white font-semibold
        bg-linear-to-r from-blue-500 to-cyan-400
        shadow-md hover:scale-[1.02]
        active:scale-[0.98]
        transition-all duration-200
        cursor-pointer
        "
      >
        {loading ? "Đang xử lý..." : "ĐĂNG KÝ"}
      </button>

      <div className="text-center text-sm text-gray-500 mt-5 ">
        <span className="mr-1">Đã có tài khoản? </span>
        <Link href="/login" className="hover:text-blue-600  cursor-pointer">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
