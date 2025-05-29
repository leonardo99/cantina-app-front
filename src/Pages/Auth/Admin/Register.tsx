
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import Logo  from "@/assets/logo.png";
import { registerUser } from "@/services/user/user";

type formData = {
    name: string,
    email: string,
    password: string
    password_confirmation: string
}

export default function AdminRegister() {
    const {
        register,
        handleSubmit,
    } = useForm<formData>();

    const navigate = useNavigate();

    const onSubmit = async (data: formData) => {
        try {
            await registerUser({...data, type: "admin"});
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
                                     id="password_confirmation" type="password" placeholder="Senha" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>
                                    <Link className="underline text-sm text-primary" to="/admin/login">Fazer login</Link>
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