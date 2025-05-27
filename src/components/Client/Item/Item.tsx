import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";

interface Product {
    id:number;
    category_id: number;
    category: string,
    name: string;
    amount: number;
}

interface Item {
    data: Product,
}

export default function ProductItem({ data }: Item) {

    return (
        <>
            <Card className="rounded-sm pb-0">
                <CardContent>
                   <h2 className="text-md">{data.name}</h2>
                   <h3 className="text-sm font-medium">{data.amount}</h3>
                </CardContent>
                <CardFooter className="p-0 sm:p-2.5">
                    <Button className="w-full rounded-none rounded-bl-md rounded-br-md cursor-pointer md:rounded-md md:text-xs">Adicionar ao carrinho</Button>
                </CardFooter>
            </Card>
        </>
    )
};