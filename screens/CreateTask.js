import React, { useState, useEffect } from "react";
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
      const task = {
        title,
        description,
        dueDate,
        priority,
      };

      // Retrieve existing tasks from AsyncStorage
      const existingTasks = await AsyncStorage.getItem("Tasks");

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
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 5,
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
    width: "65%",
  },
  longText: {
    height: 100,
  },
  datePicker: {
    width: "65%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    paddingVertical: 5,
  },
  datePickerInput: {
    borderWidth: 0,
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  datePickerPlaceholder: {
    color: "#999",
  },
  datePickerText: {
    color: "#000",
  },
  button: {
    width: 200,
    textAlign: "center",
    backgroundColor: "#f4511e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 10,
  },
});

export default CreateTask;
