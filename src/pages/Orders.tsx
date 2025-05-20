
import React from "react";
import { useCart } from "@/context/CartContext";
import OrderCard from "@/components/OrderCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Orders: React.FC = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ClipboardList className="h-8 w-8 text-book-primary" />
        Your Orders
      </h1>

      {orders.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<ClipboardList size={48} />}
          title="No orders yet"
          description="Your order history will appear here once you make a purchase."
          action={
            <Button onClick={() => navigate("/")} className="mt-4">
              Start Shopping
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Orders;
