"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import ChatInput from "./ChatInput";
import { sendMessageStream } from "@/services/chatService";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // User + Empty AI message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
      {
        role: "assistant",
        content: "",
      },
    ]);

    setLoading(true);

    try {
      await sendMessageStream(text, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };

          return updated;
        });
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          content: "⚠️ Something went wrong.",
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section className="flex flex-1 flex-col bg-zinc-900">
      <Header />

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold">
                Welcome to CampusAI 👋
              </h2>

              <p className="mt-4 text-zinc-400">
                Ask anything about your college.
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 ${
                  msg.role === "user"
                    ? "ml-auto w-fit bg-blue-600 text-white"
                    : "mr-auto w-fit bg-zinc-800 text-white"
                }`}
              >
                {msg.role === "assistant" ? (
                  <MarkdownRenderer content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            ))}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </section>
  );
}