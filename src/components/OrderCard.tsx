
import React from "react";
import { Order } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formattedDate = new Date(order.date).toLocaleString();
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Order #{order.id.substring(0, 8)}</CardTitle>
          <Badge variant="outline">{formattedDate}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.book.id} className="flex justify-between items-center text-sm">
              <span className="flex-grow">
                {item.book.title} <span className="text-muted-foreground">({item.quantity}x)</span>
              </span>
              <span className="font-medium">${(item.book.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <Separator className="my-3" />
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-muted-foreground text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
