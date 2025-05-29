
import ProductItem from "@/components/Client/Item/Item";
import SideBar from "@/components/Client/Sidebar/SideBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CartProvider } from "@/contexts/Cart/CartContext";
import { getCategoriesClient } from "@/services/category/category";
import { getProductsByCategory, getProductsUser } from "@/services/product/product";
import { useEffect, useState } from "react";

interface Product {
    id:number;
    category_id: number;
    cart_item_id: number;
    cart_id: number;
    category: string,
    name: string;
    amount: number;
    quantity: number;
    brute_amount: number;
}
interface Category {
    id: number;
    name: string;
}

export default function Home() {

    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [products, setProducts] = useState<Product[] | undefined>(undefined);

    const fetchProducts = async () => {
        try {
            const productsList = await getProductsUser();
            setProducts(productsList?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const categoriesList = await getCategoriesClient();
            setCategories(categoriesList?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectCategoryChange = async (category_id: string) => {
        try {
            let response;
            if(category_id=="0") {
                response = await getProductsUser();
                setProducts(response?.data);
            }
            else{
                response = getProductsByCategory(category_id);
                response.then((productsList) => {
                    setProducts(productsList?.data);
                });
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    return (
        <>
            <CartProvider>
                <SideBar/>
                <div className="w-2/3 m-auto grid grid-cols-1 gap-3 gap-y-5 py-3">
                    <div className="lg:w-1/3 md:w-full flex items-center border-1 border-gray-200 px-1">
                        <span className="flex text-xs font-medium justify-end">Filtrar por</span>
                        <Select onValueChange={handleSelectCategoryChange}>
                                <SelectTrigger className="w-full border-0 font-medium text-xs focus-visible:ring-0 flex-1">
                                    <SelectValue className="px-0" placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent className="flex grow">
                                    <SelectItem className="text-xs font-medium" aria-selected={true} value="0">Todos</SelectItem>
                                    {
                                        categories?.map((item) => <SelectItem className="text-xs font-medium" aria-selected={true} key={item.id} value={String(item.id)}>{item.name}</SelectItem>)
                                    }
                                </SelectContent>
                        </Select>
                    </div>
                    <div className={`grid grid-cols-1 gap-3 gap-y-5 ${products?.length ? "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3" : ""}`}>
                        {
                            products?.length ? (products?.map((item) => ( 
                                <ProductItem key={item.id} data={item}/>
                            ))) : <div className="w-full">Nenhum item encontrado</div>
                        }
                    </div>
                </div>
            </CartProvider>
        </>
    )
};