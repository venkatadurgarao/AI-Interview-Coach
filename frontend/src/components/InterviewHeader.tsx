import React from 'react'
import { useParams } from 'react-router'
import type { InterviewType } from '../types/interview.types';

export const InterviewHeader = ({interviewInfo}:{interviewInfo: InterviewType | undefined}) => {
    // const {interview_id} = useParams();
    
    return (
        <div className="border-b-1 p-1 mb-1">
            <h1 className="text-xl font-bold">AI - Interview | <span className='text-green-500'>{interviewInfo ? interviewInfo.status : "No Data"}</span> </h1>
        </div>
    )
}
