import React, { useEffect, useState, useCallback, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, RefreshControl } from "react-native";
// import SideMenu, { SideMenuRef } from "./components/SideMenu"
import Empty from "../../components/Empty";

import icon_mine_bg from '../../assets/icon_mine_bg.jpg';
import icon_menu from '../../assets/icon_menu.png';
import icon_share from '../../assets/icon_share.png';
import icon_avatar from '../../assets/icon_avatar.png';
import icon_add from '../../assets/icon_add.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_edit from '../../assets/icon_edit.png';
import icon_no_list from '../../assets/icon_no_list.png';

const EMPTY_CONFIG = [
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_list, tips: "快去发布今日的好心情吧～" },
]


export default function User() {
  const [bgImgHeight, setBgImgHeight] = useState(180);
  // const {userInfo} = UserStore;
  const [tabIndex, setTabIndex] = useState(0);
  // const sideMenuRef = useRef < SideMenuRef > (null)
  // const store = useLocalStore(() => new MineStore())

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
        tintColor: "white",
      },
    })
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
        <View style={{ flex: 1, }} />
        <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_share} />
      </View>
    )
  }
  const renderInfo = () => {
    // const {avatar, nickName, redBookId, desc, sex} = userInfo
    // const {info} = store
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
      qrcodeImg: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: "#bbb"
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
        color: "#ffffff"
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: "#ffffff"
      },
    })
    return (
      <View onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        console.log("2222222", height);
        setBgImgHeight(height);
      }}>
        <View style={styles.avatarLayout}>
          <Image style={styles.avatarImg} source={icon_avatar} />
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>瓦吉吉哇</Text>
            <Text style={styles.descTxt}>我正在努力创作中......</Text>
          </View>
        </View>

        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>13</Text>
            <Text style={styles.infoLabel}>已发布</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>12</Text>
            <Text style={styles.infoLabel}>待审核</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>14</Text>
            <Text style={styles.infoLabel}>未通过</Text>
          </View>

          <View style={{ flex: 1, }} />

          <TouchableOpacity
            style={styles.infoButton}
          >
            <Image style={styles.settingImg} source={icon_edit} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoButton}
          >
            <Image style={styles.settingImg} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
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
    })
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(0)
          }}
        >
          <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>已发布</Text>
          {tabIndex === 0 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(1)
          }}
        >
          <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>待审核</Text>
          {tabIndex === 1 && <View style={styles.line} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(2)
          }}
        >
          <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>未通过</Text>
          {tabIndex === 2 && <View style={styles.line} />}
        </TouchableOpacity>
      </View>
    )
  }
  const renderList = () => {
    // const {
    //   noteList, collectionList, favorateList,
    // } = store
    // const currentList = [noteList, collectionList, favorateList][tabIndex]
    // const currentList = [][tabIndex];
    const currentList = [
      {
        id: 1,
        title: '列表流是什么？',
        content: ' 一种以文字信息为主导的功能布局形式，主要以文字+图片、文字+图标形式出现的',
        image: 'https://pic.sucaibar.com/pic/201611/24/c9bc97f432.jpg',
      },
      {
        id: 2,
        title: '瀑布流是什么？',
        content: '瀑布流是“瀑布流式布局”的简称，因滑动时会像瀑布一样“飞流直下”“源源不断”，故而得名。是一种以图片信息为主导的页面布局形式，主要以图片+文字形式出现',
        image: 'https://th.bing.com/th/id/R.2a6d9ad38dd2ec831d3fb01f11e30d82?rik=lPLWAVWvZHZxDA&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f40054%2f1002.jpg_wh1200.jpg&ehk=NxURVbGtLSDFkRiXqySb8Nsa3KV6U41BbFcI0zZg2%2fw%3d&risl=&pid=ImgRaw&r=0',
      },
      {
        id: 3,
        title: '卡片流是什么？',
        content: '卡片流 列表流的升级版，形式多样 特点——多变、聚焦',
        image: 'https://th.bing.com/th/id/OIP.0_NEV1BFaG8yqw8RFHrZGgHaLA?rs=1&pid=ImgDetMain',
      },
    ];
    if (!currentList?.length) {
      const config = EMPTY_CONFIG[tabIndex]
      return <Empty icon={config.icon} tips={config.tips} />
    }
    const styles = StyleSheet.create({
      listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: "white"
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
        fontWeight: 'bold',
        marginBottom: 5,
      },
      itemText: {
        fontSize: 14,
        color: '#555',
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
      },
      button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
      },
      editButton: {
        backgroundColor: '#ffa500',
      },
      deleteButton: {
        backgroundColor: '#ff4500',
      },
      buttonText: {
        color: 'white',
        fontSize: 14,
      },
    })
    return (
      <View>
        {currentList.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.listItem}>
            <Image style={styles.itemImage} source={{ uri: item.image }} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemText}>{item.content}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>编辑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(item)}
                >
                  <Text style={styles.buttonText}>删除</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>User</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        // onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        // onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.btn}>
        <Button title="Login" onPress={() => console.log("Login")} />
        <Button title="Register" onPress={() => console.log("Register")} />
      </View> */}
      <Image
        style={[styles.bgImg, { height: bgImgHeight + 64 }]}
        // style={styles.bgImg}
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
    zIndex: -1
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
});
