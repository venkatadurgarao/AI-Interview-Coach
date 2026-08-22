import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa"
import { ContentHeader } from "../../components/ContentHeader"
import { useState, type ChangeEvent } from "react";
import type { InterviewSetupType } from "../../types/interview.types";
import { useDispatch } from "react-redux";
import { addSnackbar } from "../../redux/state/snackbarSlice";
import { nanoid } from "@reduxjs/toolkit";
import { apis } from "../../api/api";

const initialState = {
    role: '',
    technology: '',
    experience: '',
    difficulty: '',
    duration: '',
    question_type: '',
}

export const InterviewSetup = () => {
    const role = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "React Developer", "Node.js Developer", "Python Developer", "Java Developer", "PHP Laravel Developer", "Angular Developer", "Vue.js Developer", "DevOps Engineer", "Cloud Engineer", "Data Engineer", "Data Analyst", "Machine Learning Engineer", "AI Engineer", "QA Engineer", "Automation Test Engineer", "Manual Test Engineer", "Mobile App Developer", "Android Developer", "iOS Developer", "Flutter Developer", "Cyber Security Engineer", "Site Reliability Engineer (SRE)", "Software Engineer", "Senior Software Engineer", "Technical Lead",];
    const technology = ["React", "Node.js", "Express.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Redux", "Next.js", "Angular", "Vue.js", "Laravel", "PHP", "Python", "FastAPI", "Django", "Java", "Spring Boot", "C#", ".NET", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "Azure", "Git", "REST API", "GraphQL", "Microservices", "System Design", "Data Structures", "Algorithms",]
    const experience = ["Fresher", "0-1 Years", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6-8 Years", "8-10 Years", "10+ Years"];
    const difficulty = ["Beginner", "Intermediate", "Advanced", "Expert", "Auto"];
    const duration = ["10 Minutes", "15 Minutes", "20 Minutes", "30 Minutes", "45 Minutes", "60 Minutes", "90 Minutes"];
    const question_type = ["Theory", "Coding", "Debugging", "Scenario Based", "Behavioral", "System Design", "Mixed"];

    const [formData, setFormData] = useState<InterviewSetupType>(initialState);
    const [formError, setFormError] = useState<InterviewSetupType>(initialState);
    const dispatch = useDispatch();


    const updateFormData = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));

        // Clear the error for the field when the user changes it
        setFormError((prev) => ({
            ...prev,
            [id]: "",
        }));
    };

    const validateForm = () => {
        const errors: InterviewSetupType = {
            role: "",
            technology: "",
            experience: "",
            difficulty: "",
            duration: "",
            question_type: "",
        };

        if (!formData.role) {
            errors.role = "Please select a role";
        }

        if (!formData.technology) {
            errors.technology = "Please select a technology";
        }

        if (!formData.experience) {
            errors.experience = "Please select experience";
        }

        if (!formData.difficulty) {
            errors.difficulty = "Please select difficulty";
        }

        if (!formData.duration) {
            errors.duration = "Please select duration";
        }

        if (!formData.question_type) {
            errors.question_type = "Please select question type";
        }

        setFormError(errors);

        return !Object.values(errors).some(Boolean);
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            dispatch(
                addSnackbar({
                    id: nanoid(),
                    message: "Please fill all required fields",
                    type: "error",
                })
            );
            return;
        }

        console.log(formData);
        
        // Call your API here
        const res = await apis.startInterview(formData);
        // const result = await apis.generateQuestion({ interview_id: newInterviewId });
        // navigate(`/interview_start/${newInterviewId}`);
    };


    return (
        <div className="h-full bg-white rounded-md p-3 grid">
            <ContentHeader name={"Interview Setup"} />
            <div className="w-full p-3 overflow-y-scroll scrollbar-none">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="role" >Role</label>
                        <select id="role" className="border p-1 w-[50%] rounded-md" onChange={updateFormData}>
                            <option value="">Select</option>
                            {role.map((item, i) => <option key={i} value={item}>{item}</option>)}
                        </select>
                        {formError.role && (
                            <p className="text-red-500 text-xs">{formError.role}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="technology" >Technology</label>
                        <select id="technology" className="border p-1 w-[50%] rounded-md" onChange={updateFormData}>
                            <option value="">Select</option>
                            {technology.map((item, i) => <option key={i} value={item}>{item}</option>)}
                        </select>
                        {formError.technology && (
                            <p className="text-red-500 text-xs">{formError.technology}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="experience" >Experience</label>
                        <select id="experience" className="border p-1 w-[50%] rounded-md" onChange={updateFormData}>
                            <option value="">Select</option>
                            {experience.map((item, i) => <option key={i} value={item}>{item}</option>)}
                        </select>
                        {formError.experience && (
                            <p className="text-red-500 text-xs">{formError.experience}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="duration" >Duration</label>
                        <select id="duration" className="border p-1 w-[50%] rounded-md" onChange={updateFormData}>
                            <option value="">Select</option>
                            {duration.map((item, i) => <option key={i} value={item}>{item}</option>)}

                        </select>
                        {formError.duration && (
                            <p className="text-red-500 text-xs">{formError.duration}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="question_type" >Question Type</label>
                        <select id="question_type" className="border p-1 w-[50%] rounded-md" onChange={updateFormData}>
                            <option value="">Select</option>
                            {question_type.map((item, i) => <option key={i} value={item}>{item}</option>)}
                        </select>
                        {formError.question_type && (
                            <p className="text-red-500 text-xs">{formError.question_type}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="difficulty" >Difficulty</label>
                        <select id="difficulty" className="border p-1 w-[50%] rounded-md" onChange={updateFormData}>
                            <option value="">Select</option>
                            {difficulty.map((item, i) => <option key={i} value={item}>{item}</option>)}
                        </select>
                        {formError.difficulty && (
                            <p className="text-red-500 text-xs">{formError.difficulty}</p>
                        )}
                    </div>
                    <div className="flex gap-1 justify-center">
                        <button className="btn-dark" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
