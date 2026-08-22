import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { InterviewInformation } from "../../components/InterviewInformation";
import { ChatInput } from "../../components/ChatInput";
import { InterviewHeader } from "../../components/InterviewHeader";
import { ChatWindow } from "../../components/ChatWindow";
import { useDispatch } from "react-redux";
import { addSnackbar } from "../../redux/state/snackbarSlice";
import { nanoid } from "@reduxjs/toolkit";
import { apis } from "../../api/api";
import type { InterviewType, MessageType } from "../../types/interview.types";
import { BallTriangle } from "react-loader-spinner";
import { ContentHeader } from "../../components/ContentHeader";



export const InterviewStart = () => {
    const { interview_id } = useParams<{ interview_id: string }>();
    const [interviewInfo, setInterviewInfo] = useState<InterviewType | undefined>();
    

    const [chatLoading, setChatLoading] = useState<boolean>(false);
    const [responseLoading, setResponseLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageType[]>([]);

    const [responseLog, setResponseLog] = useState<string>("");
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [topicId, setTopicId] = useState<number | undefined>(undefined);

    const [socketMessage, setSocketMessage] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        if (!interview_id) navigate("/interview_active");

        const socket = new WebSocket(
            `ws://localhost:8000/ws/${interview_id}`
        );

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setSocketMessage(event.data)
            console.log("Server:", data);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };



        const fetch_chat_info = async () => {
            if (interview_id) {
                try {
                    setChatLoading(true);
                    console.log("Request started");
                    const res = await apis.getInterviewInfo(interview_id);
                    setInterviewInfo(res.data.interview_info)

                    fetchMessages(interview_id);
                } catch (e: any) {
                    console.error("Error: ", e)
                    dispatch(addSnackbar({ id: nanoid(), message: e.message, type: 'error' }))
                }
            }
        }
        fetch_chat_info();
        console.log("interview start useEffect is runnnig");
    }, [interview_id, dispatch]);

    const fetchMessages = async (interview_id: string) => {
        const chat_res = await apis.getInterviewChat(interview_id);

        if (chat_res.data?.success) {
            const filterArr: MessageType[] = chat_res.data.chat.map((item) => ({ id: parseInt(item.id), sender: item.responded_by, text: item.response }))
            setMessages(filterArr);
            setChatLoading(false);
            const value = Number(chat_res.data.chat.at(-1)?.topic_id);
            console.log({ value })
            if (chat_res.data.chat.at(-1)?.topic_id)
                setTopicId((prev) => {
                    console.log("Updated successfully")
                    return value
                });
            console.log({ topicId })
        }
    }

    const regenarateQuestion = async () => {
        if (interview_id) {
            const next_question = await apis.generateQuestion(interview_id);

            fetchMessages(interview_id)
        }
    }

    const submitUserAnswer = async () => {
        if (!interview_id) {
            dispatch(addSnackbar({ id: nanoid(), message: "Interview Id not found", type: "error" }))
            return
        };

        if (topicId) {
            const answer_submitted = await apis.submitMyAnswer(interview_id, { answer: userAnswer, topic_id: topicId });
        }

        setResponseLoading(true)

        // const next_question = await apis.generateQuestion(interview_id);

        const chat_res = await apis.getInterviewChat(interview_id);

        if (chat_res.data?.success) {
            const filterArr: MessageType[] = chat_res.data.chat.map((item) => ({ id: parseInt(item.id), sender: item.responded_by, text: item.response }))
            setMessages(filterArr)
            setResponseLoading(false)
            setUserAnswer("")
            console.log(chat_res.data)
            setTopicId(Number(chat_res.data.chat.at(-1)?.topic_id));
            console.log({ topicId })
        }
    }

    return (
        <>
            <div className="h-full bg-white rounded-md p-3 grid grid-rows-[auto_auto_1fr_auto]">
                {/* <InterviewHeader interviewInfo={interviewInfo} /> */}
                <ContentHeader name="Interview" CustomComponent={<InterviewInformation interviewInfo={interviewInfo} />} />
                <div className="py-3">
                    {/* <TopicSelector interviewInfo={interviewInfo}/> */}
                </div>
                {
                    chatLoading ?
                        <div className="flex justify-center items-center h-full">
                            <BallTriangle
                                height={100}
                                width={100}
                                radius={5}
                                color="#51a2ff"
                                ariaLabel="ball-triangle-loading"
                                wrapperStyle={{}
                                }
                                wrapperClass=""
                                visible={true}
                            />
                        </div> :
                        <ChatWindow messages={messages} responseLoading={responseLoading} regenarateQuestion={regenarateQuestion} socketMessages={socketMessage}/>

                }
                {
                    interviewInfo?.status != 'completed' &&
                    <ChatInput userAnswer={userAnswer} setUserAnswer={setUserAnswer} submitUserAnswer={submitUserAnswer} />
                }
            </div>
        </>)
}
