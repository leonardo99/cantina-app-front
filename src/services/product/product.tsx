import api from "@/services/api";
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

export const getProductsByCategory = async (id?:string): Promise<ApiResponse<Product[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>(`user/category/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getProductsUser = async (id?:string): Promise<ApiResponse<Product[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>("user/product");
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

export const deleteProduct = async (data: Product) => {
    try {
        const response = await api.delete(`admin/product/${data.id}/delete`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const showProduct = async (id: string) => {
    try {
        const response = await api.get(`admin/product/${id}`);
        return response.data.data;
    } catch (error) {
        return [];
    }
}

export const updateProduct = async (id: number, data: object) => {
    try {
        const response = await api.put(`admin/product/${id}/update`, data);
        return response.data.data;
    } catch (error) {
        return [];
    }
}