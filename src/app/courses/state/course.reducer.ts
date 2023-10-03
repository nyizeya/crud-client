import { Action, createReducer, on } from "@ngrx/store";
import { CourseState, courseInitialState } from "./course.state";
import * as courseActions from "./course.actions";
import { Course } from "src/app/models/dto/course.model";
import { Response } from "src/app/models/dto/response.model";

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
            data: action.data,
            draw: action.draw,
            recordsTotal: action.recordsTotal,
            recordsFiltered: action.recordsFiltered,
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
        let course = state.data.filter(c => c.id === action.id)[0];

        if (course) {
            return {
                ...state,
                data: [course]
            }
        }

        return {
            ...state,
            error: 'Cannot find course with id ' + action.id
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
            data: action.data,
            isLoading: false
        }
    }),
    on(courseActions.getCoursesByInstructorFail, (state: CourseState, action: {message: string}) => {
        return {
            ...state,
            error: action.message,
            isLoading: false
        }
    })
)

export function courseReducer(state: CourseState | undefined, action: Action) {
    return _courseReducer(state, action);
}