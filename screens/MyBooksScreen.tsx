import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { BooksContext } from "../contexts/BooksContext";
import { MaterialIcons } from "@expo/vector-icons"; // Assurez-vous d'avoir installé @expo/vector-icons
import ModalBookInfos from "../modals/ModalBookInfos"; // Import du composant ModalBookInfos

const MyBooksScreen = () => {
  const { books, removeBook } = useContext(BooksContext);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleBookPress = (book: any) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false} // Masquer la barre de défilement verticale
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const book = item;

          return (
            <View style={styles.bookItem}>
              <Image
                style={styles.cover}
                source={{
                  uri:
                    book.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x196.png?text=No+Image",
                }}
              />
              <View style={styles.bookDetails}>
                <TouchableOpacity onPress={() => handleBookPress(book)}>
                  <Text style={styles.title}>{book.title}</Text>
                  <Text style={styles.author}>
                      {book.authors?.join(", ")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeBook(book.id)}
                >
                  <MaterialIcons name="delete" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {selectedBook && (
        <ModalBookInfos
          visible={modalVisible}
          onClose={closeModal}
          book={selectedBook}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 50,
  },
  bookItem: {
    zIndex:99,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cover: {
    width: 85,
    height: 120,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  author: {
    fontSize: 16,
    color: "#555",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  removeButton: {
    marginTop: 25,
    alignItems: "center",
    backgroundColor: "#d9534f",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
  },
});

export default MyBooksScreen;
