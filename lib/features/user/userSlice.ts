import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    role: string | null;
    token: string  | null;
    id: string  | null; 
    error : string  | null;
}

const initialState: User = {
    role: null,
    token: null,
    id: null,
    error: null
};

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setError(state, action){
            state.error = action.payload.error
        }
    },
});

export const { setCurrentUser, setError } = userSlice.actions;
export default userSlice.reducer;
