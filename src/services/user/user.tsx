import api from "@/services/api";
interface User {
    id: number,
    name: string,
    email: string,
    type: string
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

export const saveUser = async (data: Object) => {
    try {
        const response = await api.post<User | null>("user/", data);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const getDependents = async (): Promise<ApiResponse<User[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<User[]>>("/user/dependent/");
        return response.data;
    } catch (error) {
        return undefined;
    }
}

export const registerUser = async (data: Object) => {
    try {
        const response = await api.post<User | null>("user/store", data);
        return response.data;
    } catch (error) {
        return [];
    }
}