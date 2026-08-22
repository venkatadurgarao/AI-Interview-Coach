import axios, { AxiosError } from 'axios'
import type { LoginCredentialType, LoginResponse, RegisterUserType } from '../types/auth.types';
import { useDispatch } from 'react-redux';
import { addSnackbar } from '../redux/state/snackbarSlice';
import { nanoid } from '@reduxjs/toolkit';
import type { ChatMessageResponse, GetInterviewChatResponse, interviewFilter, InterviewListResponse, InterviewResponse, InterviewSetupType, SubmitMyAnswerResponse } from '../types/interview.types';

export const api = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 1000*60*3,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

// api.get("", {}).then


api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401 && !error.config?.url?.includes("/login")) {
            console.log("Unauthorized");
            localStorage.clear();
            // window.location.href = "/";
            window.location.replace("/");
        }
        return Promise.reject(error);
    }
)

export const apis = {
    login: (data: LoginCredentialType) => api.post<LoginResponse>("/auth/login", data),
    register: (data: RegisterUserType) => api.post("/auth/register", data),

    verifyToken: () => api.get('/auth/verify-token'),

    startInterview: (data: InterviewSetupType) => api.post<InterviewResponse>("/private/interview", data),
    getActiveInterviews: ({ status = "active", page = 1, limit = 1 }: interviewFilter) => api.get<InterviewListResponse>("/private/interview", { params: { status, page, limit } }),

    getInterviewInfo: (interview_id: string) => api.get<InterviewResponse>(`/private/interview/${interview_id}`),
    generateQuestion: (interview_id: string) => api.post<ChatMessageResponse>(`/private/interview/${interview_id}/question`),
    
    getInterviewChat: (interview_id: string) => api.get<GetInterviewChatResponse>(`/private/interview/${interview_id}/chat`),

    submitMyAnswer: (interview_id: string, data: { answer: string, topic_id: number }) => api.post<SubmitMyAnswerResponse>(`/private/interview/${interview_id}/chat`, data),

};