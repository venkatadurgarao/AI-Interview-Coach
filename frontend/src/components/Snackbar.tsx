import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { snackbarType } from "../types/redux.types";
import { removeSnackbar } from "../redux/state/snackbarSlice";


export const Snackbar = ({ id, message, type, duration = 5000 }: snackbarType) => {
    const [visibility, setVisibility] = useState<boolean>(true);
    const dispatch = useDispatch();
    // const selector = useSelector((state: RootState) => state.snackbar.snackbars)
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibility(false);
            console.log(id);
            // console.log(typeof id);
            // dispatch(removeSnackbar({ id }));
            const removeTimer = setTimeout(() => {
                dispatch(removeSnackbar({ id }));
            }, 300); // Same as duration-300

            return () => clearTimeout(removeTimer);

            // console.log({ duration })
        }, duration);
        return () => clearTimeout(timer);
    }, []);
    let bg = "";
    switch (type) {
        case "info":
            bg = "bg-blue-500";
            break;
        case "success":
            bg = "bg-green-500";
            break;
        case "warning":
            bg = "bg-yellow-500";
            break;
        case "error":
            bg = "bg-red-500";
            break;
        default:
            bg = "bg-gray-500 border-1"
            break;
    }
    return (
        <div className={`${bg} text-white p-2 flex justify-between items-center rounded-md transition-all duration-500 ease-out-in
        transition-all duration-300 ease-in-out
            ${visibility
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }
         `} >
            <span>{message}</span>
            <FaXmark />
        </div>
    )
}
