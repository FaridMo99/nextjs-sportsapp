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
//because its a rest endpoint it wont remember previous texts
//so safe thourgh messages header as array for context
//use server actions
//make popup on first render with hey im chatbot etc., then save in session
//storage you already watched so it wont come again
