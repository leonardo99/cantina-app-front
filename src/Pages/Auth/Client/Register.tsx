
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import Logo  from "@/assets/logo.png";
import { registerUser } from "@/services/user/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IMaskInput } from "react-imask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


type formData = {
    name: string,
    email: string,
    type: string,
    phone: string,
    password: string
    password_confirmation: string
}

export const clientRegisterSchema = z
  .object({
    name: z.string().nonempty("Nome obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    password_confirmation: z.string().nonempty("Confirme a senha"),
    phone: z
      .string()
      .nonempty("Telefone obrigatório")
      .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
    type: z.enum(["student", "responsible"], {
      errorMap: () => ({ message: "Selecione uma categoria" }),
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  });

  export type ClientRegisterData = z.infer<typeof clientRegisterSchema>;

export default function ClientRegister() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ClientRegisterData>({
    resolver: zodResolver(clientRegisterSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data: formData) => {
        try {
            console.log(data);
            await registerUser(data);
            navigate('/admin/login');
        } catch {
            console.log("erro");
        }
    }

    return (
        <>
            <div className="w-full h-lvh flex justify-center items-center">
                <Card className="w-[350px]">
                    <CardHeader className="text-center text-3xl">
                        <CardTitle className="flex flex-col gap-1 justify-center items-center">
                            <img className="w-20 h-20" src={Logo} alt="logomarca" />
                            CantinaApp
                            </CardTitle>
                        <CardDescription>Cadastrar Usuário</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input 
                                    {...register("name")}
                                    id="name" type="name" placeholder="Nome" />
                                    {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    {...register("email")}
                                    id="email" type="email" placeholder="Email" />
                                    {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                    {...register("password")}
                                     id="password" type="password" placeholder="Senha" />
                                     {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password_confirmation">Confirmar senha</Label>
                                    <Input
                                    {...register("password_confirmation")}
                                     id="password_confirmation" type="password" placeholder="Confirmar senha" />
                                    {errors.password_confirmation && (
                                    <p className="text-sm text-destructive">{errors.password_confirmation.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Telefone</Label>
                                    <IMaskInput
                                        {...register("phone")}
                                        id="phone"
                                        mask="(00) 00000-0000"
                                        placeholder="(00) 00000-0000"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    />
                                    {errors.phone && (
                                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="type">Categoria</Label>
                                    <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger id="type" className="w-full">
                                            <SelectValue placeholder="Escolha uma categoria" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="student">Estudante</SelectItem>
                                            <SelectItem value="responsible">Responsável</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    )}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>
                                    <Link className="underline text-sm text-primary" to="/">Fazer login</Link>
                                </div>
                                <Button type="submit">Criar Usuário</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}