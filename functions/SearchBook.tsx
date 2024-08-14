import React, { useState } from "react";
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

const SearchBook = () => {
  const [query, setQuery] = useState<string>(""); // État pour stocker la recherche
  const [books, setBooks] = useState<any[]>([]); // État pour stocker les résultats de recherche
  const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un livre"
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.buttonContainer}>
        <Button title="Chercher" onPress={searchBooks} />
      </View>
      {loading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const book = item.volumeInfo;
            return (
              <View style={styles.bookItem}>
                <TouchableOpacity>
                  <Image
                    style={styles.cover}
                    source={{
                      uri:
                        book.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x196.png?text=No+Image",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.bookDetails}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.text}>
                      {book.averageRating ? `⭐ ${book.averageRating}` : ""}
                    </Text>
                    <Text style={styles.text}>{book.categories}</Text>
                    <Text style={styles.author}>
                      {book.authors?.join(", ")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default SearchBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 25,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
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
    width: 85,
    height: 120,
    marginRight: 15,
    borderRadius: 2,
  },
  bookDetails: {
    flex: 1,
    flexShrink: 1,
    maxWidth: "88%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  author: {
    fontSize: 16,
    color: "#555",
  },
  text: {
    marginBottom: 5,
  },
});
