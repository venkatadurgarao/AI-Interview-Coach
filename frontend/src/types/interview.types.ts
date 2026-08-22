export type InterviewSetupType = {
    role: string;
    technology: string;
    experience: string;
    difficulty: string;
    duration: string;
    question_type: string;
}
export type InterviewType = {
  id: string; // UUID
  role: string;
  technology: string;
  experience: string;
  difficulty: string;
  duration: string;
  question_type: string;
  status: string;
  user_email: string;
  created_at: Date;
  updated_at: Date;
};



export type InterviewResponse = {
    success: boolean;
    message: string;
    error: string;
    interview_info: InterviewType;
}

export type InterviewListResponse ={
    rows_count: number;
    message: string;
    interviews: InterviewType[];
}

export type MessageType = {
    id: number;
    text: string;
    sender: "ai" | "user";
}

export type ChatMessageType = {
    id: string;
    interview_id: string;
    topic_id: string;
    response: string;
    responded_by: "ai" | "user";
    response_status: string;
    created_at: string;
    updated_at: string;
}

export type GetInterviewChatResponse = {
    message: string
    success: boolean
    chat: ChatMessageType[]
}

export type ChatMessageResponse = {
    success: string;
    message: string;
    chatMessage: ChatMessageType;
}


export type SubmitMyAnswerResponse = {
    success: string;
    message: string;
    chatMessage: ChatMessageType[] | [ChatMessageType | null];
}

export type interviewFilter = {
  status?: "active" | "pending" | "all" | "completed" | undefined;
  page: number;
  limit: number;
  count: number;
}