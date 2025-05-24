
import {  
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import Cart from "@/components/Client/cart/Cart";
import { useAuth } from "@/contexts/Auth/AuthContext";

export default function Home() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch {
            console.log("error");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between text-sm w-full p-3 bg-gray-100/20 shadow-b shadow-sm inset-shadow-gray-200">
                <Link className="flex gap-2 justify-center items-center" to="/dashboard">
                    <img className="w-10 h-10" src={Logo} alt="Logo"/>
                    <h2 className="font-bold">CantinaApp</h2>
                </Link>
                <div className="flex justify-center items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger 
                            className={`flex items-center justify-center gap-2 text-gray-500 font-semibold cursor-pointer outline-none p-2`}>
                                <FontAwesomeIcon icon={faUser} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-2">
                            <DropdownMenuItem>Meus Pedidos</DropdownMenuItem>
                            <DropdownMenuItem onClick={ () => handleLogout() }>Sair</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Cart />
                </div>
            </div>
        </>
    )
};