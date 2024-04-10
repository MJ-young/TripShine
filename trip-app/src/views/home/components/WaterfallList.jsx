// WaterfallList.js
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import TripItem from "./TripItem";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;

const WaterfallList = ({ trips }) => {
  const [columns, setColumns] = useState(
    Array.from({ length: COLUMN_COUNT }, () => [])
  );

  useEffect(() => {
    const distributeTrips = () => {
      const newColumns = Array.from({ length: COLUMN_COUNT }, () => []);
      trips.forEach((trip, index) => {
        const columnIndex = index % COLUMN_COUNT;
        newColumns[columnIndex].push(trip);
      });
      setColumns(newColumns);
    };

    if (trips.length) {
      distributeTrips();
    }
  }, [trips]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    columnsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      width: width / COLUMN_COUNT - 10,
      marginLeft: 5,
      marginRight: 5,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.columnsContainer}>
        {columns.map((column, index) => (
          <View key={index} style={styles.column}>
            {column.map((item) => (
              <TripItem key={item._id} trip={item} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WaterfallList;
