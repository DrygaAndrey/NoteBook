import { useState, useCallback} from "react"

export const useHttp = () => {
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'При отправке запроса на сервак произошел мистейк');
            }

            return data;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, []);
    const clearError = useCallback(() => setError(null), []);
    return { request, error, clearError }
}