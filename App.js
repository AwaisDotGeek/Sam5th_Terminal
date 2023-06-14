import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CreateTask from "./screens/CreateTask";
import FileContentScreen from "./screens/AsyncStorageData";
import TasksList from "./screens/TasksList";
import TaskDetails from "./screens/TaskDetails";
import EditTask from "./screens/EditTask";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{ title: "Create Task" }}
        />
        <Stack.Screen
          name="Tasks"
          component={TasksList}
          options={{ title: "Tasks" }}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTask}
          options={{ title: "Edit Task" }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{ title: "Task Details" }}
        />
        <Stack.Screen
          name="AsyncStorageData"
          component={FileContentScreen}
          options={{ title: "All Data" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Aamirs' Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tasks")}
      >
        <Text style={styles.buttonText}>Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AsyncStorageData")}
      >
        <Text style={styles.buttonText}>Async Storage Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: 250,
    textAlign: "center",
    backgroundColor: "#f4511e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
