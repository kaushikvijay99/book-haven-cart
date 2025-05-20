
import { Book, BookResponse } from "./types";

const API_BASE_URL = "https://books-soa-catalogue.onrender.com/api";

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/catalog/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all books:", error);
    return [];
  }
};

export const searchBooksByTitle = async (title: string): Promise<BookResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/catalog/check?title=${encodeURIComponent(title)}`);
    if (!response.ok) {
      throw new Error('Failed to search books');
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching books:", error);
    return { exists: false, books: [] };
  }
};

export const placeOrder = async (orderData: any): Promise<any> => {
  try {
    // This is a mock endpoint as specified in the requirements
    const response = await fetch('https://order-service-soa.example.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to place order');
    }
    
    // This would normally return the created order
    // Since we're mocking, we'll just return a success response
    return {
      success: true,
      orderId: `order-${Date.now()}`,
      message: 'Order placed successfully',
    };
  } catch (error) {
    console.error("Error placing order:", error);
    // In a real app, we would handle this error properly
    return { success: false, message: 'Failed to place order' };
  }
};
