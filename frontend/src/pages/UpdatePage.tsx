import { useState, useRef, useEffect } from "react";
import { store, ChatMessage } from "@/lib/store";
import { ArrowRight, Sparkles } from "lucide-react";

const aiResponses = [
  "That's a great question! Based on your goals, I'd suggest allocating more time to focused study sessions in the mornings.",
  "I've analyzed your weekly patterns. You're spending 30% more time on work tasks than planned. Let's rebalance.",
  "Nice progress on your health goal! You've been consistent this week. Keep it up!",
  "I notice you haven't updated your reading goal. Would you like to adjust your target?"];


const UpdatePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(store.getChatMessages());
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now()
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    store.setChatMessages(updated);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: Date.now()
      };
      const withAi = [...updated, aiMsg];
      setMessages(withAi);
      store.setChatMessages(withAi);
      setThinking(false);
    }, 1500);
  };

  return (
    <div className="w-full px-6 md:px-12 pt-12 flex flex-col" style={{ height: "calc(100vh - 6rem)" }}>
      <h1 className="font-heading text-6xl font-bold text-foreground mb-4">Update</h1>
      <p className="text-base text-muted-foreground mb-10">Your AI mentor</p>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {messages.length === 0 &&
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
            <Sparkles className="w-14 h-14 text-muted-foreground mb-5" />
            <p className="font-heading text-2xl text-muted-foreground">Start a conversation</p>
            <p className="text-base text-muted-foreground mt-2">Ask about your goals, schedule, or progress</p>
          </div>
        }
        {messages.map((msg) =>
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>

            <div
              className={`max-w-[85%] rounded-[32px] px-8 py-6 text-2xl leading-relaxed shadow-md ${msg.role === "user" ?
                "bg-chat-user text-chat-user-foreground rounded-br-xl" :
                "bg-chat-ai text-foreground rounded-bl-xl"}`
              }>

              {msg.content}
            </div>
          </div>
        )}
        {thinking &&
          <div className="flex justify-start animate-fade-in">
            <div className="bg-chat-ai rounded-[32px] rounded-bl-xl px-7 py-5 text-2xl shadow-md">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-sm font-semibold tracking-widest uppercase">Thinking</span>
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-pulse-dot" />
                  <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-pulse-dot" style={{ animationDelay: "0.3s" }} />
                  <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-pulse-dot" style={{ animationDelay: "0.6s" }} />
                </span>
              </div>
            </div>
          </div>
        }
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-6 mb-4">
        <div className="flex items-end gap-4 bg-surface rounded-[32px] border-2 border-border p-3 px-5 w-11/12 max-w-4xl mx-auto shadow-lg">
          <textarea
            rows={2}
            placeholder="Message Mentor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 bg-transparent px-4 py-3 text-2xl text-surface-foreground placeholder:text-muted-foreground focus:outline-none resize-none" />

          <button
            onClick={sendMessage}
            className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shrink-0 mb-1">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>);

};

export default UpdatePage;