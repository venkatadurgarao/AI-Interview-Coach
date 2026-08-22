import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { snackbarType } from "../../types/redux.types";

type SnackbarsTypes = {
    snackbars: snackbarType[]
}

const initialState:SnackbarsTypes = {
    snackbars: []
};

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: initialState,
    reducers: {
        addSnackbar: (state, action: PayloadAction<snackbarType>) => {
            console.log(action.payload)
            state.snackbars.push(action.payload)
        },
        removeSnackbar: (state, action: PayloadAction<{ id: string }>) => {
            state.snackbars = state.snackbars.filter(snackbar => snackbar.id !== action.payload.id);
        },
        clearSnackbar: (state) => {
            state.snackbars = [];
        },
    }

})

export const { addSnackbar, removeSnackbar, clearSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer