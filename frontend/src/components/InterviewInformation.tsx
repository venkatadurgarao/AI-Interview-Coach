import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { apis } from '../api/api';
import type { InterviewType } from '../types/interview.types';
type Props = {
    topicName: string;
    setTopicName: (value: string) => void;
    startInterview: () => void;
}
export const InterviewInformation = ({interviewInfo}:{interviewInfo: InterviewType | undefined}) => {
    const {interview_id} = useParams<{interview_id: string}>();
    console.log({interview_id});
    return (
        <div className="gap-5 items-center w-full">
            <div className='p-2 grid grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4  place-items-center text-xs'>
                <div>
                    <label htmlFor="" className='font-bold'> Role :</label>
                    <span> {interviewInfo?.role} </span>
                </div>
                <div className=''>
                    <label htmlFor="" className='font-bold'> Technology :</label>
                    <span> {interviewInfo?.technology} </span>
                </div>
                <div className=''>
                    <label htmlFor="" className='font-bold'> Experiance :</label>
                    <span> {interviewInfo?.experience} </span>
                </div>
                <div className=''>
                    <label htmlFor="" className='font-bold'> Duration :</label>
                    <span> {interviewInfo?.duration} </span>
                </div>
                <div className=''>
                    <label htmlFor="" className='font-bold'> Question Type :</label>
                    <span> {interviewInfo?.question_type} </span>
                </div>
                <div className=''>
                    <label htmlFor="" className='font-bold'> Difficulty :</label>
                    <span> {interviewInfo?.difficulty} </span>
                </div>
            </div>
            {/* <label htmlFo className='font-bold'r="">Topic:</label>
            <select className="border-1 disabled:opacity-50 disabled:cursor-not-allowed" value={topicName} onChange={(e) => { setTopicName(e.target.value) }} disabled={interview_id ? true : false}>
                <option value="">Select Topic</option>
                <option value="NodeJS">NodeJS</option>
                <option value="PHP">PHP</option>
                <option value="MySQL">MySQL</option>
            </select>
            <button disabled={interview_id ? true : false} className="border-1 hover:bg-black hover:text-white px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={startInterview}>Start Interview</button> */}
        </div>
    )
}
