import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChat: null,
    loading: false,
    error: false,
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chatStart: (state) => {
            state.loading = true;
        },
        chatSuccess: (state, action) => {
            state.currentChat = action.payload;
        },
        chatFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        chatLogout: (state) => {
            state.currentChat = null;
            state.loading = false;
            state.error = false
        },
    },
});

export const { chatStart, chatSuccess, chatFailure, chatLogout } = chatSlice.actions;

export default chatSlice.reducer;