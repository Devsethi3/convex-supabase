"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/store/user";
import { type Imessage, useMessage } from "@/store/messages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const supabase = supabaseBrowser();

  const handleSendMessage = async () => {
    if (message.trim()) {
      const id = uuidv4();
      const newMessage = {
        id,
        text: message,
        send_by: user?.id,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.user_name,
        },
      };
      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);
      setMessage("");
      const { error } = await supabase
        .from("messages")
        .insert({ text: message, id });
      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Message cannot be empty!");
    }
  };

  return (
    <div className="p-4 dark:shadow-[0px_-20px_50px_0px_#1a202c6c] shadow-[0px_-20px_50px_0px_#fff2f0a2]">

      <div className="max-w-3xl mx-auto flex items-center space-x-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-grow"
        />

        <button onClick={handleSendMessage} className="bg-primary w-12 rounded-md h-11 grid place-items-center text-white">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
}
