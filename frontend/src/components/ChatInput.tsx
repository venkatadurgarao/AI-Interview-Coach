import React from 'react'
import { FaArrowUp, FaPlus } from 'react-icons/fa'

type CompType = {
  userAnswer: string;
  // setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
  setUserAnswer: (value: string) => void;
  submitUserAnswer: () => void;

}
export const ChatInput = ({userAnswer, setUserAnswer, submitUserAnswer}:CompType) => {
  return (
    <div className="bottom-0">
      <div className="flex flex-col gap-3 border-1 rounded-2xl p-1 m-3">
        <textarea placeholder="Enter your answer..." value={userAnswer} className=" h-[100%] w-[100%] resize-none outline-none py-1 px-2 " rows={3} maxLength={1500} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setUserAnswer(e.target.value)} ></textarea>
        <div className="flex justify-between px-3">
          <button className="w-[40px] h-[40px] border-1 rounded-[100%] flex items-center justify-center hover:bg-black hover:text-white"><FaPlus /></button>
          <button className="w-[40px] h-[40px] border-1 rounded-[100%] flex items-center justify-center hover:bg-black hover:text-white" onClick={submitUserAnswer}><FaArrowUp /></button>
        </div>
      </div>
    </div>
  )
}
