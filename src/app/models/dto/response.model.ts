export interface Response<T> {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: T[] | null;
    error: string | null;
}