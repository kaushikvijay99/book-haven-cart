
import React from "react";
import { Book } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">{book.title}</h3>
          {book.in_stock ? (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
              Out of Stock
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">by {book.author}</p>
        <div className="mt-4">
          <p className="text-lg font-bold">${book.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button 
          className="w-full" 
          onClick={() => addToCart(book)}
          disabled={!book.in_stock}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
