import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const authSelector = createFeatureSelector<AuthState>('login');

export const getToken = createSelector(authSelector, (state: AuthState) => state.data);
export const getLoading = createSelector(authSelector, (state: AuthState) => state.isLoading);
export const getError = createSelector(authSelector, (state: AuthState) => state.error);
export const getSuccess = createSelector(authSelector, (state: AuthState) => state.success);
export const getAuthenticated = createSelector(authSelector, (state: AuthState) => state.isAuthenticated);
export const getCurrentUser = createSelector(authSelector, (state: AuthState) => state.currentUser);