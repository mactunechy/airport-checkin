import { useState } from 'react';

export function useApi<T>(apiFunc: Function) {
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<T | any>();
    const [loading, setLoading] = useState(false);

    const request = async (...args: any[]) => {
        setLoading(true);
        setError(false);
        setData(null);
        const response = await apiFunc(...args);
        setLoading(false);
        console.log('response', response);
        if (!response.ok) {
            setError(response.data.message);
            console.log(response.data.message);

            return response;
        }
        setError(false);
        setData(response.data);
        return response;
    };

    return { error, loading, data, request };
}
