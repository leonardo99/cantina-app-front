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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveProduct, showProduct, updateProduct } from "@/services/product/product";
import { getCategories } from "@/services/category/category";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from 'react-imask';
import { toast } from "sonner";

interface ApiResponse<T> {
    data: T;
    links: any;
    meta: any;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id:number;
    category_id: number;
    category: string,
    name: string;
    amount: number;
}

interface Data {
    item?: string
}

export default function Form({ item }: Data ) {
    const [categories, setCategories] = useState<ApiResponse<Category[]> | undefined>(undefined);
    const [product, setProduct] = useState<Product>();
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProduct = async (id: any) => {
        try {
            const listProduct = await showProduct(id);
            setProduct(listProduct);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchCategories();
        if(item) {
            fetchProduct(item)
        }
    }, []);
    
    const FormSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }).max(255),
    amount: z.string()
        .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
            message: "O preço deve ser um número decimal com no máximo 2 casas decimais.",
        })
        .refine((val) => parseFloat(val) >= 0.01, {
            message: "O preço deve ser maior ou igual a 0.01.",
        }),
    category_id: z.string().refine((val) => !isNaN(parseInt(val)), {
        message: "O ID da categoria é inválido.",
    }),
});
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: product?.name || "",
            amount: product?.amount.toString() || "",
            category_id: product?.category_id.toString() || "",
        },
        shouldUnregister: false,
        reValidateMode: 'onChange'
    });

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                amount: product.amount.toString(),
                category_id: product.category_id.toString(),
            });
        }
    }, [product, form.reset]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if(product?.id) {
                await updateProduct(product?.id, data);
                navigate('/admin/product');
            }
            toast("Sucesso", {
                description: `Produto ${product?.id ? "alterado" : "salvo "} com sucesso`,
                position: "top-right",
                duration: 2000, 
            });
            await saveProduct(data);
            navigate('/admin/product');
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle className="pb-2 border-b-1 border-b-gray-200">{item ? 'Editar' : 'Cadastrar'} Produto</CardTitle>
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
                                        name="amount"
                                        render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Preço</FormLabel>
                                        <FormControl>
                                            <IMaskInput
                                            // Aqui garantimos que sempre há um valor string
                                            value={field.value ?? ''}
                                            onAccept={(val: any) => field.onChange(val)}
                                            // Máscara de moeda com separador e decimal
                                            mask="R$ num"
                                            blocks={{
                                                num: {
                                                mask: Number,
                                                thousandsSeparator: '.',
                                                radix: ',',
                                                scale: 2,
                                                padFractionalZeros: true,
                                                normalizeZeros: true,
                                                },
                                            }}
                                            unmask={true} // envia valor puro para o RHF (ex: 1000.50)
                                            placeholder="R$ 0,00"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
  )}
/>
                                    <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}  defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="flex grow">
                                                {
                                                    !categories ? "" : (
                                                        categories.data.map((cat) => <SelectItem aria-selected={true} key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)
                                                    )
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs"/>
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