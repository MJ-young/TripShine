import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import icon_share from "@/assets/icon/icon_share.png";
// import Share from "react-native-share";

const TripDetail = ({ route }) => {
  const { title, content, username, avatar, images, createTime } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);

  const onShare = async () => {
    // const options = {
    //   title: "分享",
    //   message: "看看这个超棒的内容：",
    //   url: "https://example.com",
    //   type: "image/png", // 如果分享图片
    // };
    // try {
    //   const result = await Share.open(options);
    //   if (result.success) {
    //     console.log("成功分享！");
    //   }
    // } catch (error) {
    //   console.error("分享失败：" + error.message);
    // }
  };

  const onIndexChanged = (index) => {
    setActiveIndex(index);
  };
  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.swiper}
          loop={false}
          showsPagination={true}
          dotColor={"#CCCCCC"}
          activeDotColor={"green"}
          paginationStyle={styles.paginationStyle}
          showsButtons
          onIndexChanged={onIndexChanged}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.authorTextContainer}>
            <Text style={styles.authorName}>{username}</Text>
            <Text style={styles.createdAt}>{createTime.slice(0, 10)}</Text>
          </View>
          <TouchableOpacity onPress={onShare}>
            <Image source={icon_share} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  swiperContainer: {
    flex: 1,
  },
  swiper: {
    flex: 1,
  },
  paginationStyle: {
    bottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 10,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorTextContainer: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 12,
    color: "#999999",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  shareIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default TripDetail;
