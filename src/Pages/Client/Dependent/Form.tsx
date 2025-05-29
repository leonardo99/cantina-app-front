import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form as F,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { saveUser } from "@/services/user/user";
import { useNavigate } from "react-router-dom";
import IndexClient from "../Index";
import { useAuth } from "@/contexts/Auth/AuthContext";

interface User {
    name: string,
    email: string,
    phone: string,
}

export default function DependentForm() {

    const { user } = useAuth();

    const navigate = useNavigate();
    
    if(user.data.type === 'student' || user.data.type === 'admin') {
        navigate('/dashboard');
    }
    
    const FormSchema = z.object({
        name: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
        }),
        email: z.string().email({
            message: "Formato de email inválido.",
        }).min(2, {
            message: "O email deve ter pelo menos 2 caracteres.",
        }),
        phone: z.string().min(8, {
            message: "O telefone deve ter pelo menos 8 dígitos.",
        }),
    });
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
        shouldUnregister: false,
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await saveUser(data);
            navigate('/user/dependent/');
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <IndexClient>
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle className="pb-2 border-b-1 border-b-gray-200">Cadastrar Dependente</CardTitle>
                        <CardContent className="p-0 pt-3">
                            <F {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs"/>
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl className="w-full">
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl className="w-full">
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    <Button type="submit">Cadastrar</Button>
                                </form>
                            </F>
                        </CardContent>
                    </CardHeader>   
                </Card>        
            </IndexClient>   
        </>
    );
}