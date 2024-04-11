import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "@views/home/index";
import User from "@views/user/index";
import CardPublish from "@views/publish/index";
import TripForm from "@/views/trip/tripFrom";
import TripDetail from "@/views/trip/tripDetail";

const Tab = createBottomTabNavigator();
const ListStack = createNativeStackNavigator();

function ListStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen
        name="List"
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
        }}
      ></ListStack.Screen>
      <ListStack.Screen name="Detail" component={TripDetail}></ListStack.Screen>
    </ListStack.Navigator>
  );
}

function UserStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen
        name="UserPage"
        component={User}
        options={{
          title: "User",
          headerShown: false,
        }}
      ></ListStack.Screen>
      <ListStack.Screen name="TripForm" component={TripForm}></ListStack.Screen>
    </ListStack.Navigator>
  );
}

export default function Nav() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#0A83F9" }}>
      <Tab.Screen
        name="Home"
        component={ListStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CardPublish"
        component={CardPublish}
        options={{
          title: "Publish",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-box-multiple"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
