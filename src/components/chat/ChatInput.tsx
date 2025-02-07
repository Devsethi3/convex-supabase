"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { Input } from "../ui/input";
import { toast } from "sonner";

const ChatInput = () => {
  const supabase = supabaseBrowser();

  const handleSendMessage = async (text: string) => {
    alert(text);
    const { error } = await supabase.from("messages").insert({ text });
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="p-5">
        <Input
          placeholder="Send Messages..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </>
  );
};

export default ChatInput;
