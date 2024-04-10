import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import SideMenu, { SideMenuRef } from "./components/SideMenu"
import Empty from "../../components/Empty";
import { Button, message, Popconfirm } from "antd";

import icon_mine_bg from "../../assets/icon_mine_bg.jpg";
import icon_menu from "../../assets/icon_menu.png";
import icon_share from "../../assets/icon_share.png";
import icon_avatar from "../../assets/icon_avatar.png";
import icon_add from "../../assets/icon_add.png";
import icon_setting from "../../assets/icon_setting.png";
import icon_edit from "../../assets/icon_edit.png";
import icon_no_list from "@/assets/icon_no_list.png";

import { getTripsByUSerID, deleteTrip } from "@/api/statusTrip";

const EMPTY_CONFIG = [
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
];

const userInfo = {
  avatar: icon_avatar,
  nickName: "瓦吉吉哇",
  desc: "我正在努力创作中......",
};

export default function User() {
  const [bgImgHeight, setBgImgHeight] = useState(180);
  const [tabIndex, setTabIndex] = useState(0);
  const [passTrips, setPassTrips] = useState([]);
  const [waitTrips, setWaitTrips] = useState([]);
  const [rejectTrips, setRejectTrips] = useState([]);

  const [messageApi, contextHolder] = message.useMessage(); //删除loading
  const key = "updatable";
  {
    contextHolder;
  }

  const loadPassData = async (userId = 1, pageNum = 1, pageSize = 10) => {
    //获取已发布游记
    getTripsByUSerID({ status: "pass", userId, pageNum, pageSize })
      .then((response) => {
        setPassTrips(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  };
  const loadWaitData = async (userId = 1, pageNum = 1, pageSize = 10) => {
    //获取已发布游记
    getTripsByUSerID({ status: "wait", userId, pageNum, pageSize })
      .then((response) => {
        setWaitTrips(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  };
  const loadRejectData = async (userId = 1, pageNum = 1, pageSize = 10) => {
    //获取已发布游记
    getTripsByUSerID({ status: "reject", userId, pageNum, pageSize })
      .then((response) => {
        setRejectTrips(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  };
  useEffect(() => {
    loadPassData();
    loadWaitData();
    loadRejectData();
  }, []);

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: "100%",
        // height: 48,
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
      },
      menuButton: {
        height: "100%",
        paddingHorizontal: 16,
        justifyContent: "center",
      },
      menuImg: {
        width: 28,
        height: 28,
        resizeMode: "contain",
      },
      rightMenuImg: {
        marginHorizontal: 12,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            // sideMenuRef.current?.show()
          }}
        >
          <Image style={styles.menuImg} source={icon_menu} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <Image
          style={[styles.menuImg, styles.rightMenuImg]}
          source={icon_share}
          tintColor={"white"}
        />
      </View>
    );
  };
  const renderInfo = () => {
    const { avatar, nickName, desc } = userInfo;
    const styles = StyleSheet.create({
      avatarLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 15,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: "cover",
        borderRadius: 48,
      },
      addImg: {
        width: 28,
        height: 28,
        marginLeft: -28,
        marginBottom: 2,
      },
      nameLayout: {
        marginLeft: 20,
      },
      nameTxt: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
        paddingVertical: 5,
      },
      descTxt: {
        fontSize: 14,
        color: "white",
      },
      idLayout: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 20,
      },
      idTxt: {
        fontSize: 12,
        color: "#bbb",
      },
      infoLayout: {
        width: "100%",
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
      },
      infoItem: {
        alignItems: "center",
        paddingHorizontal: 16,
      },
      infoValue: {
        fontSize: 18,
        color: "white",
      },
      infoLabel: {
        fontSize: 12,
        color: "white",
        marginTop: 6,
      },
      infoButton: {
        height: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: "#ffffff",
      },
      settingImg: {
        width: 20,
        height: 20,
      },
    });
    return (
      <View
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          setBgImgHeight(height);
        }}
      >
        <View style={styles.avatarLayout}>
          <Image style={styles.avatarImg} source={avatar} />
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{nickName}</Text>
            <Text style={styles.descTxt}>{desc}</Text>
          </View>
        </View>

        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{passTrips.length}</Text>
            <Text style={styles.infoLabel}>已发布</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{waitTrips.length}</Text>
            <Text style={styles.infoLabel}>待审核</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{rejectTrips.length}</Text>
            <Text style={styles.infoLabel}>未通过</Text>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity style={styles.infoButton}>
            <Image
              style={styles.settingImg}
              source={icon_edit}
              tintColor="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Image
              style={styles.settingImg}
              source={icon_setting}
              tintColor="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderTabs = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
      icon: {
        width: 28,
        height: 28,
      },
      line: {
        width: 28,
        height: 2,
        backgroundColor: "#ff2442",
        borderRadius: 1,
        position: "absolute",
        bottom: 6,
      },
      tabButton: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 14,
      },
      tabTxt: {
        fontSize: 17,
        color: "#999",
      },
      tabTxtSelected: {
        fontSize: 17,
        color: "#333",
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(0);
          }}
        >
          <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
            已发布
          </Text>
          {tabIndex === 0 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(1);
          }}
        >
          <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
            待审核
          </Text>
          {tabIndex === 1 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(2);
          }}
        >
          <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
            未通过
          </Text>
          {tabIndex === 2 && <View style={styles.line} />}
        </TouchableOpacity>
      </View>
    );
  };
  const renderList = () => {
    const navigation = useNavigation();

    const currentList = [passTrips, waitTrips, rejectTrips][tabIndex];

    if (!currentList?.length) {
      const config = EMPTY_CONFIG[tabIndex];
      return <Empty icon={config.icon} tips={config.tips} />;
    }
    const handleEdit = (item) => {
      navigation.navigate("CardPublish", item);
    };
    const confirm = (_id) => {
      deleteTrip(_id)
        .then(() => {
          message.success("删除成功");
          if (tabIndex === 0) {
            loadPassData(); // Reload pass trips
          } else if (tabIndex === 1) {
            loadWaitData(); // Reload wait trips
          } else if (tabIndex === 2) {
            loadRejectData(); // Reload reject trips
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const cancel = (e) => {
      message.success("已取消");
    };
    const renderButtons = (item) => {
      if (tabIndex === 0) {
        return (
          <Popconfirm
            title="提示"
            description="是否删除该游记?"
            onConfirm={() => confirm(item._id)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button danger style={styles.deleteButton}>
              删除
            </Button>
          </Popconfirm>
        );
      } else {
        return (
          <>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Button type="primary" style={styles.editButton}>
                编辑
              </Button>
            </TouchableOpacity>

            <Popconfirm
              title="提示"
              description="是否删除该游记?"
              onConfirm={() => confirm(_id)}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button danger style={styles.deleteButton}>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      }
    };
    const styles = StyleSheet.create({
      listItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "white",
      },
      itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
      },
      itemContent: {
        flex: 1,
      },
      itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      itemText: {
        fontSize: 14,
        color: "#555",
      },
      buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
      },
      button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
      },
      editButton: {
        backgroundColor: "#ffa500",
      },
      deleteButton: {
        backgroundColor: "#ff4500",
        color: "white",
        fontSize: 14,
      },
    });
    return (
      <View>
        {currentList.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.listItem}>
            <Image style={styles.itemImage} source={{ uri: item.images[0] }} />
            <View style={styles.itemContent}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.itemTitle}
              >
                {item.title}
              </Text>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={styles.itemText}
              >
                {item.content}
              </Text>
              <View style={styles.buttonContainer}>{renderButtons(item)}</View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.bgImg, { height: bgImgHeight + 64 }]}
        source={icon_mine_bg}
      />
      {renderTitle()}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
          // refreshing={store.refreshing}
          // onRefresh={store.requestAll}
          />
        }
      >
        {renderInfo()}
        {renderTabs()}
        {renderList()}
      </ScrollView>
      {/* <SideMenu ref={sideMenuRef} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  bgImg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 400,
    zIndex: -1,
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
});
