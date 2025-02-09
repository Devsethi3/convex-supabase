import { LIMIT_MESSAGE } from "@/constant";
import { supabaseServer } from "@/lib/supabase/server";
import { Suspense } from "react";
import ListMessages from "../ListMessages";
import InitMessages from "@/store/InitMessages";
import Image from "next/image";

const ChatMessages = async () => {
  const supabase = await supabaseServer();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch messages:", error);
    return (
      <div className="text-center text-red-500">
        Error loading messages. Please try again later.
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <Image
          src="/no-message.svg"
          width={200}
          height={200}
          alt="new-message"
        />
        <h1 className="text-2xl font-bold">Start the Conversation</h1>
        <p className="max-w-[300px] text-muted-foreground">
          No messages yet! Be the first to send a message and start chatting in
          real time.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListMessages />
      <InitMessages messages={messages.reverse()} />
    </Suspense>
  );
};

export default ChatMessages;
