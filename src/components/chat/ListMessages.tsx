"use client";

import { useMessage } from "@/store/messages";
import Message from "./Message";

const ListMessages = () => {
  const messages = useMessage((state) => state.messages);
  return (
    <>
      <div className="flex-1 flex flex-col p-5 overflow-y-auto">
        <div className="flex-1">
          <div className="space-y-5">
            {messages.map((value, index) => {
              return <Message key={index} message={value} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMessages;
