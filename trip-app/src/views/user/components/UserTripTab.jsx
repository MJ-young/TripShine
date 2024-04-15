import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Divider, List, Button } from "react-native-paper";
import { getUserTrips } from "@/api/trip";
import formatDate from "@/utils/formatDate";

const UserTripTab = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [diaries, setDiaries] = useState({ pass: [], wait: [], reject: [] });
  const [loading, setLoading] = useState(false);
  const statuses = ["pass", "wait", "reject"];

  const loadDiaries = async (status) => {
    setLoading(true);
    getUserTrips({ status })
      .then((response) => {
        if (response.data) {
          setDiaries((prev) => ({ ...prev, [status]: response.data }));
        }
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadDiaries(statuses[index]);
    }, [index])
  );

  const handleItemClick = (diary) => {
    navigation.push("TripForm", diary);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {statuses.map((status, idx) => (
          <Button
            key={status}
            mode={index === idx ? "contained" : "outlined"}
            onPress={() => setIndex(idx)}
          >
            {status}
          </Button>
        ))}
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator animating={true} style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={diaries[statuses[index]]}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <List.Item
                title={item.title}
                description={`创建时间: ${formatDate(item.createTime)}`}
                left={() => (
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{ width: 60, height: 60 }}
                  />
                )}
                onPress={() => handleItemClick(item)}
                right={() =>
                  index === 2 && (
                    <Text style={{ color: "red" }}>{item.rejectReason}</Text>
                  )
                }
              />
            )}
            ItemSeparatorComponent={() => <Divider />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  listContainer: {
    flex: 1,
  },
});

export default UserTripTab;
