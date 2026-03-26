"use client";
import { useEffect, useState } from "react";

type TProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: TProps) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700">
      {/* Animated Gradient Background */}
      <div
        className="
        absolute inset-0 z-0
       bg-gradient-to-br
from-sky-300 via-blue-400 to-cyan-200
      dark:from-black dark:via-blue-950 dark:to-blue-900
        bg-size-[400%_400%]
        animate-gradient
        "
      />

      {/* Moving Light Layer */}
      <div
        className="
  absolute inset-0 z-10
  bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.6),transparent_40%),
      radial-gradient(circle_at_85%_80%,rgba(0,180,255,0.25),transparent_40%)]
  dark:bg-[radial-gradient(circle_at_30%_30%,rgba(0,150,255,0.35),transparent_50%)]
  animate-glow
  "
      />

      {/* Glass Blur Layer */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/50 backdrop-blur-xl z-20" />

      {/* Form Container */}
      <div className="relative z-30 w-full max-w-md p-8">
        <div
          className="
          rounded-2xl p-8 transition-all duration-700
          border
        bg-white/70 border-white/60
shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          dark:bg-gray-500/200 dark:border-blue-400/20
          dark:shadow-[0_0_60px_rgba(0,120,255,0.25)]
          backdrop-blur-2xl
          "
        >
          {children}
        </div>
      </div>

      {/* Professional Toggle */}
      <div className="absolute bottom-6 right-6 z-40">
        <button
          onClick={() => setDark(!dark)}
          className="
         
          relative w-14 h-8 rounded-full
          bg-gray-300 dark:bg-blue-900
          transition-all duration-500
          shadow-inner
          "
        >
          <div
            className={`
           
              absolute top-1 left-1 w-6 h-6 rounded-full
              bg-white dark:bg-blue-400
              shadow-md
              transition-all duration-500
              ${dark ? "translate-x-6" : ""}
            `}
          />
        </button>
      </div>
    </div>
  );
}
