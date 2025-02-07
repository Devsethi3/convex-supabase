"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";
import { User } from "@supabase/supabase-js";

const ChatHeader = ({ user }: { user: User | undefined }) => {
  const router = useRouter();

  const handleLoginWithGoogle = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      <div className="h-20">
        <div className="p-5 border-b flex items-center justify-between h-full">
          <div>
            <h1 className="text-xl font-bold">Daily Chat</h1>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            ) : (
              <Button onClick={handleLoginWithGoogle}>Login</Button>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
