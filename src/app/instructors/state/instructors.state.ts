import { Instructor } from "src/app/models/dto/instructor.model";

export interface InstructorState {
    instructors: Instructor[];
}

export const initialState: InstructorState = {
    instructors: [
        {
            id: 1,
            name: 'Nyi Zeya',
            email: 'nyizeya@gmail.com',
            phone: '09787820722'
        }
    ]
}