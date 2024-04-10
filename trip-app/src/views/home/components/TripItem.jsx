import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TripItem = ({ trip }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.push("Detail", trip);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: trip.images[0] }} style={styles.image} />
      <Text style={styles.title}>{trip.title}</Text>
      <View style={styles.authorContainer}>
        <Image
          source={{ uri: trip.avatar }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={styles.authorName}>{trip.username}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripItem;

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 170, // Assuming images have equal width and height for simplicity
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 8,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
  },
});
