// Home.js
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import WaterfallList from "./components/WaterfallList";
import { getAllPassTrips, searchTrips } from "@/api/trip";
import {
  Dialog,
  Portal,
  Button,
  Paragraph,
  Searchbar,
} from "react-native-paper";

const Home = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState("");

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

  const handleSearch = async () => {
    if (!keyword) {
      return fetchInitialTrips();
    }
    try {
      const response = await searchTrips({ keyword });
      if (response.data.length === 0) {
        setVisible(true); // 打开对话框
        setKeyword(""); // 清空搜索关键词
      } else {
        setTrips(response.data);
      }
    } catch (error) {
      console.error("Error searching trips:", error);
      setTrips([]); // 在发生错误时清空列表
    }
  };

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Searchbar
          placeholder="搜索感兴趣的内容"
          onChangeText={setKeyword}
          value={keyword}
          onIconPress={handleSearch}
        />
      </View>

      <WaterfallList trips={trips} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>搜索结果</Dialog.Title>
          <Dialog.Content>
            <Paragraph>搜索结果为空，请尝试其他关键词。</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>好的</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  searchbar: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});

export default Home;
