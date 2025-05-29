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
import { getCategories } from "@/services/category/category";

interface Category {
    id: number;
    name: string;
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

export default function Category() {
    const [categories, setCategories] = useState<ApiResponse<Category[]> | undefined>(undefined);

    const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
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
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200">Listagem de Categorias</CardTitle>
                    <CardContent className="p-0 pt-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Nome</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {
                                categories?.data.length === 0 ? <TableCell colSpan={3}>Não há itens cadastrados</TableCell>:(categories?.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-normal py-4">{item.id}</TableCell>
                                    <TableCell className="font-normal py-4">{item.name}</TableCell>
                                </TableRow>
                                )))
                            }
                            </TableBody>
                        </Table>
                        <div className="w-full flex justify-between py-2">
                            <Button variant={"secondary"} className="cursor-pointer">Voltar</Button>
                            <Link to="/admin/category/create">
                                <Button className="cursor-pointer">Nova categoria</Button>
                            </Link>
                        </div>
                    </CardContent>
                </CardHeader>   
            </Card>
        </>
    );
}