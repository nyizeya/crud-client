import { instructorReducer } from "./instructors/state/instructors.reducer";
import { InstructorState } from "./instructors/state/instructors.state";

export interface AppState {
    instructors: InstructorState
}

export const appReducer = {
    instructors: instructorReducer
}