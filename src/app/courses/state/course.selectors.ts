import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.state";

const courseSelector = createFeatureSelector<CourseState>('course')

export const getCourseLoading = createSelector(courseSelector, (state: CourseState) => state.isLoading);
export const getCourseError = createSelector(courseSelector, (state: CourseState) => state.error);
export const getCourse = createSelector(courseSelector, (state: CourseState) => state.data);
// export const getCourseDraws = createSelector(courseSelector, (state: CourseState) => state.draw);
// export const getCourseRecordsTotal = createSelector(courseSelector, (state: CourseState) => state.recordsTotal);
// export const getCourseRecordsFiltered = createSelector(courseSelector, (state: CourseState) => state.recordsFiltered);
