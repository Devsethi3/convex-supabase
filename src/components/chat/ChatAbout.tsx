import Image from "next/image";
import React from "react";

export default function ChatAbout() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col">
      <Image
        src="/new-message.svg"
        width={200}
        height={200}
        alt="new-message"
      />
      <div className="text-center space-y-5">
        <h1 className="text-3xl font-semibold">
          Welcome to Daily Chat
        </h1>
        <p className="max-w-[400px] opacity-80">
          Experience seamless real-time conversations powered by Supabase. Sign
          in to start chatting instantly and connect with your community.
        </p>
      </div>
    </div>
  );
}
