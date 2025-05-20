
import React, { useEffect, useState } from "react";
import { getAllBooks, searchBooksByTitle } from "@/lib/api";
import { Book as BookType } from "@/lib/types";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import { Loader2, Book, BookOpen } from "lucide-react";

const Index: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      setSearching(true);
      const data = await getAllBooks();
      setBooks(data);
      setSearching(false);
      return;
    }
    
    setSearching(true);
    const response = await searchBooksByTitle(query);
    setBooks(response.exists ? response.books : []);
    setSearching(false);
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Book className="h-8 w-8 text-book-primary" />
          Book Catalog
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-book-primary" />
        </div>
      ) : books.length > 0 ? (
        <div>
          {searchQuery && (
            <p className="mb-4 text-muted-foreground">
              Showing {books.length} result{books.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen size={48} />}
          title={searchQuery ? "No books found" : "No books available"}
          description={
            searchQuery
              ? `We couldn't find any books matching "${searchQuery}"`
              : "There are no books in the catalog at the moment."
          }
        />
      )}

      {searching && (
        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg">
          <Loader2 className="h-6 w-6 animate-spin text-book-primary" />
        </div>
      )}
    </div>
  );
};

export default Index;
