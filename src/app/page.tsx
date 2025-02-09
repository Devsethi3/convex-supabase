import React from "react";
import { supabaseServer } from "@/lib/supabase/server";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatAbout from "@/components/chat/ChatAbout";
import InitUser from "@/store/InitUser";
import ChatMessages from "@/components/chat/ChatMessages";

export default async function Page() {
  const supabase = supabaseServer();
  const { data } = await (await supabase).auth.getSession();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className=" h-full border lg:rounded-md rounded-none flex flex-col relative">
          <ChatHeader user={data.session?.user} />

          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
