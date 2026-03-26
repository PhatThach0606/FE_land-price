"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>

        <p className="mt-4 text-xl font-semibold text-gray-700">
          Page Not Found
        </p>

        <p className="mt-2 text-gray-500">URL not Exist</p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="cursor-pointer rounded-xl border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="cursor-pointer rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition shadow-md"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
