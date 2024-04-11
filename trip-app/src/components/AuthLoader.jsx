import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthLoader = () => {
  const isLoggedIn = useSelector((state) => state.user.token);
  const navigation = useNavigation(); // 确保这里没有错误

  useEffect(() => {
    if (isLoggedIn) {
      //   navigation.replace("Main"); // 确保这里的 "Main" 与 Stack.Screen 的 name 匹配
      navigation.navigate("Main");
    }
  }, [isLoggedIn, navigation]);

  return null;
};

export default AuthLoader;
