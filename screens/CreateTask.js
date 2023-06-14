import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateTask = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleCreate = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem("Tasks");
      let id = 1;
      if (existingTasks) {
        let tasksLength = JSON.parse(existingTasks).length;
        const newId = tasksLength + 1;
        id = newId;
      }
      const task = {
        id,
        title,
        description,
        dueDate,
        priority,
      };

      if (existingTasks) {
        let tasks = JSON.parse(existingTasks);
        tasks.push(task);
        await AsyncStorage.setItem("Tasks", JSON.stringify(tasks));
      } else {
        let tasks = [];
        tasks.push(task);
        await AsyncStorage.setItem("Tasks", JSON.stringify(tasks));
      }

      console.log("Task created successfully!");
      navigation.navigate("Home");
    } catch (error) {
      alert("Caught error while storing task! Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Task Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title here"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={[styles.input, styles.longText]}
          placeholder="Enter description here"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Due date (MM/DD)"
          value={dueDate}
          onChangeText={(text) => setDueDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Priority level (1 - 10)"
          value={priority}
          onChangeText={(text) => setPriority(text)}
        />
        <TouchableOpacity onPress={handleCreate}>
          <Text style={styles.button}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  innerContainer: {
    backgroundColor: "#fff",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
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
  },
  longText: {
    height: 120,
  },
  button: {
    width: 200,
    textAlign: "center",
    backgroundColor: "seagreen",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 10,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default CreateTask;
