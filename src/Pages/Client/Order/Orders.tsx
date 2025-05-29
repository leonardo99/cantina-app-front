import IndexClient from "../Index";
import OrderList from "./OrdersList";

export default function Orders() {
    return (
        <>
            <IndexClient>
                <div>
                    <OrderList />
                </div>
            </IndexClient>   
        </>
    )

}