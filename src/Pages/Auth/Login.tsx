
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import Logo  from "@/assets/logo.png";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// type formData = {
//     email: string,
//     password: string
// }

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type formData = z.infer<typeof loginSchema>;


export default function Login() {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formData>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data: formData) => {
        try {
            await login(data.email, data.password);
        } catch(error) {
            toast("Erro", {
                description: error.response.data.error,
                position: "top-center",
                duration: 2000, 
            });
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
                        <CardDescription>Entre para iniciar sua sessão</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    {...register("email")}
                                    id="email" type="email" placeholder="Email" />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                    {...register("password")}
                                     id="password" type="password" placeholder="Senha" />
                                      {errors.password && (
                                        <p className="text-red-500 text-xs">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>
                                    <Link className="underline text-sm text-primary" to="/client/register">Registrar usuário</Link>
                                </div>
                                <Button type="submit">Entrar</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}