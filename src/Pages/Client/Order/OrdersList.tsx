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
import { getOrders } from "@/services/order/client/order";

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

export default function OrderList() {
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

    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200">Meus Pedidos</CardTitle>
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