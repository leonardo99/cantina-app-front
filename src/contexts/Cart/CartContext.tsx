import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
    id:number;
    category_id: number;
    cart_item_id: number;
    cart_id: number;
    category: string,
    name: string;
    amount: number;
    quantity: number,
    brute_amount: number;
};

type CartContextType = {
  cart: CartItem[];
  cartOpen: boolean;
  setOpen: (value: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  getTotalProducts: () => number;
  saveOrder: () => void;
  calculateTotalCart: () => string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        const loadCart = async () => {
            const response = await api.get("/user/cart");
            setCart(response.data.data);
        };
        loadCart();
    }, []);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                const updatedCart = prev.map((i) =>
                    i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                );
                api.post('/user/cart', {
                    ...item,
                    quantity: exists.quantity + item.quantity,
                }).catch(console.error);
                setCartOpen(true);
                return updatedCart;
            }
            api.post('/user/cart', item).catch(console.error);

            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => {
            const itemToRemove = prev.find((item) => item.id === id);
            if (itemToRemove) {
                api.delete(`user/cart/${itemToRemove.cart_id}/item/${itemToRemove.cart_item_id}`).catch(console.error);
            }
            return prev.filter((item) => item.id !== id);
        });
    };

    const incrementQuantity = (id: number) => {
        setCart((prev) => {
            const updatedCart = prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            const newValueCart = updatedCart.find((item) => item.id === id);
            api.post('/user/cart', newValueCart).catch(console.error);

            return updatedCart;
        }
        );
    };

    const decrementQuantity = (id: number) => {
        setCart(prev => {
            const updatedCart = prev.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            const newValueCart = updatedCart.find((item) => item.id === id);
            api.post('/user/cart', newValueCart).catch(console.error);

            return updatedCart;
        }
        );
    };

    const saveOrder = async() => {
        try {
            const formatedProducts = cart.map(({cart_id, id, brute_amount, quantity}) => ({
                cart_id,
                product_id: id,
                price: brute_amount,
                amount: quantity
            }));

            await api.post('/user/order', formatedProducts);
            setCart([]);
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalProducts = (): number => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    const calculateTotalCart = (): string => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formatter.format(cart.reduce((acc, item) => acc + (item.quantity * item.brute_amount), 0));
    }

    const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
        cart, 
        cartOpen, 
        setOpen: setCartOpen, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        incrementQuantity, 
        decrementQuantity, 
        getTotalProducts, 
        calculateTotalCart,
        saveOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
};