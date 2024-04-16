import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import icon_share from "@/assets/icon/icon_share.png";
// import Share from "react-native-share";

const TripDetail = ({ route }) => {
  const { title, content, username, avatar, images, createTime } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    new Array(images.length).fill(false)
  );

  const onShare = async () => {
    // Placeholder for sharing logic
  };

  const onIndexChanged = (index) => {
    setActiveIndex(index);
  };

  const handleImageLoad = (index) => {
    const updatedLoaded = [...imageLoaded];
    updatedLoaded[index] = true;
    setImageLoaded(updatedLoaded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          loop={true}
          autoplay={false}
          showsPagination={true}
          dotColor={"#CCCCCC"}
          activeDotColor={"green"}
          paginationStyle={styles.paginationStyle}
          showsButtons
          onIndexChanged={onIndexChanged}
        >
          {images.map((image, index) => (
            // <View key={index}>
            //   <Image
            //     source={{ uri: image }}
            //     style={styles.image}
            //     onLoad={() => handleImageLoad(index)}
            //   />
            //   {!imageLoaded[index] && (
            //     <View style={styles.loadingContainer}>
            //       <ActivityIndicator size="large" color="#0000ff" />
            //     </View>
            //   )}
            // </View>
            <View key={index} style={{ flex: 1, justifyContent: "center" }}>
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
                // onLoad={() => console.log(`Image ${index} loaded`)}
              />
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
    height: 300, // 临时设置一个高度
    width: "100%",
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Light white background
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
