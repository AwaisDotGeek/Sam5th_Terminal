import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const TasksList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const availableTasks = await AsyncStorage.getItem("Tasks");
        if (availableTasks) {
          setTasks(JSON.parse(availableTasks));
        }
      } catch (error) {
        alert("Error retrieving tasks! Error: " + error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (item) => {
    navigation.navigate("EditTask", { item: item });
  };

  const handleDetailsClick = (item) => {
    navigation.navigate("TaskDetails", { item: item });
  };

  const renderTaskItem = ({ item }) => {
    return (
      <View style={Styles.taskItem}>
        <Text style={Styles.taskTitle}>{item.title}</Text>
        <Text style={Styles.taskDueDate}>{item.dueDate}</Text>
        <Text style={Styles.taskPriority}>{item.priority}</Text>
        <TouchableOpacity onPress={() => handleEditClick(item)}>
          <Text style={[Styles.button, { backgroundColor: "limegreen" }]}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDetailsClick(item)}>
          <Text style={[Styles.button, { backgroundColor: "seagreen" }]}>
            Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <View style={[Styles.taskItem, { width: "95%", padding: 5 }]}>
        <Text style={Styles.taskTitle}>Title</Text>
        <Text style={Styles.taskTitle}>Due Date</Text>
        <Text style={Styles.taskTitle}>Priority</Text>
        <Text style={[Styles.taskTitle, { color: "limegreen", padding: 10 }]}>
          Edit
        </Text>
        <Text style={[Styles.taskTitle, { color: "seagreen", padding: 10 }]}>
          Details
        </Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.title}
        style={Styles.flatList}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  flatList: {
    width: "95%",
    padding: 5,
  },
  taskItem: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: "2.5px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDueDate: {
    color: "gray",
  },
  taskPriority: {
    color: "red",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TasksList;
