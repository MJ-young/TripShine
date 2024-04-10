import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import icon_search from "@/assets/icon_search.png";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <View style={styles.titleLayout}>
      <View style={styles.searchBox}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => onSearch(keyword)}
        >
          <Image source={icon_search} style={styles.icon}></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          placeholderTextColor="#aaa"
          placeholder="搜索感兴趣的内容"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => onSearch(keyword)}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  titleLayout: {
    width: "100%",
    marginBottom: 5,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 7,
    marginRight: 7,
    width: 28,
    height: 28,
  },
  searchBox: {
    flex: 1,
    height: 35,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    flexDirection: "row",
    backgroundColor: "#E6E7E8",
    borderRadius: 5,
  },
  searchButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "left",
  },
  inputText: {
    alignSelf: "center",
    marginTop: 0,
    flex: 1,
    height: 15,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
    lineHeight: 30,
    textAlignVertical: "center",
    textDecorationLine: "none",
  },
});
