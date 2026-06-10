"use client";

import { useState, useRef, useEffect } from "react";
import { TbRobot } from "react-icons/tb";
import { Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const MAX_CHARS = 300;

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "bot",
  content: "Hey! I'm Arwin's assistant. Ask me anything about his work, experience, or skills.",
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
    ]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: data.reply ?? "Sorry, I couldn't get a response.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div
          className="w-[320px] sm:w-[360px] flex flex-col rounded-2xl border border-border shadow-2xl shadow-black/30 overflow-hidden"
          style={{ backgroundColor: "var(--background)", height: 480 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0" style={{ backgroundColor: "var(--background)" }}>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shrink-0">
              <TbRobot className="text-white text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Arwin&apos;s Assistant</p>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" ? (
                  <div className="flex items-end gap-2 max-w-[82%]">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shrink-0 mb-0.5">
                      <TbRobot className="text-white text-[11px]" />
                    </div>
                    <div className="bg-muted text-foreground text-sm px-3 py-2 rounded-2xl rounded-bl-sm leading-relaxed prose-chat">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc list-inside mt-1 space-y-0.5">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mt-1 space-y-0.5">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          code: ({ children }) => <code className="bg-black/20 rounded px-1 font-mono text-xs">{children}</code>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm px-3 py-2 rounded-2xl rounded-br-sm max-w-[82%] leading-relaxed">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shrink-0">
                  <TbRobot className="text-white text-[11px]" />
                </div>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        animationDelay: `${delay}ms`,
                        backgroundColor: "var(--muted-foreground)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border px-3 py-3 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                maxLength={MAX_CHARS}
                className="flex-1 bg-muted text-foreground text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500/40 placeholder:text-muted-foreground/50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                aria-label="Send"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] text-muted-foreground/50">Press Enter to send</p>
              <p className={`text-[10px] tabular-nums ${input.length >= MAX_CHARS ? "text-rose-400" : "text-muted-foreground/50"}`}>
                {input.length}/{MAX_CHARS}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle chat"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {open ? <X size={22} /> : <TbRobot className="text-2xl" />}
      </button>
    </div>
  );
};
