import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import ModalBookInfos from "../modals/ModalBookInfos";
import { BooksContext } from "../contexts/BooksContext";



const SearchBook = () => {
  const [query, setQuery] = useState<string>(""); // État pour stocker la recherche
  const [books, setBooks] = useState<any[]>([]); // État pour stocker les résultats de recherche
  const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement
  const { addBook, removeBook, isBookInFavorites } = useContext(BooksContext); // Utilisation du contexte
  const [selectedBook, setSelectedBook] = useState<any>(null); // État pour stocker le livre sélectionné
  const [modalVisible, setModalVisible] = useState<boolean>(false); // État pour contrôler la visibilité de la modal

  // Fonction pour effectuer la recherche
  const searchBooks = async () => {
    setLoading(true); // Début du chargement
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();
      setBooks(data.items || []); // Mettre à jour l'état avec les résultats
    } catch (error) {
      console.error("Erreur lors de la recherche de livres : ", error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Fonction pour gérer l'ajout ou la suppression d'un livre
  const handleToggleBook = (book: any) => {
    const bookDetails = {
      id: book.id,
      title: book.volumeInfo.title || "",
      subtitle: book.volumeInfo.subtitle || "",
      authors: book.volumeInfo.authors || [],
      publishedDate: book.volumeInfo.publishedDate || "",
      description: book.volumeInfo.description || "",
      pageCount: book.volumeInfo.pageCount || 0,
      categories: book.volumeInfo.categories || [],
      averageRating: book.volumeInfo.averageRating || 0,
      ratingsCount: book.volumeInfo.ratingsCount || 0,
      previewLink: book.volumeInfo.previewLink || "",
      imageLinks: book.volumeInfo.imageLinks || {},
    };

    if (isBookInFavorites(book.id)) {
      removeBook(book.id);
    } else {
      addBook(bookDetails);
    }
  };

  // Fonction pour ouvrir la modal avec les détails du livre sélectionné
  const openModal = (book: any) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un livre"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchBooks}
        placeholderTextColor={"#e9e9e9"}
      />
      <View style={styles.buttonContainer}>
      </View>
      {loading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false} // Masquer la barre de défilement verticale
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const book = item.volumeInfo;
            return (
              <View style={styles.bookItem}>
                <TouchableOpacity onPress={() => openModal(item)}>
                  <Image
                    style={styles.cover}
                    source={{
                      uri:
                        book.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x196.png?text=No+Image",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal(item)}>
                  <View style={styles.bookDetails}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.author}>
                      {book.authors?.join(", ")}
                    </Text>
                    <Text style={styles.text}>{book.categories}</Text>
                    <Text style={styles.text}>
                      {book.averageRating ? `⭐ ${book.averageRating}` : ""}
                    </Text>
                    <TouchableOpacity onPress={() => handleToggleBook(item)}>
                      <Text style={styles.addButton}>
                        {isBookInFavorites(item.id) ? "Enlever" : "+ Ajouter"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
      {selectedBook && (
        <ModalBookInfos
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          book={selectedBook}
        />
      )}
    </View>
  );
};

export default SearchBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    width: "100%",
    marginTop: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    height: 40,
    borderColor: "#000", // Contour noir
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius:10,
    textAlign: "center", // Écriture centrée
    color: "#fff", // Texte en blanc
  },
  loading: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
  },
  bookItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 15,
    
  },
  cover: {
    width: 100,
    height: 160,
    marginRight: 15,
    borderRadius: 5,
  },
  bookDetails: {
    flex: 1,
    flexShrink: 1,
    maxWidth: "85%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap",
    marginBottom:5,
  },
  author: {
    fontSize: 14,
    color: "#e9e9e9",
    marginBottom: 20,
  },
  text: {
    marginBottom: 5,
    fontSize: 14,
  },
  addButton: {
    marginTop: 15,
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
});
