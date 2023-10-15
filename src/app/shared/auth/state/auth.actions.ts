import { createAction, props } from "@ngrx/store";
import { Instructor } from "src/app/models/dto/instructor.model";
import { Response } from "src/app/models/dto/response.model";
import { Token } from "src/app/models/dto/token.model";
import { LoginRequest } from "src/app/models/reqeust_dto/auth/login.request";
import { InstructorRegistrationRequest } from "src/app/models/reqeust_dto/instructor/instructor.registration.model";
import { InstructorUpdateRequest } from "src/app/models/reqeust_dto/instructor/instructor.update.model";

// login actions
export const loginActionStart = createAction('[Auth Page] login action start', props<LoginRequest>());
export const loginActionSuccess = createAction('[Auth Page] login action success', props<Response<Token>>());
export const loginActionFail = createAction('[Auth Page] login action fail', props<{message: string}>());

// logout actions
export const logoutActionStart = createAction('[Auth Page] log out action start');
export const logoutActionSuccess = createAction('[Auth Page] log out action success');
export const logoutActionFail = createAction('[Auth Page] log out action fail');

// check if authenticated
export const checkTokenActionStart = createAction('[Auth Page] check token validity start');
export const checkTokenActionSuccess = createAction('[Auth Page] check token validity success', props<{val: boolean}>());
export const checkTokenActionFail = createAction('[Auth Page] check token validity fail', props<{message: string}>());

// register actions
export const registerActionStart = createAction('[Auth Page] login action start', props<InstructorRegistrationRequest>());
export const registerActionSuccess = createAction('[Auth Page] login action success', props<Response<Instructor>>());
export const registerActionFail = createAction('[Auth Page] login action fail', props<{message: string}>());

// get current user
export const getCurrentUserStart = createAction('[Auth Page] get current user start', props<{token: string}>());
export const getCurrrentUserSuccess = createAction('[Auth Page] get current user success', props<{user: Instructor | null}>());
export const getCurrrentUserFail = createAction('[Auth Page] get current user fail', props<{message: string}>());