import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/dto/course.model";
import { Response } from "src/app/models/dto/response.model";

export type CourseRequest = {
    name?: string;
    level?: string;
    pageNumber?: number;
    size?: number;
}

// All Courses Operations
export const getAllCourseStart = createAction('[Course Page] get all course start', props<CourseRequest>());
export const getAllCourseSuccess = createAction('[Course Page] get all course sucess', props<Response<Course>>());
export const getAllCourseFail = createAction('[Course Page] get all course fail', props<{message: string | null}>());

export const getCoursesByInstructor = createAction('[Course|Instructor Page] get instructor\'s courses', props<{id: number}>());

// Single Course Operations
export const getSingleCourseStart = createAction('[Course Page] get course by id', props<{id: number}>());
export const getSingleCourseSuccess = createAction('[Course Page] get course by id success', props<Response<Course>>());
export const getSingleCourseFail = createAction('[Course Page] get course by id fail', props<{message: string}>());