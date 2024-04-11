// Home.js
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import SearchBar from "./components/SearchBar";
import WaterfallList from "./components/WaterfallList";
import { getAllPassTrips, searchTrips } from "@/api/trip";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const Home = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchInitialTrips();
    }, [])
  );

  const fetchInitialTrips = async () => {
    try {
      const response = await getAllPassTrips();
      setTrips(response.data);
    } catch (error) {
      // console.error("Error fetching initial trips:", error);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword) {
      return fetchInitialTrips();
    }
    try {
      const response = await searchTrips({ keyword });
      if (response.data.length === 0) {
        setOpenDialog(true); // 打开对话框
      } else {
        setTrips(response.data);
      }
    } catch (error) {
      console.error("Error searching trips:", error);
      setTrips([]); // 在发生错误时清空列表
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <WaterfallList trips={trips} />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"搜索结果"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            搜索结果为空，请尝试其他关键词。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            好的
          </Button>
        </DialogActions>
      </Dialog>
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
