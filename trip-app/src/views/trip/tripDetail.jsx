import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Swiper from "react-native-swiper";

const TripDetail = ({ route }) => {
  const { title, content, username, avatar, images, createTime } = route.params;

  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }}>
      {/* <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 500,
            }}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        ))}
      </Slider> */}
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
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar src={avatar} sx={{ width: 40, height: 40, mr: 1 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" component="div">
              {username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(createTime).toLocaleDateString()}
            </Typography>
          </Box>
          <IconButton
            onClick={() => console.log("Share functionality to be implemented")}
          >
            <ShareIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1">{content}</Typography>
      </Box>
    </Box>
  );
};

export default TripDetail;

const styles = {
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
};
