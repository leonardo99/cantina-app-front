import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { faCartShopping, faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCart } from "@/contexts/Cart/CartContext"

export default function Cart () {

    const { 
        cart, 
        cartOpen, 
        setOpen, 
        incrementQuantity, 
        decrementQuantity, 
        removeFromCart, 
        getTotalProducts, 
        calculateTotalCart,
        saveOrder,
    } = useCart();
    
    return (
        <>
            <Sheet open={cartOpen} onOpenChange={setOpen}>
                <SheetTrigger className="flex gap-0.2 cursor-pointer justify-center items-center text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <Badge variant="outline" className="w-4 h-4 border-0 text-gray-500 text-sm">
                        {getTotalProducts()}
                    </Badge>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader className="border-b border-b-gray-200">
                        <SheetTitle>Meu Carrinho</SheetTitle>
                    </SheetHeader>
                    {
                        cart.length ? (
                            cart.map((item) => {
                                return (
                                <div key={item.id} className="p-3 text-sm rounded-sm space-y-3 cursor-pointer">
                                    <div>
                                        <h2 className="font-medium">{item.name}</h2>
                                        <div className="flex justify-between items-center">
                                            <h3>{item.amount}</h3>
                                            <Button onClick={() => (removeFromCart(item.id))} variant="ghost" className="w-fit p-0 font-medium cursor-pointer text-red-600 hover:bg-transparent hover:text-red-700"><FontAwesomeIcon icon={faTrashCan} /></Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-stretch">
                                            <Button className="h-auto rounded-tr-none rounded-br-none rounded-tr-1 outline font-medium cursor-pointer" onClick={ () => decrementQuantity(item.id) }><FontAwesomeIcon icon={faMinus} /></Button>
                                            <div className="h-auto flex flex-col justify-center items-center border-y-2 border-primary p-1">                            
                                                <Input value={ item.quantity } className="w-12 h-4 text-center text-xs rounded-none border-none focus-visible:ring-0 shadow-none"/>
                                            </div>
                                            <Button className="h-auto rounded-tl-none rounded-bl-none rounded-tr-1 font-medium cursor-pointer" onClick={ () => incrementQuantity(item.id) }><FontAwesomeIcon icon={faPlus} /></Button>
                                        </div>
                                    </div>
                                </div>)
                            })) : <div className="p-2 font-light">Nenhum item no carrinho</div>
                    }
                    {
                        cart.length ? (
                            <div className="mt-auto border-t border-t-gray-200 flex flex-col justify-end p-2 space-y-2">
                                <p className="font-bold text-xl ml-auto"><span className="font-normal text-sm">Total:</span> { calculateTotalCart() }</p>
                                <Button className="font-medium cursor-pointer uppercase" onClick={() => saveOrder()}>Concluir compra</Button>
                            </div>
                        ) : ""
                    }
                </SheetContent>
            </Sheet>
        </>
    )

}