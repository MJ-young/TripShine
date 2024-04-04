import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

const Empty = ({ icon, tips }) => {

    return (
        <View style={styles.root}>
            <Image style={styles.icon} source={icon} />
            <Text style={styles.tipsTxt}>{tips}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        paddingTop: 120,
    },
    icon: {
        width: 96,
        height: 96,
        resizeMode: "contain",
    },
    tipsTxt: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 16,
    },
});

export default Empty;
