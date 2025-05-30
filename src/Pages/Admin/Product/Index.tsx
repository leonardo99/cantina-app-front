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
import { deleteProduct, getProducts } from "@/services/product/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

interface Product {
    id:number;
    category_id: number;
    cart_item_id: number;
    cart_id: number;
    category: string,
    name: string;
    amount: number;
    quantity: number;
    brute_amount: number;
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

    const handleDelete = async (item: Product) => {
        try {
            await deleteProduct(item);
            toast("Sucesso", {
                description: `Produto deletado com sucesso`,
                position: "top-right",
                duration: 2000, 
            });
        } catch (error) {
            toast("Erro", {
                description: `Ocorreu um erro`,
                position: "top-right",
                duration: 2000, 
            });
            console.log(error);
        } finally {
            if (products?.data) {
                const deleteItem = products?.data.filter(product => product.id !== item.id);
                setProducts({...products, data: deleteItem}); 
            }
        }
    }
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
                                products?.data.length === 0 ? <TableCell colSpan={4}>Não há itens cadastrados</TableCell>:(products?.data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-normal">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.amount}</TableCell>
                                    <TableCell className="text-right flex gap-1 justify-end">
                                        <Delete data={ product } handleDelete={handleDelete}/>
                                        <Link to={`/admin/product/${product.id}/edit`}>
                                            <Button className="bg-amber-600 cursor-pointer hover:bg-amber-700">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                                )))
                            }
                            </TableBody>
                        </Table>
                        <div className="w-full flex justify-between py-2">
                            <Button variant={"secondary"} className="cursor-pointer">Voltar</Button>
                            <Link to="/admin/product/create">
                                <Button className="cursor-pointer">Novo produto</Button>
                            </Link>
                        </div>
                    </CardContent>
                </CardHeader>   
            </Card>
        </>
    );
}