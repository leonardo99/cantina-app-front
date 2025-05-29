import api from "@/services/api";
interface Product {
    name: string
}
interface OrderItem {
    id: number,
    order_id: number,
    amount: number,
    price: number
    items: Product
}
interface Order {
    id: number,
    user_id: number,
    responsible_id: number,
    dependent_id: number,
    total_value: number,
    status: string,
    items: OrderItem[],
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

export const updateStatusOrder = async (id: number, status: object): Promise<ApiResponse<Order> | undefined> => {
    try {
        const response = await api.patch<ApiResponse<Order>>(`/admin/order/${id}`, status);
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getOrdersByStatus = async (data: object): Promise<ApiResponse<Order[]> | undefined> => {
    try {
        const response = await api.get<ApiResponse<Order[]>>("/admin/order",  {
            params: data
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};