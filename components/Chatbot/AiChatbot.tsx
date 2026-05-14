"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askAI } from "@/features/client/AI/libs/api.ai";
import { Send, X, Loader2 } from "lucide-react"; // Cài lucide-react nếu chưa có
import { useUserStore } from "@/store/user";
type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AiChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "👋 Xin chào! Tôi là trợ lý giá đất, bạn cần hỏi gì?",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const question = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await askAI(question);
      setMessages((prev) => [...prev, { role: "ai", content: res.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "❌ Lỗi AI server" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* POPUP CHAT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[380px] h-[550px] bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <img
                    src="/assistant.png"
                    alt="AI"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    Trợ lý AI
                  </h3>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />{" "}
                    Đang trực tuyến
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-slate-800 cursor-pointer rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* CHAT BODY */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/30 scrollbar-thin scrollbar-thumb-slate-700"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar nhỏ trong tin nhắn */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === "user" ? "bg-blue-600" : "bg-slate-800 border border-slate-700"}`}
                    >
                      {msg.role === "user" ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={user?.avatar || ""}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                      ) : (
                        <img
                          src="/assistant.png"
                          alt="AI"
                          className="w-5 h-5 object-contain"
                        />
                      )}
                    </div>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start items-center gap-2 text-slate-500 text-[12px] italic ml-9">
                  <Loader2 size={14} className="animate-spin" /> AI đang soạn
                  văn bản...
                </div>
              )}
            </div>

            {/* INPUT SECTION */}
            <div className="p-4 bg-[#0f172a] border-t border-slate-800">
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Nhập nội dung câu hỏi..."
                  className="flex-1 bg-slate-800/50 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-30 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON - CÓ HIỆU ỨNG NHẢY VÔ TẬN */}
      <motion.button
        onClick={() => setOpen(!open)}
        animate={open ? { y: 0, scale: 1 } : { y: [0, -12, 0] }}
        transition={
          open
            ? { duration: 0.2 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        className={`
          w-16 h-16 cursor-pointer rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-colors border-2
          ${open ? "bg-slate-800 border-slate-700 text-white" : "bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent"}
        `}
      >
        {open ? (
          <X size={32} />
        ) : (
          <div className="relative">
            <img
              src="/assistant.png"
              alt="assistant"
              className="w-10 h-10 object-contain drop-shadow-md"
            />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0f172a] rounded-full" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
