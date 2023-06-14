import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const EditTask = ({ route, navigation }) => {
  const { item } = route.params;
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newDueDate, setNewDueDate] = useState(item.dueDate);
  const [newPriority, setNewPriority] = useState(item.priority);

  const handleSaveChanges = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem("Tasks");
      let tasks = JSON.parse(fetchedData);
      tasks.forEach((task) => {
        if (task.id == item.id) {
          task.title = newTitle;
          task.description = newDescription;
          task.dueDate = newDueDate;
          task.priority = newPriority;
        }
      });
      await AsyncStorage.setItem("Tasks", JSON.stringify(tasks));
      navigation.navigate("Home");
      navigation.navigate("Tasks");
    } catch (error) {
      alert("Error saving changes! Error: ", error);
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.innerContainer}>
        <Text style={Styles.key}>Title</Text>
        <TextInput
          style={Styles.input}
          placeholder={item.title}
          value={newTitle}
          onChangeText={(text) => setNewTitle(text)}
        />

        <Text style={Styles.key}>description</Text>
        <TextInput
          style={[Styles.input, { height: 100 }]}
          placeholder={item.description}
          multiline
          value={newDescription}
          onChangeText={(text) => setNewDescription(text)}
        />

        <Text style={Styles.key}>Due Date</Text>
        <TextInput
          style={Styles.input}
          placeholder={item.dueDate}
          value={newDueDate}
          onChangeText={(text) => setNewDueDate(text)}
        />

        <Text style={Styles.key}>priority</Text>
        <TextInput
          style={[Styles.input, { marginBottom: 15 }]}
          placeholder={item.priority}
          value={newPriority}
          onChangeText={(text) => setNewPriority(text)}
        />

        <TouchableOpacity
          onPress={() => {
            handleSaveChanges();
          }}
        >
          <Text style={Styles.button}>Save Changes</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    fontSize: 14,
    outlineStyle: "none",
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: "85%",
    marginVertical: 6,
    marginHorizontal: 6,
  },
  button: {
    width: 200,
    textAlign: "center",
    backgroundColor: "seagreen",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 6,
    color: "#fff",
    fontSize: 16,

    alignSelf: "flex-end",
  },
});

export default EditTask;
