import type { MessageType } from '../types/interview.types'

type Props = {
  message: MessageType
}

<div className='flex-1'></div>
export const ChatMessage = ({ message }: Props) => {
  const isAI = message.sender === 'ai'
  return (
    <li className='flex gap-2 p-3'>
      {
        isAI &&
        <div className="w-10 h-10 border rounded-full flex items-center justify-center shrink-0 ">
          AI
        </div>
      }
      <div
        className={`
          grow rounded-md p-3
          ${isAI ? "bg-gray-200 " : "bg-white border text-right"}
        `}
      >
        {message.text}
      </div>


      {!isAI && (
        <div className="w-10 h-10 border rounded-full flex items-center justify-center shrink-0 ">
          U
        </div>
      )}
    </li>
  )
}
