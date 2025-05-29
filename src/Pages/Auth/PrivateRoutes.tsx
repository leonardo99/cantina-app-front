

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth/AuthContext";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();
    if (loading) return <div>Carregando...</div>;
           
    if(user === null) return <Navigate to="/" />

    if(user.data.type === "admin")  {
        return <Navigate to="/admin/painel" />
    }

    return (
        <>
            <div className="w-full h-lvh">
                { children }
            </div>
        </>
    )

}