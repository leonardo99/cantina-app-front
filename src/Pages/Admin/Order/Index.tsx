import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders, getOrdersByStatus } from "@/services/order/client/order";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default function OrderListAdmin() {
    const [orders, setOrders] = useState<ApiResponse<Order[]> | undefined>(undefined);

    const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response);
            } catch (error) {
                console.log(error);
            }
    }
    
    useEffect(() => {
        fetchOrders();
    }, []);

    async function handleSelectCategoryChange(status: string) {
        try {
            let response;
            if(status == "0") {
                response = await getOrdersByStatus({status:null});
                setOrders(response);
            }
            else{
                response = await getOrdersByStatus({status});
                setOrders(response);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200 flex justify-between">
                        <h3 className="flex flex-1">Pedidos</h3>
                        <Select onValueChange={handleSelectCategoryChange}>
                                <SelectTrigger className="border-0 font-medium text-xs focus-visible:ring-0">
                                    <SelectValue className="px-0" placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent className="flex grow">
                                    <SelectItem className="text-xs font-medium" aria-selected={true} value="0">Todos</SelectItem>
                                    <SelectItem className="text-xs font-medium" aria-selected={true} value="pending">Pendentes</SelectItem>
                                    <SelectItem className="text-xs font-medium" aria-selected={true} value="preparing">Em preparação</SelectItem>
                                    <SelectItem className="text-xs font-medium" aria-selected={true} value="prepared">Preparados</SelectItem>
                                    <SelectItem className="text-xs font-medium" aria-selected={true} value="delivered">Entregues</SelectItem>
                                </SelectContent>
                        </Select>
                    </CardTitle>
                    <CardContent className="p-0 pt-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Valor Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {
                                orders?.data.length === 0 ? <TableCell colSpan={3}>Não há pedidos cadastrados</TableCell>:(orders?.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-normal py-4">{item.id}</TableCell>
                                    <TableCell className="font-normal py-4 capitalize">{item.status}</TableCell>
                                    <TableCell className="font-normal py-4">{item.total_value}</TableCell>
                                </TableRow>
                                )))
                            }
                            </TableBody>
                        </Table>
                        <div className="w-full flex justify-between py-2">
                            <Link to="/dashboard">
                                <Button variant={"secondary"} className="cursor-pointer">Voltar</Button>
                            </Link>
                        </div>
                    </CardContent>
                </CardHeader>   
            </Card>
        </>
    );
}