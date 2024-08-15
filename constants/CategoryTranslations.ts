export const categoryTranslations = {
    "Fiction": "Fiction",
    "Non-Fiction": "Non-Fiction",
    "Science Fiction": "Science-fiction",
    "Fantasy": "Fantasy",
    "Biography": "Biographie",
    "History": "Histoire",
    "Children's": "Enfants",
    "Juvenile Fiction" : "Fiction adolescent",
    "Young Adult Fiction" : "Fiction Jeune Adulte"
    // Ajoute d'autres catégories ici
  };

  export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  