

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth/AuthContext";
import type { JSX } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBagShopping, faList, faNoteSticky, faTable } from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import { Button } from "@/components/ui/button";

export default function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
    const { user, loading, logout } = useAuth();
    
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
                                                <SidebarItem to="/admin/category/">
                                                    <FontAwesomeIcon icon={faList} />
                                                    <span>Categorias</span>
                                                </SidebarItem>
                                                <SidebarItem to="/admin/painel">
                                                    <FontAwesomeIcon icon={faTable} />
                                                    <span>Painel</span>
                                                </SidebarItem>
                                                <SidebarItem to="/admin/order">
                                                    <FontAwesomeIcon icon={faNoteSticky} />
                                                    <span>Pedidos</span>
                                                </SidebarItem>
                                            </SidebarMenuItem>
                                        {/* ))} */}
                                        </SidebarMenu>
                                </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>
                            <SidebarFooter>
                                <Button variant="ghost" className="cursor-pointer" onClick={() => logout()}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket}/>Sair
                                </Button>
                            </SidebarFooter>
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