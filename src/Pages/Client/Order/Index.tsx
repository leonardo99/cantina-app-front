
import type { JSX } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faList } from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import { useAuth } from "@/contexts/Auth/AuthContext";

export default function IndexOrder({ children }: { children: JSX.Element }) {
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
                                                <SidebarItem to="/client/order/">
                                                    <FontAwesomeIcon icon={faBagShopping} />
                                                    <span>Pedidos</span>
                                                </SidebarItem>
                                                {
                                                    user?.type === "responsible" ? (
                                                        <SidebarItem to="/client/responsible/">
                                                            <FontAwesomeIcon icon={faBagShopping} />
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