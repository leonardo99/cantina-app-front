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
import { saveCategory, showCategory } from "@/services/category/category";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

interface Data {
    item?: string
}

export default function FormCategory({ item }: Data ) {
    const [category, setCategory] = useState<Category>();
    const navigate = useNavigate();

    const fetchCategory = async (id: any) => {
        try {
            const listProduct = await showCategory(id);
            setCategory(listProduct);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if(item) {
            fetchCategory(item)
        }
    }, []);

    const FormSchema = z.object({
        name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }).max(255),
    });
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: category?.name || "",
        },
        shouldUnregister: false,
        reValidateMode: 'onChange'
    });

    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name,
            });
        }
    }, [category, form.reset]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await saveCategory(data);
            navigate('/admin/category');
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200">{item ? 'Editar' : 'Cadastrar'} Categoria</CardTitle>
                    <CardContent className="p-0 pt-3">
                        <F {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1">
                                    <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <Button type="submit">{item ? "Editar": "Cadastrar"}</Button>
                            </form>
                        </F>
                    </CardContent>
                </CardHeader>   
            </Card>
        </>
    );
}