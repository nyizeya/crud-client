import { courseReducer } from "../courses/state/course.reducer";
import { instructorReducer } from "../instructors/state/instructors.reducer";

export const AppState = {
    'course': courseReducer,
    'instructor': instructorReducer
}