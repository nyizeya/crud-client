import { LoginRequest } from "src/app/models/reqeust_dto/auth/login.request";
import { AuthState, authInitialState } from "./auth.state";
import { Action, createReducer, on } from "@ngrx/store";
import * as loginActions from "./auth.actions";
import { Response } from "src/app/models/dto/response.model";
import { Token } from "src/app/models/dto/token.model";
import {InstructorRegistrationRequest} from "../../../models/reqeust_dto/instructor/instructor.registration.model";
import {Instructor} from "../../../models/dto/instructor.model";

const _loginReducer = createReducer(
    authInitialState,
    on(loginActions.loginActionStart, (state: AuthState, action: LoginRequest) => {
        return {
            ...state,
            isLoading: true,
            success: false,
            error: null
        }
    }),
    on(loginActions.loginActionSuccess, (state: AuthState, action: Response<Token>) => {

        if (action.data) {
            localStorage.setItem('token', action.data[0].accessToken.token)
        }

        return {
            ...state,
            isLoading: false,
            data: action.data!,
            success: true,
            isAuthenticated: true,
            error: null
        }
    }),
    on(loginActions.loginActionFail, (state: AuthState, action: {message: string}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message,
            success: false,
            isAuthenticated: false
        }
    }),
    on(loginActions.logoutActionStart, (state: AuthState) => {
        console.log('inside logoutActionStart Reducer()');

        return {
            ...state,
            isLoading: true,
            isAuthenticated: false,
            error: null
        }
    }),
    on(loginActions.logoutActionSuccess, (state: AuthState) => {
        console.log('logout succeeded');

        return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            currentUser: null
        }
    }),
    on(loginActions.logoutActionFail, (state: AuthState) => {
        console.log('logout failed but handled');

        return {
            ...state,
            isAuthenticated: false,
            isLoading: false
        }
    }),
    on(loginActions.checkTokenActionStart, (state: AuthState) => {
        return {
            ...state,
            isLoading: true,
            error: null,
        }
    }),
    on(loginActions.checkTokenActionSuccess, (state: AuthState, action: {val: boolean}) => {
        return {
            ...state,
            isLoading: false,
            isAuthenticated: action.val,
            error: null
        }
    }),
    on(loginActions.checkTokenActionFail, (state: AuthState, action: {message: string}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    }),
    on(loginActions.registerActionStart, (state: AuthState, action: InstructorRegistrationRequest) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false
      }
    }),
    on(loginActions.registerActionSuccess, (state: AuthState, action: Response<Instructor>) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true
      }
    }),
    on(loginActions.registerActionFail, (state: AuthState, action: {message: string}) => {
      return {
        ...state,
        isLoading: false,
        error: action.message,
        success: false
      }
    }),
    on(loginActions.getCurrentUserStart, (state: AuthState, action: {token: string}) => {
        return {
            ...state,
            isLoading: true,
            error: null,
            success: false
        }
    }),
    on(loginActions.getCurrrentUserSuccess, (state: AuthState, action: {user: Instructor | null}) => {
        return {
            ...state,
            isLoading: true,
            error: null,
            success: true,
            currentUser: action.user
        }
    }),
    on(loginActions.getCurrrentUserFail, (state: AuthState, action: {message: string}) => {
        return {
            ...state,
            isLoading: true,
            error: action.message,
            success: true,
            currentUser: null
        }
    })
)

export function loginReducer(state: AuthState | undefined, action: Action) {
    return _loginReducer(state, action);
}
