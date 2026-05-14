"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/theme/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

type TProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: TProps) {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 font-sans select-none">
      {/* 1. Base Gradient Layer - Mesh Gradient Effect */}
      <div
        className="absolute inset-0 z-0 transition-all duration-1000
          bg-[#f8fafc] dark:bg-[#020617]"
      />

      {/* 2. Animated Blob - Tạo chiều sâu cho background */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full 
          bg-sky-400/20 dark:bg-blue-600/10 blur-[120px] animate-pulse"
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full 
          bg-indigo-400/20 dark:bg-indigo-900/20 blur-[120px] animate-pulse delay-700"
        />
      </div>

      {/* 3. Grid Pattern Overlay - Cho cảm giác kỹ thuật (WebGIS style) */}
      <div
        className="absolute inset-0 z-20 opacity-[0.03] dark:opacity-[0.05] 
        bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"
      />
      <div className="absolute inset-0 z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 4. Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-30 w-full max-w-[440px] px-4"
      >
        <div
          className="
            relative overflow-hidden
            rounded-[2rem] p-10 transition-all duration-700
            border border-white/40 dark:border-white/5
            bg-white/60 dark:bg-slate-900/40
            shadow-[0_20px_50px_rgba(0,0,0,0.05)]
            dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
            backdrop-blur-3xl
          "
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />

          {children}
        </div>

        {/* Brand/Footer Link (Optional) */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase font-semibold">
            © 2026 WebGIS Management System
          </p>
        </div>
      </motion.div>

      {/* 5. Modern Theme Toggle */}
      <div className="absolute bottom-8 right-8 z-50">
        <button
          onClick={toggleTheme}
          className="
            group relative flex items-center justify-center
            w-12 h-12 rounded-2xl
            bg-white/80 dark:bg-slate-800/80
            border border-slate-200 dark:border-slate-700
            shadow-lg shadow-slate-200/50 dark:shadow-black/20
            hover:scale-110 active:scale-95 transition-all duration-300
            backdrop-blur-md
          "
        >
          <div className="relative w-6 h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {dark ? (
                <motion.div
                  key="moon"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MoonIcon className="w-6 h-6 text-indigo-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SunIcon className="w-6 h-6 text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </div>
  );
}
