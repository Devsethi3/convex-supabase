"use client";
import { LIMIT_MESSAGE } from "@/constant";
import React, { useEffect, useRef } from "react";
import { Imessage, useMessage } from "./messages";


export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGE;

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);

  return <></>;
}
