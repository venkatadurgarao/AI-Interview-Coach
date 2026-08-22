import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import type { LoginCredentialErrorType, LoginCredentialType } from "../../types/auth.types";
import { api, apis } from "../../api/api";
import { success, failed } from '../../redux/state/loginSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addSnackbar } from "../../redux/state/snackbarSlice";
import { nanoid } from "@reduxjs/toolkit";

import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export default function Login() {
    const [data, setData] = useState<LoginCredentialType>({ user_email: "", user_pass: "" });
    const [error, setError] = useState<LoginCredentialErrorType>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const PasswordIcon = showPassword ? FaRegEyeSlash : FaRegEye;

    const validateFormData = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError((prevState) => ({ ...prevState, user_email: "" }));

        if (!emailRegex.test(data.user_email)) {
            setError((prevState) => ({ ...prevState, user_email: "Please check entered email" }))
            throw Error("Please check entered email")
        }

        if (data.user_email == "") {
            setError((prevState) => ({ ...prevState, user_email: "" }))
            throw Error("Please enter email")
        }
        // return true;
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    }
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const SubmitForm = async () => {
        try {
            validateFormData()
            setLoading(true);
            const response = await apis.login(data);
            console.log(response);
            if (response.data.login === 'success') {
                dispatch(success());
                navigate("/dashboard");
            } else {
                // dispatch(addSnackbar({ id: nanoid(), message: "Invalid Credentials", type: "error", duration: 5000 }))
                dispatch(failed());
                setLoading(false);
            }
        } catch (err) {
            console.log("Login Error : ", err);
            if (axios.isAxiosError(err)) {
                console.log(err.response?.status);
                setError((prev) => ({ ...prev, login_error: "username or password are incorrect" }))
            } else {
                setError((prev) => ({ ...prev, login_error: "something went wrong please try again later" }))
            }
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className='p-3 bg-white rounded-lg w-[300px] flex flex-col gap-3'>
                <div className="text-center text-lg">
                    <h1>Login</h1>
                </div>
                <div className="flex flex-col">
                    <input
                        type="text"
                        name=""
                        id=""
                        value={data.user_email}
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                setData(prevState => ({ ...prevState, user_email: e.target.value }))
                            }
                        }
                        placeholder="Enter Username"
                        className="border-1 border-gray-200 rounded-sm w-full outline-none px-2 py-1" />
                    <span className="text-red-500 px-3 text-[12px]">{error?.user_email}</span>
                </div>
                <div className="flex flex-col">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name=""
                            id=""
                            value={data.user_pass}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) => {
                                    setData((prevState) => ({ ...prevState, user_pass: e.target.value }));
                                }
                            }
                            placeholder="Enter Password"
                            className="border-1 border-gray-200 rounded-sm w-full outline-none px-2 py-1" />
                        <span className="absolute top-0 right-0 h-full flex items-center pr-2" >
                            <PasswordIcon className="hover:text-blue-400 hover:cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} />
                        </span>
                    </div>

                    <span className="text-red-500 px-3 text-[12px]">{error?.user_pass}</span>
                </div>
                {error?.login_error && <span className="text-red-500 px-3 text-[12px]">{error?.login_error}</span>}
                <u className="text-xs text-blue-400"><a href="/register">Don't have account!</a></u>
                <div className="text-center flex justify-center">
                    <button className="bg-blue-400 w-full rounded-sm text-white py-1" onClick={() => { SubmitForm() }} hidden={loading}>
                        Login
                    </button>
                    <TailSpin
                        visible={loading}
                        height="30"
                        width="30"
                        color="#51a2ff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        strokeWidth={5}
                        wrapperStyle={{}}
                        wrapperClass=""
                    />

                </div>
            </div>
        </div>
    )
}
