
import React from "react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "@/lib/api";

const Cart: React.FC = () => {
  const { cartItems, totalItems, totalPrice, clearCart, addOrder } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      
      // In a real app, we would send this to the API and get a response
      // For now, we'll simulate a successful order and create a new order object
      
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          bookId: item.book.id,
          title: item.book.title,
          quantity: item.quantity,
          price: item.book.price
        })),
        total: totalPrice
      };
      
      // API call would go here in a real app
      await placeOrder(orderData);
      
      // Create local order record
      const newOrder = {
        id: `order-${Date.now()}`,
        items: [...cartItems],
        total: totalPrice,
        date: new Date().toISOString()
      };
      
      // Add to order history
      addOrder(newOrder);
      
      // Clear the cart
      clearCart();
      
      // Show success message
      toast.success("Order placed successfully!");
      
      // Navigate to orders page
      navigate("/orders");
      
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8 text-book-primary" />
        Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.book.id} item={item} />
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handlePlaceOrder}
                >
                  Place Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<ShoppingCart size={48} />}
          title="Your cart is empty"
          description="Browse our catalog and add some books to your cart."
          action={
            <Button onClick={() => navigate("/")} className="mt-4">
              Browse Books
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Cart;
