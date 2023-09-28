import { Action, createReducer, on } from "@ngrx/store";
import { InstructorState, initialState } from "./instructors.state";
import { getAllInstructorAction } from "./instructors.actions";

const _instructorReducer = createReducer(
    initialState,
    on(getAllInstructorAction, (state) => {
        return {
            ...state
        }
    })
)

export function instructorReducer(state: InstructorState | undefined, action: Action) {
    return _instructorReducer(state, action)
}