import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getOrdersByStatus, updateStatusOrder } from "@/services/order/client/order";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    created_at: string,
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

export default function Painel() {

    const [pendingOrders, setPendingOrders] = useState<ApiResponse<Order[]> | undefined>(undefined);
    const [preparingOrders, setPreparingOrders] = useState<ApiResponse<Order[]> | undefined>(undefined);
    const [preparedOrders, setPreparedOrders] = useState<ApiResponse<Order[]> | undefined>(undefined);

    const fetchPendingOrders = async() => {
        try {
            const response = await getOrdersByStatus({status: "pending"});
            setPendingOrders(response);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchPreparingOrders = async() => {
        try {
            const response = await getOrdersByStatus({status: "preparing"});
            setPreparingOrders(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPreparedOrders = async() => {
        try {
            const response = await getOrdersByStatus({status: "prepared"});
            setPreparedOrders(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Promise.all([
            fetchPendingOrders(),
            fetchPreparingOrders(),
            fetchPreparedOrders()
        ])
    }, []);

    const sendToprepare = async (order: Order) => {
        const updatedPendingOrders = pendingOrders?.data?.filter((orderItem) => orderItem.id !== order.id) || [];
        setPendingOrders(prev => ({
            data: updatedPendingOrders,
            links: prev?.links,
            meta: prev?.meta,
        }));
    
        setPreparingOrders(prev => ({
            data: [...(prev?.data || []), order],
            links: prev?.links,
            meta: prev?.meta,
        }));
        await updateStatusOrder(order.id, {status:"preparing"});
        toast("Sucesso", {
                description: "Pedido em preparação",
                position: "top-right",
                duration: 2000, 
        });
    };

    const sendToPreparedOrders = async (order: Order) => {
        const updatedPreparingOrders = preparingOrders?.data?.filter((orderItem) => orderItem.id !== order.id) || [];
        setPreparingOrders(prev => ({
            data: updatedPreparingOrders,
            links: prev?.links,
            meta: prev?.meta,
        }));
    
        setPreparedOrders(prev => ({
            data: [...(prev?.data || []), order],
            links: prev?.links,
            meta: prev?.meta,
        }));
        toast("Sucesso", {
                description: "Pedido preparado",
                position: "top-right",
                duration: 2000, 
        });
        await updateStatusOrder(order.id, {status:"prepared"});
    };

    const markOrderAsDelivered = async (order: Order) => {
        const updatedPreparedOrders = preparedOrders?.data?.filter((orderItem) => orderItem.id !== order.id) || [];
        setPreparedOrders(prev => ({
            data: updatedPreparedOrders,
            links: prev?.links,
            meta: prev?.meta,
        }));
        toast("Sucesso", {
                description: "Pedido entregue",
                position: "top-right",
                duration: 2000, 
        });
        await updateStatusOrder(order.id, {status:"delivered"});
    };


    
    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200">Painel de pedidos</CardTitle>
                    <CardContent className="p-0 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Card className="rounded-xs gap-2">
                            
                            <CardHeader className="font-medium p-y-1">Pendentes</CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                {
                                    pendingOrders?.data.map((item, i) => (
                                        <div key={item.id}>
                                            <ul key={i} className="bg-gray-100/25 p-2  text-sm flex flex-col gap-1">
                                                <li className="flex justify-between font-medium">
                                                    <h3>Pedido #{item.id}</h3>
                                                    <h3 className="text-xs">{item.created_at}</h3>
                                                </li>
                                                {
                                                    item?.items.map((orderItem) => (
                                                        <li key={orderItem.id} className="flex flex-col">
                                                            <span>{orderItem.amount}x {orderItem.items.name}</span>
                                                        </li>
                                                    ))
                                                }
                                            <Button className="h-7 cursor-pointer" onClick={() => sendToprepare(item)}>Preparar</Button>
                                            </ul>
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>

                        <Card className="rounded-xs gap-2">
                            <CardHeader className="font-medium p-y-1">Preparando</CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                {
                                    preparingOrders?.data.map((item, i) => (
                                        <div key={item.id}>
                                            <ul key={i} className="bg-gray-100/25 p-2  text-sm flex flex-col gap-1">
                                                <li className="flex justify-between font-medium">
                                                    <h3>Pedido #{item.id}</h3>
                                                    <h3 className="text-xs">às 12:40</h3>
                                                </li>
                                                {
                                                    item?.items.map((orderItem) => (
                                                        <li key={orderItem.id} className="flex flex-col">
                                                            <span>{orderItem.amount}x {orderItem.items.name}</span>
                                                        </li>
                                                    ))
                                                }
                                            <Button className="h-7 cursor-pointer" onClick={() => sendToPreparedOrders(item)}>Pronto</Button>
                                            </ul>
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>

                        <Card className="rounded-xs gap-2">
                            <CardHeader className="font-medium p-y-1">Pronto</CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                {
                                    preparedOrders?.data.map((item, i) => (
                                        <div key={item.id}>
                                            <ul key={i} className="bg-gray-100/25 p-2  text-sm flex flex-col gap-1">
                                                <li className="flex justify-between font-medium">
                                                    <h3>Pedido #{item.id}</h3>
                                                    <h3 className="text-xs">às 12:40</h3>
                                                </li>
                                                {
                                                    item?.items.map((orderItem) => (
                                                        <li key={orderItem.id} className="flex flex-col">
                                                            <span>{orderItem.amount}x {orderItem.items.name}</span>
                                                        </li>
                                                    ))
                                                }
                                            <Button className="h-7 cursor-pointer" onClick={() => markOrderAsDelivered(item)}>Entregar</Button>
                                            </ul>
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>
                        
                    </CardContent>
                </CardHeader>   
            </Card>
        </>
    );
}