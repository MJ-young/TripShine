// UserTrips.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Empty from "@/components/Empty";
import icon_no_list from "@/assets/icon_no_list.png";

const EMPTY_CONFIG = [
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
];

const UserTrips = ({ trips, tabIndex }) => {
  if (!trips?.length) {
    const config = EMPTY_CONFIG[tabIndex];
    return <Empty icon={config.icon} tips={config.tips} />;
  }

  return (
    <View>
      {trips.map((trip, index) => (
        <View key={`${trip._id}`} style={styles.listItem}>
          <Image style={styles.itemImage} source={{ uri: trip.images[0] }} />
          <View style={styles.itemContent}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.itemTitle}
            >
              {trip.title}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.itemText}
            >
              {trip.content}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default UserTrips;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: "#555",
  },
});
