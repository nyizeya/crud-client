import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/dto/course.model";
import { Response } from "src/app/models/dto/response.model";
import { CourseUpdateRequest } from "src/app/models/reqeust_dto/course/course.update.model";

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

export const getCoursesByInstructorStart = createAction('[Course|Instructor Page] get instructor\'s courses start', props<{id: number}>());
export const getCoursesByInstructorSuccess = createAction('[Course|Instructor Page] get instructor\'s courses success', props<Response<Course>>());
export const getCoursesByInstructorFail = createAction('[Course|Instructor Page] get instructor\'s courses stop', props<{message: string}>());


// Single Course Operations
export const getSingleCourseStart = createAction('[Course Page] get course by id', props<{id: number}>());
export const getSingleCourseSuccess = createAction('[Course Page] get course by id success', props<Response<Course>>());
export const getSingleCourseFail = createAction('[Course Page] get course by id fail', props<{message: string}>());

// Create And Update Course
export const courseUpdateStart = createAction('[Course Page] update course start', props<CourseUpdateRequest>());
export const courseUpdateSuccess = createAction('[Course Page] update course success', props<Response<Course>>());
export const courseUpdateFail = createAction('[Course Page] update course fail', props<{message: string}>());