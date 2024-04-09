import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAllPassTrips } from "../../api/allTrip";


// import Share from 'react-native-share';

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;


const Card = ({ title, image, authorName, authorAvatar, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <View style={styles.authorContainer}>
      <Image source={{ uri: authorAvatar }} style={styles.avatar} />
      <Text style={styles.authorName}>{authorName}</Text>
    </View>
  </TouchableOpacity>

);

const WaterfallList = () => {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [columns, setColumns] = useState(Array.from({ length: COLUMN_COUNT }, () => []));

  const loadData = async () => {
    getAllPassTrips()
      .then((response) => {
        setTrips(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    arrangeItems();
  }, [trips]); // 当trips发生变化时重新调用arrangeItems

  const arrangeItems = () => {
    // const newTrip = [...trips];

    const newColumns = Array.from({ length: COLUMN_COUNT }, () => []);
    let columnHeights = Array.from({ length: COLUMN_COUNT }, () => 0);

    trips.forEach((item, index) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[minHeightIndex].push(item);
      const imageHeight = width / 2; // Assuming images have equal width and height for simplicity
      columnHeights[minHeightIndex] += imageHeight; // Update the column height
    });

    setColumns(newColumns);
  };

  const handleCardPress = (item) => {
    console.log(item);
    navigation.push("Detail", item);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.columnsContainer}>
        {columns.map((column, index) => (
          <View key={index} style={styles.column}>
            {column.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                image={item.images[0]}
                authorName={item.username}
                authorAvatar={item.avatar}
                onPress={() => handleCardPress(item)}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 170
  },
  image: {
    width: "100%",
    height: width / 2, // Assuming images have equal width and height for simplicity
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
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

export default WaterfallList;