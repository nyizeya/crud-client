import { createAction, props } from "@ngrx/store";
import { Instructor } from "src/app/models/dto/instructor.model";
import { Response } from "src/app/models/dto/response.model";
import { InstructorRegistrationRequest } from "src/app/models/reqeust_dto/instructor/instructor.registration.model";
import { InstructorUpdateRequest } from "src/app/models/reqeust_dto/instructor/instructor.update.model";

export const getAllInstructorStart = createAction('[Instructor State] GET ALL INSTRUCTOR START');
export const getAllInstructorSuccess = createAction('[Instructor State] GET ALL INSTRUCTOR SUCCESS', props<Response<Instructor>>());
export const getAllInstructorFail = createAction('[Instructor State] GET ALL INSTRUCTOR FAIL', props<{message: string}>());

export const getInstructorByIdStart = createAction('[Instructor State] GET INSTRUCTOR BY ID START', props<{id: number}>());
export const getInstructorByIdSuccess = createAction('[Instructor State] GET INSTRUCTOR BY ID SUCCESS', props<Response<Instructor>>());
export const getInstructorByIdFail = createAction('[Instructor State] GET INSTRUCTOR BY ID', props<{message: string}>());


export const addInstructorAction = createAction('[Instructor State] CREATE INSTRUCTOR', props<{instructor: InstructorRegistrationRequest}>());
export const getInstructorByEmailAction = createAction('[Instructor State] GET INSTRUCTOR BY EMAIL', props<{email: string}>());
export const updateInstructorAction = createAction('[Instructor State] UPDATE INSTRUCTOR', props<{id: number, instructor: InstructorUpdateRequest}>());
export const deleteInstructorAction = createAction('[Instructor State] DELETE INSTRUCTOR', props<{id: number}>());

export const editInstructorActionStart = createAction('[Instructor State] EDIT INSTRUCTOR START', props<InstructorUpdateRequest>());
export const editInstructorActionSuccess = createAction('[Instructor State] EDIT INSTRUCTOR SUCCESS', props<Response<Instructor>>());
export const editInstructorActionFail = createAction('[Instructor State] EDIT INSTRUCTOR FAIL', props<{message: string}>());
