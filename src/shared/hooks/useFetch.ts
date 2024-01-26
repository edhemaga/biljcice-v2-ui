import { useEffect, useState } from "react";

import axiosInstance from "../traffic/axios";

import { IPagination } from "../models/Base/IPagination";

export function useFetch<T>(url: string, pagination: IPagination | null, params?: Object) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get<T>(url, {
                    params:
                    {
                        ...pagination, ...params
                    }
                });
                if (response.status !== 200) throw new Error(response.statusText);
                setData(response.data);
            }
            catch (error) {
                setError(JSON.stringify(error));
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();
        return () => {
            setIsLoading(true);
            setData(undefined);
            setError("");
        };
    }, [url, pagination?.page, pagination?.size])
    return { isLoading, data, error };
}