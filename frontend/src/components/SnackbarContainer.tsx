import { FaXmark } from "react-icons/fa6";
import { Snackbar } from "./Snackbar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { snackbarType } from "../types/redux.types";


export const SnackbarContainer = () => {
    const dispatch = useDispatch();
    const snackbars: snackbarType[] = useSelector(
        (state: RootState) => state.snackbar.snackbars
    )
    return (
        <div className='fixed bottom-0 right-0 z-50 w-[300px] p-2 flex flex-col gap-2'>
            {
                snackbars.length > 0 && snackbars.map(item => 
                    <Snackbar key={item.id} id={item.id} message={item.message} type={item.type} duration={item.duration} />
                )
            }
            {/* <Snackbar />
            <Snackbar />
            <Snackbar />
            <Snackbar />
            <Snackbar />
            <Snackbar />
            <Snackbar /> */}
        </div>
    )
}
