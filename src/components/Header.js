import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const Header = (props) => {
  const {
    leftTitle,
    leftTitleColor,
    onPressLeftTitle,
    title,
    rightTitle,
    rightTitleColor,
    onPressRightTitle, // function
  } = props;

  return (
    <SafeAreaView style={styles.header}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressLeftTitle}>
          <Text style={[styles.subTitle, { color: leftTitleColor }]}>
            {leftTitle}
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Text style={styles.title}>{title}</Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={onPressRightTitle}>
          <Text style={[styles.subTitle, { color: rightTitleColor }]}>
            {rightTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "13%",
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
  },
  subTitle: {
    fontSize: 20,
  },
});

export default Header;
