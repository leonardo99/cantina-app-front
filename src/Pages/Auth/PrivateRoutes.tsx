

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth/AuthContext";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();
    if (loading) return <div>Carregando...</div>;
           
    if(user === null) return <Navigate to="/" />

    return (
        <>
            <div className="w-full h-lvh flex justify-center items-center">
                { children }
            </div>
        </>
    )

}