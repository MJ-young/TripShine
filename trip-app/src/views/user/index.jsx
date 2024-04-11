// User.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import UserInfo from "./components/UserInfo";
import UserTrip from "./components/userTrip";
import { getUserTrips } from "@/api/trip";
import icon_mine_bg from "@/assets/icon_mine_bg.jpg";
import { UserTitle } from "./components/UserTitle";

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [trips, setTrips] = useState({ pass: [], wait: [], reject: [] });

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const passTrips = await getUserTrips({ status: "pass" });
        const waitTrips = await getUserTrips({ status: "wait" });
        const rejectTrips = await getUserTrips({ status: "reject" });
        setTrips({ pass: passTrips, wait: waitTrips, reject: rejectTrips });
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    loadTrips();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={<RefreshControl onRefresh={() => {}} />}
    >
      <UserTitle />
      <Image style={[styles.bgImg, { height: 160 }]} source={icon_mine_bg} />
      <UserInfo />
      {/* <UserTabs tabIndex={tabIndex} setTabIndex={setTabIndex} /> */}
      {/* <UserTrips trips={trips[tabIndex]} tabIndex={tabIndex} /> */}
      <UserTrip />
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  bgImg: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
