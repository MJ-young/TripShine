import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Share from 'react-native-share';

const { width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: "南京真美",
    content:
      "南京真美南京真美南京真美南京真美南京真美南京真美南京真美南京真美南京真美",
    images: [
      "https://img2.baidu.com/it/u=1028011339,1319212411&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
      "https://img0.baidu.com/it/u=1500348864,197010116&fm=253&fmt=auto?w=1422&h=800",
    ],
    authorName: "小V",
    authorAvatar:
      "https://p1.bdxiguaimg.com/img/mosaic-legacy/98a3000db0cf08d5d3c4~0x0.image",
    createdAt: "2024-01-03",
  },
  {
    id: 2,
    title: "三天两碗旅游攻略",
    content:
      "三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略",
    images: [
      "https://img0.baidu.com/it/u=2568912107,2529303106&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      "https://img0.baidu.com/it/u=1500348864,197010116&fm=253&fmt=auto?w=1422&h=800",
    ],
    authorName: "布尔",
    authorAvatar:
      "https://t11.baidu.com/it/u=1184198955,213098737&fm=30&app=106&f=JPEG?w=640&h=640&s=2BA67523048BF2A75D2C65F30300E022",
    createdAt: "2023-01-03",
  },
  {
    id: 3,
    title: "三天两碗旅游攻略",
    content:
      "三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略",
    images: [
      "https://img0.baidu.com/it/u=2568912107,2529303106&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      "https://img0.baidu.com/it/u=1500348864,197010116&fm=253&fmt=auto?w=1422&h=800",
    ],
    authorName: "布尔",
    authorAvatar:
      "https://t11.baidu.com/it/u=1184198955,213098737&fm=30&app=106&f=JPEG?w=640&h=640&s=2BA67523048BF2A75D2C65F30300E022",
    createdAt: "2022-01-03",
  },
  {
    id: 4,
    title: "三天两碗旅游攻略",
    content:
      "三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略",
    images: [
      "https://img0.baidu.com/it/u=2568912107,2529303106&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      "https://img0.baidu.com/it/u=1500348864,197010116&fm=253&fmt=auto?w=1422&h=800",
    ],
    authorName: "布尔",
    authorAvatar:
      "https://t11.baidu.com/it/u=1184198955,213098737&fm=30&app=106&f=JPEG?w=640&h=640&s=2BA67523048BF2A75D2C65F30300E022",
    createdAt: "2021-01-03",
  },
  {
    id: 5,
    title: "三天两碗旅游攻略",
    content:
      "三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略三天两碗旅游攻略",
    images: [
      "https://img0.baidu.com/it/u=2568912107,2529303106&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      "https://img0.baidu.com/it/u=1500348864,197010116&fm=253&fmt=auto?w=1422&h=800",
    ],
    authorName: "布尔",
    authorAvatar:
      "https://t11.baidu.com/it/u=1184198955,213098737&fm=30&app=106&f=JPEG?w=640&h=640&s=2BA67523048BF2A75D2C65F30300E022",
    createdAt: "2020-01-03",
  },
  // Add more data as needed
];

const Card = ({ title, image, authorName, authorAvatar, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <View style={styles.authorContainer}>
      <Image source={{ uri: authorAvatar }} style={styles.avatar} />
      <Text style={styles.authorName}>{authorName}</Text>
    </View>
  </TouchableOpacity>
);

const WaterfallList = () => {
  const navigation = useNavigation();
  const handleCardPress = (item) => {
    console.log(item);
    navigation.push("Detail", item);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            image={item.images[0]}
            authorName={item.authorName}
            authorAvatar={item.authorAvatar}
            onPress={() => handleCardPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: (width - 32) / 2,
  },
  image: {
    width: "100%",
    height: width * 0.5 - 24, // 卡片高度自适应屏幕宽度
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 8,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
  },
});

export default WaterfallList;
