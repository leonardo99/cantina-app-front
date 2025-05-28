import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { CartProvider } from "@/contexts/Cart/CartContext";
import { useCart } from "@/contexts/Cart/CartContext";

interface Product {
    id:number;
    category_id: number;
    cart_item_id: number;
    cart_id: number;
    category: string,
    name: string;
    amount: number;
    quantity: number
    brute_amount: number;
}

interface Item {
    data: Product,
}

export default function ProductItem({ data }: Item) {

    const { addToCart } = useCart();

    return (
        <>
            <CartProvider>
                <Card className="rounded-sm pb-0">
                    <CardContent>
                    <h2 className="text-md">{data.name}</h2>
                    <h3 className="text-sm font-medium">{data.amount}</h3>
                    </CardContent>
                    <CardFooter className="p-0 sm:p-2.5">
                        <Button onClick={() => addToCart(data) } className="w-full rounded-none rounded-bl-md rounded-br-md cursor-pointer md:rounded-md md:text-xs">Adicionar ao carrinho</Button>
                    </CardFooter>
                </Card>
            </CartProvider>
        </>
    )
};