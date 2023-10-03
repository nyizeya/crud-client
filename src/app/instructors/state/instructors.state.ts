import { Instructor } from "src/app/models/dto/instructor.model";

export interface InstructorState {
    isLoading: boolean;
    data: Instructor[];
    error: string | null;
}

export const instructorInitialState: InstructorState = {
    isLoading: false,
    data: [],
    error: null
}