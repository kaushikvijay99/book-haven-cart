
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  in_stock: boolean;
  created_at: string;
}

export interface BookResponse {
  exists: boolean;
  books: Book[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}
