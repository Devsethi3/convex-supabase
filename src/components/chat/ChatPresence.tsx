"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useUser } from "@/store/user";
import React, { useEffect, useState } from "react";
import { RealtimePresenceState } from "@supabase/supabase-js";

interface PresenceState {
  user_id: string;
  online_at: string;
}

export default function ChatPresence() {
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const channel = supabase.channel("room1");

    channel
      .on("presence", { event: "sync" }, () => {
        const presenceState =
          channel.presenceState() as RealtimePresenceState<PresenceState>;
        const userIds = Object.values(presenceState)
          .flat()
          .map((presence) => presence.user_id);

        setOnlineUsers([...new Set(userIds)].length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED" && user?.id) {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user.id,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user, supabase]);

  if (!user) {
    return <div className="h-3 w-1"></div>;
  }

  return (
    <div className="flex items-center gap-1">
      <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
      <h1 className="text-sm text-gray-400">
        {onlineUsers} {onlineUsers === 1 ? "online" : "online"}
      </h1>
    </div>
  );
}
