import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getUserTrips } from "@/api/trip";
import { useNavigation } from "@react-navigation/native";
import formatDate from "@/utils/formatDate";

const UserTripTab = () => {
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
    getUserTrips({ status })
      .then((response) => {
        if (response.data) {
          setDiaries((prev) => ({ ...prev, [status]: response.data }));
        }
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    loadDiaries(getStatus(tabIndex));
  };

  useFocusEffect(
    useCallback(() => {
      loadDiaries(getStatus(tabIndex));
    }, [tabIndex])
  );

  const handleItemClick = (diary) => {
    navigation.push("TripForm", diary);
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
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    overflow: "hidden",
                    marginRight: 2,
                  }}
                >
                  <img
                    src={diary.images[0]}
                    alt={diary.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <ListItemText
                  primary={diary.title}
                  secondary={
                    <>
                      {getStatus(tabIndex) != "reject" && (
                        <>
                          <Typography component="span" variant="body2">
                            创建时间: {formatDate(diary.createTime)}
                          </Typography>
                          <br />
                        </>
                      )}
                      {getStatus(tabIndex) == "reject" && (
                        <>
                          <Chip
                            label="拒绝原因"
                            color="secondary"
                            size="small"
                            sx={{ mr: 1, bgcolor: "error.main" }}
                          />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {diary.rejectReason}
                          </Typography>
                          <br />

                          <Typography component="span" variant="body2">
                            审核时间: {formatDate(diary.updateTime)}
                          </Typography>
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UserTripTab;
