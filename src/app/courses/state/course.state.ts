import { Course } from "src/app/models/dto/course.model";

export interface CourseState {
    isLoading: boolean;
    data: Course[];
    error: string | null;
    message: string | null;
}

export const courseInitialState:CourseState  = {
    isLoading: false,
    data: [],
    error: null,
    message: null
}
