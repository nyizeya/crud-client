import { courseReducer } from "../courses/state/course.reducer";
import { instructorReducer } from "../instructors/state/instructors.reducer";
import { loginReducer } from "../shared/auth/state/auth.reducer";

export const AppState = {
    'course': courseReducer,
    'instructor': instructorReducer,
    'login': loginReducer
}