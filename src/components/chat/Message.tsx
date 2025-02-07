import { Imessage } from "@/store/messages";
import Image from "next/image";

const Message = ({ message }: { message: Imessage }) => {
  return (
    <div>
      <div className="flex items-start gap-x-2">
        <Image
          src={message.users?.avatar_url || ""}
          width={35}
          height={35}
          alt={message.users?.display_name || "Unknown"}
          className="rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-x-2">
            <p className="font-medium">{message.users?.display_name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(message.created_at).toDateString()}
            </p>
          </div>
          <p className="opacity-80">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
