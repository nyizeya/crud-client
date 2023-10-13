import { Response } from "src/app/models/dto/response.model";
import { Token } from "src/app/models/dto/token.model";

export interface AuthState {
    isLoading: boolean;
    data: Token[];
    error: string | null;
    success: boolean;
    isAuthenticated: boolean;
    message: string | null;
}

export const authInitialState: AuthState = {
    isLoading: false,
    data: [],
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    message: null
}