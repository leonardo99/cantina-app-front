import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { faCartShopping, faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Cart () {
    
    return (
        <>
            <Sheet>
                <SheetTrigger className="flex gap-0.2 cursor-pointer justify-center items-center text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <Badge variant="outline" className="w-4 h-4 border-0 text-gray-500 text-sm">
                        01
                    </Badge>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader className="border-b border-b-gray-200">
                        <SheetTitle>Meu Carrinho</SheetTitle>
                    </SheetHeader>
                    <div className="p-3 text-sm rounded-sm space-y-3 cursor-pointer">
                        <div>
                            <h2 className="font-medium">Refrigerante 250ml</h2>
                            <div className="flex justify-between items-center">
                                <h3>R$5,00</h3>
                                <Button variant="ghost" className="w-fit p-0 font-medium cursor-pointer text-red-600 hover:bg-transparent hover:text-red-700"><FontAwesomeIcon icon={faTrashCan} /></Button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-stretch">
                                <Button className="h-auto rounded-tr-none rounded-br-none rounded-tr-1 outline font-medium cursor-pointer"><FontAwesomeIcon icon={faMinus} /></Button>
                                <div className="h-auto flex flex-col justify-center items-center border-y-2 border-primary p-1">                            
                                    <Input className="w-12 h-4 text-center text-xs rounded-none border-none focus-visible:ring-0 shadow-none"/>
                                </div>
                                <Button className="h-auto rounded-tl-none rounded-bl-none rounded-tr-1 font-medium cursor-pointer"><FontAwesomeIcon icon={faPlus} /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto border-t border-t-gray-200 flex flex-col justify-end p-2 space-y-2">
                        <p className="font-bold text-xl ml-auto"><span className="font-normal text-sm">Total:</span> R$20,00</p>
                        <Button className="font-medium cursor-pointer uppercase">Concluir compra</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )

}