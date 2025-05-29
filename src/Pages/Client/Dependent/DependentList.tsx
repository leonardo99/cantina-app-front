import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom";
import IndexClient from "../Index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getDependents } from "@/services/user/user";
import { useAuth } from "@/contexts/Auth/AuthContext";

interface User {
    id: number,
    name: string,
    email: string,
    type: string
}

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}
export default function DependentForm() {

    const [dependents, setDependents] = useState<ApiResponse<User[]> | undefined>(undefined);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    if(user.data.type === 'student' || user.data.type === 'admin') {
        navigate('/dashboard');
    }

    const fetchDependents = async () => {
            try {
                const response = await getDependents();
                setDependents(response);
            } catch (error) {
                console.log(error);
            }
    }
    
    useEffect(() => {
        fetchDependents();
    }, []);
    return (
        <>
            <IndexClient>
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="pb-2 border-b-1 border-b-gray-200">Dependentes</CardTitle>
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
                                    dependents?.data.length === 0 ? <TableCell colSpan={3}>Não há dependentes cadastrados</TableCell>:(dependents?.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-normal py-4">{item.id}</TableCell>
                                        <TableCell className="font-normal py-4 capitalize">{item.name}</TableCell>
                                    </TableRow>
                                    )))
                                }
                                </TableBody>
                            </Table>
                            <div className="w-full flex justify-between py-2">
                                <Link to="/dashboard">
                                    <Button variant={"secondary"} className="cursor-pointer">Voltar</Button>
                                </Link>
                                <Link to="/user/dependent/create">
                                    <Button className="cursor-pointer">Adicionar</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </CardHeader>   
            </Card>
            </IndexClient>   
        </>
    );
}