import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getUserTrips, deleteTrip } from "@/api/statusTrip";
import { useNavigation } from "@react-navigation/native";

const UserTrip = () => {
  const navigation = useNavigation();
  const [tabIndex, setTabIndex] = useState(0);
  const [diaries, setDiaries] = useState({
    passed: null,
    waiting: null,
    rejected: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    if (!diaries[getStatus(newValue)]) {
      loadDiaries(getStatus(newValue));
    }
  };

  const getStatus = (index) => {
    switch (index) {
      case 0:
        return "pass";
      case 1:
        return "wait";
      case 2:
        return "reject";
      default:
        return null;
    }
  };

  const loadDiaries = async (status) => {
    setLoading(true);
    try {
      const response = await getUserTrips({ status });
      setDiaries((prev) => ({ ...prev, [status]: response.data }));
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDiaries(getStatus(tabIndex));
  };

  useEffect(() => {
    loadDiaries(getStatus(tabIndex)); // 初始加载第一个标签的数据
  }, []);

  const handleItemClick = (diary) => {
    navigation.push("TripDetail", diary);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="Travel Diary Tabs"
        >
          <Tab label="已审核" />
          <Tab label="待审核" />
          <Tab label="审核拒绝" />
        </Tabs>
        <IconButton onClick={handleRefresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List component="nav" aria-label="travel diaries">
          {diaries[getStatus(tabIndex)]?.map((diary) => (
            <React.Fragment key={diary._id}>
              <ListItem button onClick={() => handleItemClick(diary)}>
                <ListItemText primary={diary.title} secondary={diary.content} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UserTrip;
