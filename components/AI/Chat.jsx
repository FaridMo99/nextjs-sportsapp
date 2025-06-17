"use client";
import React from "react";
import { Popover } from "@/components/ui/popover";

import LogoIcon from "./LogoIcon";
import ChatArea from "./ChatArea";

function Chat() {
  return (
    <section>
      <Popover>
        <LogoIcon />
        <ChatArea />
      </Popover>
    </section>
  );
}

export default Chat;
