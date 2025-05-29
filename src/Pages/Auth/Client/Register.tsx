
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import Logo  from "@/assets/logo.png";
import { registerUser } from "@/services/user/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type formData = {
    name: string,
    email: string,
    type: string,
    phone: string,
    password: string
    password_confirmation: string
}

export default function ClientRegister() {
    const {
        register,
        handleSubmit,
        control,
    } = useForm<formData>();

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
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    {...register("email")}
                                    id="email" type="email" placeholder="Email" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                    {...register("password")}
                                     id="password" type="password" placeholder="Senha" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password_confirmation">Confirmar senha</Label>
                                    <Input
                                    {...register("password_confirmation")}
                                     id="password_confirmation" type="password" placeholder="Confirmar senha" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Telefone</Label>
                                    <Input
                                    {...register("phone")}
                                     id="phone" type="text" placeholder="Telefone" />
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