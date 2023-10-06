import { Action, createReducer, on } from "@ngrx/store";
import { CourseState, courseInitialState } from "./course.state";
import * as courseActions from "./course.actions";
import { Course } from "src/app/models/dto/course.model";
import { Response } from "src/app/models/dto/response.model";
import { CourseUpdateRequest } from "src/app/models/reqeust_dto/course/course.update.model";
import { CourseRegistrationRequest } from "src/app/models/reqeust_dto/course/course.registration.model";

const _courseReducer = createReducer(
    courseInitialState,
    on(courseActions.getAllCourseStart, (state: CourseState, action: courseActions.CourseRequest) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(courseActions.getAllCourseSuccess, (state: CourseState, action: Response<Course>) => {
        return {
            ...state,
            data: action.data!,
            isLoading: false
        }
    }),
    on(courseActions.getAllCourseFail, (state: CourseState, action: {message: string | null}) => {
        return {
            ...state,
            error: action.message,
            isLoading: false
        }
    }),
    on(courseActions.getSingleCourseStart, (state: CourseState, action: {id: number}) => {
        return {
            ...state,
            isLoading: true
        }

    }),
    on(courseActions.getSingleCourseSuccess, (state: CourseState, action: Response<Course>) => {
        return {
            ...state,
            data: action.data!,
            isLoading: false
        }
    }),
    on(courseActions.getSingleCourseFail, (state: CourseState, action: {message: string}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    }),
    on(courseActions.getCoursesByInstructorStart, (state: CourseState, action: {id: number}) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(courseActions.getCoursesByInstructorSuccess, (state: CourseState, action: Response<Course>) => {
        return {
            ...state,
            data: action.data!,
            isLoading: false
        }
    }),
    on(courseActions.getCoursesByInstructorFail, (state: CourseState, action: {message: string}) => {
        return {
            ...state,
            error: action.message,
            isLoading: false
        }
    }),
    on(courseActions.courseUpdateStart, (state: CourseState, action: CourseUpdateRequest) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(courseActions.courseUpdateSuccess, (state: CourseState, action: Response<Course>) => {
        return {
            ...state,
            isLoading: false,
            data: action.data!
        }
    }),
    on(courseActions.courseUpdateFail, (state: CourseState, action: {message: string}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    }),
    on(courseActions.courseCreationStart, (state: CourseState, action: CourseRegistrationRequest) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(courseActions.courseCreationSuccess, (state: CourseState, action: Response<Course>) => {
        return {
            ...state,
            isLoading: false,
            data: action.data!
        }
    }),
    on(courseActions.courseCreationFail, (state: CourseState, action: {message: string}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    })
)

export function courseReducer(state: CourseState | undefined, action: Action) {
    return _courseReducer(state, action);
}