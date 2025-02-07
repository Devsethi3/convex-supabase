"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/store/user";

const ChatInput = () => {
  const supabase = supabaseBrowser();
  const user = useUser((state) => state.user);

  const handleSendMessage = async (text: string) => {
    const newMessage = {
      id: uuidv4(),
      text,
      send_by: user?.id,
      is_edit: false,
      created_at: new Date().toISOString,
      users: {
        id: user?.id,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString,
        display_name: user?.user_metadata.user_name,
      },
    };
    
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
