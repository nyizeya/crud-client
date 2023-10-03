export interface CourseRegistrationRequest {
    id?: number;
    name: string;
    description: string;
    startDate: string;
    level: string;
    instructorId: number;
}