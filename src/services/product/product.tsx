import api from "@/services/api";

interface Products {
    id: number;
    name: string;
}

interface Product {
    id:number;
    category_id: number;
    category: string,
    name: string;
    amount: number;
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

export const getProducts = async (): Promise<ApiResponse<Product[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>("admin/product");
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const saveProduct = async (data: Object) => {
    try {
        const response = await api.post<Product | null>("admin/product", data);
        return response.data;
    } catch (error) {
        return [];
    }
}