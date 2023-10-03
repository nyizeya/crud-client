import { Action, createReducer, on } from "@ngrx/store";
import { InstructorState, instructorInitialState } from "./instructors.state";
import { getAllInstructorFail, getAllInstructorStart, getAllInstructorSuccess, getInstructorByIdAction } from "./instructors.actions";
import { Response } from "src/app/models/dto/response.model";
import { Instructor } from "src/app/models/dto/instructor.model";

const _instructorReducer = createReducer(
    instructorInitialState,
    on(getAllInstructorStart, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(getAllInstructorSuccess, (state: InstructorState, action: Response<Instructor>) => {
        return {
            ...state,
            data: action.data,
            isLoading: false
        }
    }),
    on(getAllInstructorFail, (state: InstructorState, action: {message: string | null}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    }),
    on(getInstructorByIdAction, (state: InstructorState, action: {id: number}) => {
        let instructor = state.data.filter(i => i.id === action.id)[0];

        if (instructor) {
            return {
                ...state,
                data: [instructor]
            }
        }

        return {
            ...state,
            error: `Instructor with id ${action.id} is not found.`
        }
    })
)

export function instructorReducer(state: InstructorState | undefined, action: Action) {
    return _instructorReducer(state, action)
}