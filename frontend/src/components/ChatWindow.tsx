import { useEffect, useRef, useState } from "react";
import type { MessageType } from "../types/interview.types";
import { ChatMessage } from "./ChatMessage"
import ErrorBoundary from "./ErrorBoundary"
import { FallingLines, MutatingDots, Puff, Rings, ThreeDots } from "react-loader-spinner";
// import { FaRegCopy } from "react-icons/fa";
// import { FaCopy } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { Copy } from "./Copy";
import { useParams } from "react-router";
import { apis } from "../api/api";

// const default_value: MessageType[] = [
//   { id: 1, sender: 'ai', text: "How can i help you" },
//   { id: 2, sender: 'user', text: "How to start react project ?" },
//   { id: 3, sender: 'ai', text: "Ask anything here..." },
//   { id: 4, sender: 'user', text: "How to start react project ?" },
//   { id: 5, sender: 'ai', text: "Ask anything here..." },
//   { id: 6, sender: 'ai', text: "Ask anything here..." },
//   { id: 7, sender: 'user', text: "How to start react project ?" },
//   { id: 8, sender: 'user', text: "How to start react project ?" },
//   { id: 9, sender: 'user', text: "How to start react project ?" },
//   { id: 10, sender: 'user', text: "How to start react project ?" },
//   { id: 11, sender: 'user', text: "How to start react project ?" },
// ];
type ChatWindowType = { 
  messages?: MessageType[],
  responseLoading: boolean,
  regenarateQuestion: () => void,
  socketMessages?: string
}
export const ChatWindow = ({ messages = [], responseLoading, regenarateQuestion, socketMessages }: ChatWindowType) => {
  const messageEndRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });

  }, [messages, responseLoading]);
  // console.log({ messages });

  const { interview_id } = useParams<{ interview_id: string }>();
  

  return (
    <div className="overflow-y-auto  min-h-0">
      <ul>
        {/* <li> */}
        <ErrorBoundary>
          {
            messages.length > 0 && messages.map(({ id, sender, text }, i) =>
            (
              <div key={id}>
                <ChatMessage message={{ id, sender, text }} />
                <div className={`flex gap-3 px-5 ${sender === "ai" ? `justify-start` : `justify-end`}`} >
                  {messages.at(-1) && messages.length - 1 === i && messages.at(-1)?.sender === "user" && <FiRefreshCcw onClick={regenarateQuestion} />}
                  <Copy text={text} />
                </div>
              </div>
            )
            )
          }
          <li>
            <MutatingDots
              visible={responseLoading}
              height="100"
              width="100"
              color="#51a2ff"
              secondaryColor="#51a2ff"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <span className="px-5  moving-gradient" >
              {socketMessages && responseLoading && socketMessages}
            </span>
          </li>
          <li ref={messageEndRef}></li>
        </ErrorBoundary>
        {/* </li> */}
      </ul>

    </div>
  )
}
