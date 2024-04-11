import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { updateAvatar } from "@/api/user";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/store/actions";
import { getUserCookie } from "@/utils/auth";

const initUserInfo = {
  username: "Guest",
  avatar:
    "http://tripshine.oss-cn-shanghai.aliyuncs.com/public/images/129365f628812999703915e5b81182b2.jpg",
};

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [userInfo, setUserInfo] = useState(initUserInfo);

  useEffect(() => {
    // 当用户信息发生变化时，更新用户信息
    // if (user) {
    //   setUserInfo(user);
    // } else {
    const userInfo = getUserCookie();
    setUserInfo(userInfo);
    console.log("userInfo:", userInfo);
    // }
  }, [user]);

  const handleAvatarChange = () => {
    fileInputRef.current.click(); // 触发文件选择
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      updateAvatar(formData)
        .then((response) => {
          dispatch(updateUser({ avatar: response.url }));
          setUserInfo((prev) => ({ ...prev, avatar: response.url }));
        })
        .catch((error) => {
          console.error("Error updating avatar:", error);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          // alt="User Avatar"
          src={userInfo.avatar}
          sx={{ width: 96, height: 96 }}
        />
        <Button
          sx={{
            position: "absolute",
            bottom: 0,
            right: -10,
            minWidth: "auto",
            padding: "6px",
            borderRadius: "50%",
          }}
          onClick={handleAvatarChange}
        >
          <AddCircleIcon sx={{ color: "primary.main" }} />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*" // 只接受图片文件
        />
      </Box>
      <Box sx={{ marginLeft: 2.5, flex: 1 }}>
        <Typography variant="h6" component="div" sx={{ color: "text.primary" }}>
          {userInfo.username}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          我正在努力创作中......
        </Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
