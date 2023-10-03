import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InstructorState } from "./instructors.state";

const instructorSelector = createFeatureSelector<InstructorState>('instructor');

export const getInstructorLoading = createSelector(instructorSelector, (state: InstructorState) => state.isLoading);
export const getInstructorError = createSelector(instructorSelector, (state: InstructorState) => state.error);
export const getInstructor = createSelector(instructorSelector, (state: InstructorState) => state.data);