
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Book, ClipboardList } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Books", href: "/", icon: <Book size={18} /> },
    { title: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
    { title: "Orders", href: "/orders", icon: <ClipboardList size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-book-primary flex items-center gap-2">
            <Book size={24} />
            <span className="hidden sm:inline-block">BookShelf</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-1 text-sm transition-colors hover:text-book-primary",
                location.pathname === link.href
                  ? "font-medium text-book-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.icon}
              {link.title}
              {link.href === "/cart" && totalItems > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {totalItems}
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Link to="/cart" className="mr-4 relative">
            <Button variant="ghost" size="icon" asChild>
              <div>
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </div>
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 text-sm py-2 transition-colors hover:text-book-primary",
                      location.pathname === link.href
                        ? "font-medium text-book-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.title}
                    {link.href === "/cart" && totalItems > 0 && (
                      <Badge variant="secondary">{totalItems}</Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
