import { useState } from "react";
import { askAI } from "@/features/client/AI/libs/api.ai";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>("");

  const ask = async (question: string) => {
    setLoading(true);
    try {
      const res = await askAI(question);
      setAnswer(res.data.answer);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    ask,
    answer,
    loading,
  };
}
