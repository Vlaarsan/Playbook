// BooksContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
  id: string;
  title: string;
  // Ajoute d'autres propriétés selon le besoin
}

interface BooksContextType {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksString = await AsyncStorage.getItem('userBooks');
        if (booksString) {
          setBooks(JSON.parse(booksString));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des livres : ", error);
      }
    };

    loadBooks();
  }, []);

  const saveBooks = async (books: Book[]) => {
    try {
      await AsyncStorage.setItem('userBooks', JSON.stringify(books));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des livres : ", error);
    }
  };

  const addBook = (book: Book) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, book];
      saveBooks(updatedBooks);
      return updatedBooks;
    });
  };

  const removeBook = (bookId: string) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter(book => book.id !== bookId);
      saveBooks(updatedBooks);
      return updatedBooks;
    });
  };

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
