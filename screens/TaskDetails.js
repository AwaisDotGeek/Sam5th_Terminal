import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TaskDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const handleEditThisItem = (item) => {
    navigation.navigate("EditTask", { item: item, navigation });
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.innerContainer}>
        <Text style={Styles.key}>Title</Text>
        <Text style={Styles.value}>{item.title}</Text>

        <Text style={Styles.key}>description</Text>
        <Text style={Styles.value}>{item.description}</Text>

        <Text style={Styles.key}>Due Date</Text>
        <Text style={Styles.value}>{item.dueDate}</Text>

        <Text style={Styles.key}>priority</Text>
        <Text style={Styles.value}>{item.priority}</Text>

        <TouchableOpacity onPress={() => handleEditThisItem(item)}>
          <Text style={Styles.button}>Edit This Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  innerContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  key: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: 250,
    textAlign: "center",
    backgroundColor: "seagreen",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 6,
    color: "#fff",
    fontSize: 16,

    alignSelf: "flex-end",
  },
});

export default TaskDetails;
