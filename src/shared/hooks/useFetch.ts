import { useEffect, useMemo, useState } from "react";

import axiosInstance from "../traffic/axios"

export function useFetch<T>(url: string, params?: Object) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get<T>(url, { params });
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
    }, [url])
    return { isLoading, data, error };
}