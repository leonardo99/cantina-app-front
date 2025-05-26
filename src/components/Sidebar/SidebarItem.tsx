
import { SidebarMenuButton } from "../ui/sidebar";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  children: React.ReactNode;
}

export default function SidebarItem({ to, children }: SidebarItemProps) {
    const location = useLocation();
    return(
        <SidebarMenuButton isActive={location.pathname === to} className="mt-1">
            <Link to={to} className="flex gap-x-1 items-center">{children}</Link>
        </SidebarMenuButton>
    )
}