const VITE_API_URL = import.meta.env.VITE_API_URL;

export interface ApiRequestError {
    success: false;
    message: string;
}

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit,
): Promise<T> => {
    const url = `${VITE_API_URL}${endpoint}`;
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
};
