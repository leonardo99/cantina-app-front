

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom";

export default function Login() {
    
    return (
        <>
            <div className="w-full h-lvh flex justify-center items-center">
                <Card className="w-[350px]">
                    <CardHeader className="text-center text-3xl">
                        {/* <CardTitle className="flex flex-col gap-1 justify-center items-center">
                            <img className="w-20 h-20" src={Logo} alt="logomarca" />
                            CantinaApp
                            </CardTitle>
                        <CardDescription>Entre para iniciar sua sessão</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        dashboard cliente
                    </CardContent>
                </Card>
            </div>
        </>
    )
};