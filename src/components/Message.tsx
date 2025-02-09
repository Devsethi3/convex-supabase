import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/store/user";
import { Imessage, useMessage } from "@/store/messages";

const DEFAULT_AVATAR = "/placeholder.jpg";

export default function Message({ message }: { message: Imessage }) {
  const user = useUser((state) => state.user);
  const isOwner = message.users?.id === user?.id;

  const avatarUrl = message.users?.avatar_url || DEFAULT_AVATAR;
  const displayName = message.users?.display_name || "Anonymous User";
  const messageDate = new Date(message.created_at).toDateString();

  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={displayName}
          width={40}
          height={40}
          className="rounded-full ring-2"
          priority={false}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_AVATAR;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-hidden">
            <h1 className="font-bold truncate">{displayName}</h1>
            <span className="text-sm text-gray-400 flex-shrink-0">
              {messageDate}
            </span>
            {message.is_edit && (
              <span className="text-sm text-gray-400 flex-shrink-0">
                edited
              </span>
            )}
          </div>
          {isOwner && <MessageMenu message={message} />}
        </div>
        <p className="text-gray-300 break-words">{message.text}</p>
      </div>
    </div>
  );
}

const MessageMenu = ({ message }: { message: Imessage }) => {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  const handleAction = (actionType: "edit" | "delete") => {
    const triggerId = `trigger-${actionType}`;
    const triggerElement = document.getElementById(triggerId);

    if (triggerElement) {
      triggerElement.click();
      setActionMessage(message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Message Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleAction("edit")}
        >
          Edit Message
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500"
          onClick={() => handleAction("delete")}
        >
          Delete Message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
