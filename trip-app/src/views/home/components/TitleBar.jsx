import React, { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
} from "react-native";

import icon_search from "../../../assets/icon_search.png";

const TabComponent = () => {

    return (
        <View style={styles.titleLayout}>
            <View style={styles.searchBox}>
                <TouchableOpacity style={styles.searchButton}>
                    <Image source={icon_search} style={styles.icon}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={"transparent"}  //下划线颜色设置为透明
                        placeholderTextColor={'#aaa'}  //设置占位符颜色
                        placeholder={"搜索感兴趣的内容"}
                    />
                </TouchableOpacity>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    titleLayout: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
    icon: {
        alignSelf: 'center',
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
        flexDirection: 'row',
        backgroundColor: '#E6E7E8',
        borderRadius: 5,
    },
    searchButton: {
        height: "100%",
        justifyContent: "center",
        alignItems: "left",
    },
    inputText: {
        alignSelf: 'center',
        marginTop: 0,
        flex: 1,
        height: 15,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 18,
        lineHeight: 30,
        textAlignVertical: 'center',
        textDecorationLine: 'none'
    },
});

export default TabComponent;
