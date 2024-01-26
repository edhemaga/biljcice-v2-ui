export interface IBaseResposne<T> {
    data: T[],
    count: number;
}


export interface IStandardResponse<T> {
    isLoading: boolean;
    data: T | undefined;
    error: string | boolean | undefined;
};