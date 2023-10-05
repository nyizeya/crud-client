export interface Instructor {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: Role
}

export enum Role {
    ADMIN, INSTRUCTOR
}
  