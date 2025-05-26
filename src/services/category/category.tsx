import api from "@/services/api";

interface Category {
    id: number;
    name: string;
}

interface Categories {
    id:number;
    name: string;
    amount: number;
    category_id: number;
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

export const getCategories = async (): Promise<ApiResponse<Category[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<Category[]>>("admin/category");
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const saveCategory = async (data: Object) => {
    try {
        const response = await api.post<Category | null>("admin/category", data);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const showCategory = async (id: string) => {
    try {
        const response = await api.get(`admin/category/${id}`);
        return response.data.data;
    } catch (error) {
        return [];
    }
}

export const updateCategory = async (id: number, data: object) => {
    try {
        const response = await api.put(`admin/category/${id}/update`, data);
        return response.data.data;
    } catch (error) {
        return [];
    }
}