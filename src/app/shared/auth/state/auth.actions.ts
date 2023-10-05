import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/models/dto/response.model";
import { Token } from "src/app/models/dto/token.model";
import { LoginRequest } from "src/app/models/reqeust_dto/auth/login.request";

export const loginActionStart = createAction('[Auth Page] login action start', props<LoginRequest>());
export const loginActionSuccess = createAction('[Auth Page] login action success', props<Response<Token>>());
export const loginActionFail = createAction('[Auth Page] login action fail', props<{message: string}>());

export const logoutActionStart = createAction('[Auth Page] log out action start');
export const logoutActionSuccess = createAction('[Auth Page] log out action success');
export const logoutActionFail = createAction('[Auth Page] log out action fail');

export const checkTokenActionStart = createAction('[Auth Page] check token validity start');
export const checkTokenActionSuccess = createAction('[Auth Page] check token validity success', props<{val: boolean}>());
export const checkTokenActionFail = createAction('[Auth Page] check token validity fail', props<{message: string}>());
