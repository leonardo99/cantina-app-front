

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth/AuthContext";
import type { JSX } from "react";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();
    
    if (loading) return <div>Carregando...</div>;
           
    if(user) return <Navigate to="/dashboard" />

    return children;

}