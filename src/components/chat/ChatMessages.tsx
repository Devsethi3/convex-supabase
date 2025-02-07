import { Suspense } from "react";
import ListMessages from "./ListMessages";
import { supabaseServer } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import InitMessages from "@/store/InitMessage";
import { LIMIT_MESSAGE } from "@/lib/constant";

const ChatMessages = async () => {
  const supabase = await supabaseServer();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch messages:", error);
    return <div>Error loading messages</div>;
  }

  console.log(messages);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListMessages />
      <InitMessages messages={messages?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
