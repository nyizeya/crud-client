import { Action, createReducer, on } from "@ngrx/store";
import { InstructorState, instructorInitialState } from "./instructors.state";
import * as instructorActions from "./instructors.actions";
import { Response } from "src/app/models/dto/response.model";
import { Instructor } from "src/app/models/dto/instructor.model";
import {InstructorUpdateRequest} from "../../models/reqeust_dto/instructor/instructor.update.model";

const _instructorReducer = createReducer(
    instructorInitialState,
    on(instructorActions.getAllInstructorStart, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(instructorActions.getAllInstructorSuccess, (state: InstructorState, action: Response<Instructor>) => {
        return {
            ...state,
            data: action.data!,
            isLoading: false
        }
    }),
    on(instructorActions.getAllInstructorFail, (state: InstructorState, action: {message: string | null}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    }),
    on(instructorActions.getInstructorByIdStart, (state: InstructorState, action: {id: number}) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(instructorActions.getInstructorByIdSuccess, (state: InstructorState, action: Response<Instructor>) => {
        return {
            ...state,
            isLoading: false,
            data: action.data!
        }
    }),
    on(instructorActions.getInstructorByIdFail, (state: InstructorState, action: {message: string}) => {
        return {
            ...state,
            isLoading: false,
            error: action.message
        }
    }),
    on(instructorActions.editInstructorStart, (state: InstructorState, action: InstructorUpdateRequest) => {
      return {
        ...state,
        isLoading: true
      }
    }),
    on(instructorActions.editInstructorSuccess, (state: InstructorState, action: Response<Instructor>) => {
      return {
        ...state,
        isLoading: false
      }
    }),
    on(instructorActions.editInstructorFail, (state: InstructorState, action: {message: string}) => {
      return {
        ...state,
        isLoading: false,
        error: action.message
      }
    })
)

export function instructorReducer(state: InstructorState | undefined, action: Action) {
    return _instructorReducer(state, action)
}
