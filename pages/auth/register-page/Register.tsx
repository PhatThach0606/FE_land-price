"use client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Register() {
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
          Tài khoản
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
            id="account"
            type="text"
            placeholder="Nhập tài khoản"
            className="w-full py-2 outline-none dark:text-white text-gray-500 bg-transparent"
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
            placeholder="Nhập email"
            className="w-full py-2 outline-none dark:text-white text-gray-500 bg-transparent"
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
            placeholder="Nhập mật khẩu"
            className="w-full py-2 outline-none text-gray-500 dark:text-white bg-transparent"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm dark:text-gray-300 mb-2 cursor-pointer"
        >
          Xác nhận mật khẩu
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
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full py-2 outline-none text-gray-500 dark:text-white bg-transparent"
          />
        </div>
      </div>

      {/* Register Button */}
      <button
        className="
        w-full py-3 mt-6 rounded-full text-white font-semibold
        bg-linear-to-r from-blue-500 to-cyan-400
        shadow-md hover:scale-[1.02]
        active:scale-[0.98]
        transition-all duration-200
        cursor-pointer
        "
      >
        ĐĂNG KÝ
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
