"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-900 p-4">
      <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 p-3">
        <input
          type="text"
          placeholder="Ask anything about your college..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500"
        />

        <button
          onClick={handleSend}
          className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}