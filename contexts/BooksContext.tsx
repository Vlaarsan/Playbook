// booksContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Définissez une interface pour les informations du livre
interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  previewLink?: string;
  imageLinks?: {
    thumbnail?: string;
  };
}

// Définissez l'interface du contexte
interface BooksContextType {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  isBookInFavorites: (id: string) => boolean;
}

// Créez le contexte avec des valeurs par défaut
const BooksContext = createContext<BooksContextType>({
  books: [],
  addBook: () => {},
  removeBook: () => {},
  isBookInFavorites: () => false,
});

const BOOKS_STORAGE_KEY = '@books';

// Créez le fournisseur du contexte
const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  // Fonction pour charger les livres depuis AsyncStorage
  const loadBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des livres depuis AsyncStorage:', error);
    }
  };

  // Fonction pour sauvegarder les livres dans AsyncStorage
  const saveBooks = async (books: Book[]) => {
    try {
      await AsyncStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des livres dans AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const addBook = (book: Book) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, book];
      saveBooks(updatedBooks);
      return updatedBooks;
    });
  };

  const removeBook = (id: string) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce livre ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setBooks((prevBooks) => {
              const updatedBooks = prevBooks.filter((book) => book.id !== id);
              saveBooks(updatedBooks);
              return updatedBooks;
            });
          }
        }
      ],
      { cancelable: true }
    );
  };

  const isBookInFavorites = (id: string) => {
    return books.some((book) => book.id === id);
  };

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook, isBookInFavorites }}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };
