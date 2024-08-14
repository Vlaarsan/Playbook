import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";

import {
  categoryTranslations,
  formatDate,
} from "../constants/CategoryTranslations";

interface ModalBookInfosProps {
  visible: boolean;
  onClose: () => void;
  book: any;
}

const ModalBookInfos: React.FC<ModalBookInfosProps> = ({
  visible,
  onClose,
  book,
}) => {
  if (!book) {
    return null;
  }

  const {
    title = "",
    subtitle = "",
    authors = [],
    publishedDate = "",
    description = "",
    pageCount = "",
    categories = [],
    averageRating = "",
    ratingsCount = 0,
    previewLink = "",
    imageLinks = {},
  } = book.volumeInfo || book

  // Traduire les catégories
  const translatedCategories = categories.map(
    (category: string) => categoryTranslations[category] || category
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {imageLinks.thumbnail && (
              <Image
                style={styles.cover}
                source={{
                  uri:
                    imageLinks.thumbnail ||
                    "https://via.placeholder.com/150x225.png?text=No+Image",
                }}
              />
            )}
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {authors.length > 0 && (
              <Text style={styles.author}>{`🖊️ ${authors.join(", ")}`}</Text>
            )}

            {publishedDate ? (
              <Text style={styles.publishedDate}>{`📅 ${formatDate(
                publishedDate
              )}`}</Text>
            ) : null}
            {averageRating ? (
              <Text style={styles.rating}>
                {`⭐  ${averageRating} (${ratingsCount} votes)`}
              </Text>
            ) : null}
            {translatedCategories.length > 0 && (
              <Text style={styles.categories}>{`📚  ${translatedCategories.join(
                ", "
              )}`}</Text>
            )}
            {pageCount ? (
              <Text style={styles.pageCount}>{`📚  ${pageCount} Pages`}</Text>
            ) : null}
            {description ? (
              <Text style={styles.description}>{description}</Text>
            ) : null}

            {previewLink ? (
              <TouchableOpacity onPress={() => Linking.openURL(previewLink)}>
                <Text style={styles.link}>{`🔗 Commencer la lecture`}</Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <Button title="Fermer" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBookInfos;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Couleur de fond légèrement plus sombre
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#e9e9e9",
    padding: 35,
    shadowColor: "#000", // Ombre pour effet de profondeur
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Pour Android
    alignItems: "center", // Centrer le contenu
  },
  cover: {
    width: 200,
    height: 320,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10, // Coins arrondis pour l'image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#000", // Couleur de texte plus foncée pour le titre
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#666", // Couleur subtile pour le sous-titre
  },
  author: {
    fontSize: 18,
    marginBottom: 15,
    color: "#444", // Couleur légèrement plus claire pour les auteurs
    fontWeight: "bold",
  },
  publishedDate: {
    fontSize: 18,
    marginBottom: 15,
    color: "#000",
  },
  description: {
    fontSize: 16,
    marginVertical: 20,
    lineHeight: 24, // Espacement des lignes pour une meilleure lisibilité
    color: "#000", // Couleur de texte plus claire pour la description
  },
  rating: {
    fontSize: 16,
    marginBottom: 12,
    color: "#f39c12", // Couleur dorée pour les étoiles de notation
  },
  pageCount: {
    fontSize: 16,
    marginBottom: 12,
    color: "#000",
  },
  categories: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  link: {
    fontSize: 16,
    marginBottom: 15,
    color: "#3498db", // Couleur bleue pour les liens
    textDecorationLine: "underline", // Souligner les liens
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
