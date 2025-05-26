import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getProducts } from "@/services/product/product";
import { useEffect, useState } from "react";
import { number } from "zod";

const invoices = [
    {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

interface Product {
    id: number,
    category_id: number,
    category: string,
    name: string,
    amount: number,
}


export default function Index() {
    const [products, setProducts] = useState<ApiResponse<Product[]> | undefined>(undefined);

    const fetchCategories = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.log(error);
            }
        }
    
        useEffect(() => {
            fetchCategories();
        }, []);
    

    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200">Listagem de Produtos</CardTitle>
                    <CardContent className="p-0 pt-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead className="flex justify-end">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    !products ? "" : (products?.data.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">{product.id}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.amount}</TableCell>
                                            <TableCell className="text-right">Ações</TableCell>
                                        </TableRow>
                                    )))
                                }
                            </TableBody>
                            <TableFooter>
                                sd
                            </TableFooter>
                        </Table>

                    </CardContent>
                </CardHeader>   
            </Card>
        </>
    );
}