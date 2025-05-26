import { useEffect, useState } from "react";
import Form from "./Form";
import { showProduct } from "@/services/product/product";
import { useParams } from "react-router-dom";

interface Product {
    id: number,
    category_id: number,
    category: string,
    name: string,
    amount: number,
}

export default function Edit() {

    const { productId } = useParams();
    
    return (
        <>
            <Form item={productId}/>
        </>
    );
}