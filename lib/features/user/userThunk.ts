import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser , registerUser} from './userAPI';


interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    age: number;
    user_type: string
}


export const Login = createAsyncThunk(
    'auth/login',
    async (data: LoginData, thunkAPI) => {
        try {
            const res = await loginUser(data);
            return res; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message); 
        }
    }
);


export const Register = createAsyncThunk(
    'auth/login',
    async (data: RegisterData, thunkAPI) => {
        try {
            const res = await registerUser(data);
            return res; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message); 
        }
    }
);
