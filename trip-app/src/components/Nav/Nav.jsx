import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "@views/home/index";
import User from "@views/user/index";
import CardPublish from "@views/publish/index";
import CardDetail from "@views/card/CardDetail";
import Login from "@views/login/login";
import Register from "@views/login/register";

import icon_tab_publish from "@/assets/icon_tab_publish.png";
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
        }}
      ></ListStack.Screen>
      <ListStack.Screen name="Detail" component={CardDetail}></ListStack.Screen>
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
        }}
      ></ListStack.Screen>
      <ListStack.Screen
        name="TripDetail"
        component={CardDetail}
      ></ListStack.Screen>
    </ListStack.Navigator>
  );
}

export default function Nav() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#222222" }}>
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
          title: "发布",
          tabBarIcon: ({ size }) => (
            <Image
              source={icon_tab_publish}
              style={{ width: size, height: size }}
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
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          title: "登录",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
