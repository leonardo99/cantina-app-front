
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Product {
    id: number,
    category_id: number,
    category: string,
    name: string,
    amount: number,
}

interface Data {
    data: Product
    handleDelete: (data: Product) => void
}

export default function Delete({ data, handleDelete }: Data) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="bg-red-600 cursor-pointer hover:bg-red-700">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja deletar o Produto?</AlertDialogTitle>
                        <AlertDialogDescription>
                           O produto será deletado permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 cursor-pointer hover:bg-red-700" onClick={() => handleDelete(data)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}