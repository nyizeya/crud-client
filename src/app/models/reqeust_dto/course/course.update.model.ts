export interface CourseUpdateRequest {
    id: number;
    name?: string;
    description?: string;
    startDate?: string;
    level?: Level;
    instructorId?: string;
}

export enum Level {
    Basic, Intermediate, Advanced
}