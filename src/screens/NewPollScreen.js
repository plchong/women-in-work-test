import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DragList from "react-native-draglist";

import Header from "../components/Header";

const NewPollScreen = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [optionArr, setOptionArr] = useState([]);

  const [selectMultipleAnswer, setSelectMultipleAnswer] = useState(false);

  // Draglist
  const keyExtractor = (str) => {
    return str;
  };
  const renderItem = (info) => {
    const { item, onDragStart, onDragEnd, index } = info;
    return (
      <TouchableOpacity
        key={item}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        style={[
          styles.renderItem,
          index == 0
            ? { borderTopLeftRadius: 10, borderTopRightRadius: 10 }
            : null,
          index === 7
            ? {
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }
            : null,
        ]}
      >
        <Text style={styles.title}>{item}</Text>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          color="lightgrey"
          size={30}
        />
      </TouchableOpacity>
    );
  };
  async function onReordered(fromIndex, toIndex) {
    const list = [...optionArr];
    const removed = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, removed[0]);
    setOptionArr(list);
  }

  const handleOnKeyPress = () => {
    let list = [];
    for (let x = 0; x < optionArr.length; x++) {
      list.push(optionArr[x]);
    }
    list.push(option);
    setOptionArr(list);
    setOption("");
  };
  const onPressSend = () => {
    navigation.navigate("PollScreen", {
      question: question,
      optionArr: optionArr,
    });
  };

  const displayOption =
    optionArr.length === 0 ? (
      <View style={styles.row}>
        <TextInput
          style={[
            styles.multiTextInputStyle,
            {
              width: "88%",
              borderTopLeftRadius: 10,
              borderBottomWidth: 1,
              borderColor: "lightgrey",
            },
          ]}
          placeholder={"Option"}
          onChangeText={(text) => setOption(text)}
          value={option}
          keyboardType={"default"}
          onSubmitEditing={handleOnKeyPress}
          maxLength={100}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderTopRightRadius: 10,
            width: "12%",
            backgroundColor: "white",
            justifyContent: "center",
            borderColor: "lightgrey",
          }}
        >
          <MaterialCommunityIcons
            name="format-list-bulleted"
            color="lightgrey"
            size={30}
          />
        </View>
      </View>
    ) : null;
  const displayAddOption =
    optionArr.length !== 8 ? (
      <TextInput
        style={[
          styles.multiTextInputStyle,
          { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
        ]}
        placeholder={"Add option"}
        onChangeText={(text) => setOption(text)}
        value={option}
        keyboardType={"default"}
        onSubmitEditing={handleOnKeyPress}
        maxLength={100}
      />
    ) : null;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Header
          leftTitle={"Cancel"}
          leftTitleColor={
            question || optionArr.length !== 0 ? "black" : "lightgrey"
          }
          title={"New Poll"}
          rightTitle={"Send"}
          rightTitleColor={
            question && optionArr.length !== 0 ? "black" : "lightgrey"
          }
          onPressRightTitle={onPressSend}
        />
        <View style={styles.textinputContainer}>
          <Text style={styles.title}>Question</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder={"Ask a question"}
            onChangeText={(text) => setQuestion(text)}
            value={question}
            keyboardType={"default"}
            maxLength={255}
          />
        </View>
        <View style={styles.textinputContainer}>
          <Text style={styles.title}>Options</Text>
          {displayOption}
          <DragList
            data={optionArr}
            keyExtractor={keyExtractor}
            onReordered={onReordered}
            renderItem={renderItem}
          />
          {displayAddOption}
          <Text style={styles.remind}>You can add 8 more options</Text>
        </View>
        <View style={styles.selectMultipleAnswerContainer}>
          <Text style={styles.title}>Multiple answers</Text>
          <Switch
            trackColor={{ false: "white", true: "white" }}
            thumbColor={selectMultipleAnswer ? "white" : "white"}
            ios_backgroundColor="grey"
            onValueChange={() => {
              setSelectMultipleAnswer(!selectMultipleAnswer);
            }}
            value={selectMultipleAnswer}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  textinputContainer: { padding: 10 },
  title: { paddingVertical: 10, fontSize: 20 },
  row: {
    flexDirection: "row",
  },
  textInputStyle: {
    fontSize: 20,
    borderRadius: 10,
    padding: 14,
    backgroundColor: "white",
  },
  multiTextInputStyle: {
    fontSize: 20,
    padding: 14,
    backgroundColor: "white",
  },
  remind: {
    paddingTop: 10,
    fontSize: 14,
    color: "grey",
  },
  selectMultipleAnswerContainer: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  renderItem: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
});

export default NewPollScreen;
