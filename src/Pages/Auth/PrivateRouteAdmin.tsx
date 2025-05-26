

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth/AuthContext";
import type { JSX } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "@/components/Sidebar/SidebarItem";

export default function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();
    
    if (loading) return <div>Carregando...</div>;
    
    if(user === null || user.data.type != "admin") return <Navigate to="/" />

    return (
        <>
            <div className="w-full h-lvh">
                 <SidebarProvider>
                    <main>
                        <SidebarTrigger />
                        <Sidebar>
                            <SidebarContent>
                                <SidebarGroup>
                                    <SidebarGroupLabel>CantinaApp</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                        {/* {projects.map((project) => ( */}
                                            <SidebarMenuItem 
                                            // key={project.name}
                                            >
                                                <SidebarItem to="/admin/product/">
                                                    <FontAwesomeIcon icon={faBagShopping} />
                                                    <span>Produtos</span>
                                                </SidebarItem>
                                            </SidebarMenuItem>
                                        {/* ))} */}
                                        </SidebarMenu>
                                </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>
                        </Sidebar>
                    </main>
                    <div className="p-5 w-full">
                        {children}
                    </div>
                </SidebarProvider>
            </div>
        </>
    )

}