
import React from "react";
import { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { book, quantity } = item;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-grow">
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
            <p className="font-medium mt-1">${book.price.toFixed(2)} each</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => updateQuantity(book.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-8 px-4 flex items-center justify-center border-y">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => updateQuantity(book.id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="font-bold">${(book.price * quantity).toFixed(2)}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => removeFromCart(book.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
