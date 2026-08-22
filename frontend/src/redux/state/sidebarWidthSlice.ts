import { createSlice } from "@reduxjs/toolkit";

type sidebarWidthType = {
    isOpen: boolean,
    isExpand: boolean
}

const initialState: sidebarWidthType = {
    isOpen: true,
    isExpand: true,
}

export const sidebar = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = !state.isOpen
        },
        expandSidebar: (state) => {
            state.isExpand = !state.isExpand
        }
    }
});


export const { openSidebar, expandSidebar } = sidebar.actions
export default sidebar.reducer