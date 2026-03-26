"use client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
export default function Login() {
  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center dark:text-white/90 mb-8">
        Đăng nhập
      </h1>

      {/* Username */}
      <div className="mb-6">
        <label
          htmlFor="account"
          className="block text-sm dark:text-gray-300 mb-2  cursor-pointer"
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

      {/* Password */}
      <div className="mb-2">
        <label
          htmlFor="password"
          className="block text-sm dark:text-gray-300 mb-2  cursor-pointer"
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
            placeholder="Nhập mật khâu"
            className="w-full py-2 outline-none text-gray-500 dark:text-white bg-transparent"
          />
        </div>
      </div>

      <div className="text-right text-sm text-gray-500 mb-6 hover:text-blue-600 cursor-pointer">
        Quên mật khẩu
      </div>

      {/* Login Button */}
      <button
        className="
        w-full py-3 rounded-full text-white font-semibold
        bg-linear-to-r from-blue-500 to-cyan-400
        shadow-md hover:scale-[1.02]
        active:scale-[0.98]
        transition-all duration-200
        cursor-pointer
        "
      >
        ĐĂNG NHẬP
      </button>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400">Đăng nhập với</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Google Login */}
      <div className="flex justify-center">
        <button
          className="
          flex items-center gap-3
          px-6 py-2 rounded-full
          border border-gray-300
          hover:bg-gray-50
          dark:hover:bg-gray-200
          transition-all duration-200
          cursor-pointer
          "
        >
          <FcGoogle size={22} />
          <span className="text-sm font-medium text-gray-700 ">
            Đăng nhập với Google
          </span>
        </button>
      </div>
      <div className="text-center  text-sm text-gray-500 mt-5  hover:text-blue-600 cursor-pointer">
        <Link href="/register">Đăng ký tài khoản</Link>
      </div>
    </div>
  );
}
