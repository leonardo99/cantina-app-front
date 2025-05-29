
import type { JSX } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import { useAuth } from "@/contexts/Auth/AuthContext";



export default function IndexClient({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
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
                                                <SidebarItem to="/user/order">
                                                    <FontAwesomeIcon icon={faBagShopping} />
                                                    <span>Pedidos</span>
                                                </SidebarItem>
                                                {
                                                    user?.data.type == "responsible" ? (
                                                        <SidebarItem to="/user/dependent">
                                                            <FontAwesomeIcon icon={faUser} />
                                                            <span>Dependentes</span>
                                                        </SidebarItem>
                                                    ) : ""
                                                }
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