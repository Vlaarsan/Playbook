import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MyBooksScreen from "./screens/MyBooksScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BooksProvider } from "./contexts/BooksContext";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <BooksProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Accueil") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Mes livres") {
                iconName = focused ? "book" : "book-outline";
              }

              // Retourner l'icône appropriée
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "#fff",
            tabBarStyle: {
              backgroundColor: "black", // Fond noir pour la barre de navigation
              borderTopWidth: 0, // Supprime le trait en haut de la barre de navigation
              elevation: 0, // Supprime l'ombre sous Android
              shadowOpacity: 0, // Supprime l'ombre sous iOS
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Mes livres" component={MyBooksScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BooksProvider>
  );
}
