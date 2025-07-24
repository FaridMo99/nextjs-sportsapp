import React, {
  useActionState,
  useRef,
  useState,
  useEffect,
  startTransition,
} from "react";
import { PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { message } from "./actions";
import BotDotsLoading from "./BotDotsLoading";

function ChatArea() {
  const [state, action, pending] = useActionState(message, null);
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "bot", text: "Hello! My Name is Bally. I am your Assistant." },
  ]);
  const scrollArea = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollArea.current?.scrollTo({
      top: scrollArea.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (state?.reply) {
      setMessages((msgs) => [...msgs, { from: "bot", text: state.reply }]);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) return;

    const newMessages = [...messages, { from: "user", text: value }];
    setMessages(newMessages);

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append(
      "history",
      JSON.stringify(
        newMessages.map((msg) => ({
          role: msg.from === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      ),
    );

    startTransition(() => {
      action(formData);
    });

    setValue("");
  };

  return (
    <PopoverContent className="mr-2 border border-bot-orange flex flex-col justify-between">
      <div
        ref={scrollArea}
        className="w-full h-60 overflow-y-auto overflow-x-hidden p-2"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`w-full flex my-2 ${
              msg.from === "user" ? "justify-end mr-6" : "justify-start -ml-6"
            }`}
          >
            {msg.from === "bot" ? (
              <>
                <Avatar className="w-20 h-10 -mt-1 -mr-4">
                  <AvatarImage src="/AiLogo.svg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="h-auto max-w-2/3 rounded bg-bot-orange p-2 leading-6 flex items-center break-words">
                  <>
                    {msg.text}
                    {i === messages.length - 1 && pending && <BotDotsLoading />}
                  </>
                </div>
              </>
            ) : (
              <>
                <div className="h-auto max-w-2/3 rounded bg-primary text-white p-2 leading-6 flex items-center break-words">
                  {msg.text}
                </div>
                <Avatar className="w-8 h-8 ml-3 bg-secondary-light text-white">
                  <AvatarFallback className="bg-primary">
                    <User />
                  </AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex mt-2"
        name="chatForm"
      >
        <input
          name="message"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          className="border-2 h-8 w-50 mr-2 rounded"
          type="text"
          placeholder="Ask your Assistant..."
          disabled={pending}
        />
        <button
          disabled={value.length === 0 || pending}
          className="bg-bot-orange px-2 rounded  h-8 disabled:bg-gray-300 text-white disabled:cursor-not-allowed"
          type="submit"
        >
          Send
        </button>
      </form>
    </PopoverContent>
  );
}

export default ChatArea;
