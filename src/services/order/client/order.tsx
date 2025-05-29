import api from "@/services/api";
interface Order {
    id: number,
    user_id: number,
    responsible_id: number,
    dependent_id: number,
    total_value: number,
    status: string
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

export const getOrders = async (): Promise<ApiResponse<Order[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<Order[]>>("/user/order");
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};