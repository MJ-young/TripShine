// Home.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "./components/SearchBar";
import WaterfallList from "./components/WaterfallList";
import { getAllPassTrips, searchTrips } from "@/api/trip";

const Home = ({ navigation }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchInitialTrips();
  }, []);

  const fetchInitialTrips = async () => {
    try {
      const response = await getAllPassTrips();
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching initial trips:", error);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      fetchInitialTrips(); // Fetch all trips if keyword is empty
      return;
    }
    try {
      const response = await searchTrips(keyword);
      setTrips(response.data);
    } catch (error) {
      console.error("Error searching trips:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <WaterfallList trips={trips} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
