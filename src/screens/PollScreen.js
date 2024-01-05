import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import Header from "../components/Header";

const PollScreen = ({ route }) => {
  const { question, optionArr } = route.params;

  return (
    <View style={styles.container}>
      <Header leftTitle={"Close"} leftTitleColor={"black"} title={"Poll"} />
      <Text style={styles.question}>{question}</Text>
      {optionArr.map((option) => {
        return (
          <View style={styles.row}>
            <Text style={styles.title}>{option}</Text>
            <Text>0 vote</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  question: {
    padding: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
    fontSize: 26,
    fontWeight: "bold",
  },
  title: { paddingVertical: 20, fontSize: 20, fontWeight: "bold" },
  row: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default PollScreen;
