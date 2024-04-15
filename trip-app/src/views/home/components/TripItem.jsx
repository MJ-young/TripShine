import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import formatDate from "@/utils/formatDate";
import { View } from "react-native";

const TripItem = ({ trip }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const onPress = () => {
    navigation.push("Detail", trip);
  };

  return (
    <Card onPress={onPress} style={styles.card}>
      <Card.Cover source={{ uri: trip.images[0] }} style={styles.image} />
      <Card.Content>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.date}>{formatDate(trip.createTime)}</Text>
        <View style={styles.authorContainer}>
          <Image
            source={{ uri: trip.avatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.authorName}>{trip.username}</Text>
        </View>
      </Card.Content>
    </Card>
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    marginVertical: 4,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
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
