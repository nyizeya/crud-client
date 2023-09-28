export interface Response<T> {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: T[];
    error: string | null;
}