import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import type { LoginCredentialErrorType, LoginCredentialType } from "../../types/auth.types";
import { api } from "../../services/api";
import {success, failed} from '../../redux/state/loginSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Login() {
    const [data, setData] = useState<LoginCredentialType>({ user_email: "", user_pass: "" });
    const [error, setError] = useState<LoginCredentialErrorType>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const PasswordIcon = showPassword ? FaRegEyeSlash : FaRegEye;

    const validateFormData = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // console.log(data.user_email)
        setError((prevState) => ({ ...prevState, user_email: "" }))


        if (!emailRegex.test(data.user_email)) {
            setError((prevState) => ({ ...prevState, user_email: "Please check entered email" }))
        }

        if (data.user_email == "") {
            setError((prevState) => ({ ...prevState, user_email: "" }))
        }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    }
    useEffect(() =>{
        validateFormData()
    }, [data]);
    // useEffect(()=>{
    //     api.get('/test-cookie')
    //     .then(res => {
    //         console.log("Response: ", res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },[])
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const SubmitForm = () => {
        api.post('/auth/login', data)
        .then(res =>{
            console.log(res)
            if(res.data.login === 'success'){
                dispatch(success());
                navigate("/dashboard");
            }else{
                dispatch(failed())
            }
        })
        .catch(err => {
            console.log(err)
        });
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
                <span className="text-red-500 px-3 text-[12px]">{error?.login_error}</span>
                <div className="text-center">
                    <button className="bg-blue-400 w-full rounded-sm text-white py-1" onClick={() => {SubmitForm()}}>Login</button>
                </div>
            </div>
        </div>
    )
}
