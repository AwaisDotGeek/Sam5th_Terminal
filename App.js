import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CreateTask from "./screens/CreateTask";
import FileContentScreen from "./screens/AsyncStorageData";
import TasksList from "./screens/TasksList";
import TaskDetails from "./screens/TaskDetails";
import EditTask from "./screens/EditTask";
import Settings from "./screens/SettingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
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
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const globalTheme = await AsyncStorage.getItem("theme");
        setTheme(globalTheme);
      } catch (error) {
        console.log("Error occured while setting theme! Error: ", error);
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    // This 2nd useEffect is needed so the theme gets set
    console.log("Hello world, I am coming from 2nd useEffect in App.js");
    console.log(theme);
  }, [theme]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#eee" : "#333" },
      ]}
    >
      <Text
        style={[
          styles.heading,
          theme === "light" ? styles.lightHeading : styles.darkHeading,
        ]}
      >
        Awais' Home Screen
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          theme === "light" ? styles.lightButton : styles.darkButton,
        ]}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          theme === "light" ? styles.lightButton : styles.darkButton,
        ]}
        onPress={() => navigation.navigate("Tasks")}
      >
        <Text style={styles.buttonText}>Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          theme === "light" ? styles.lightButton : styles.darkButton,
        ]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          theme === "light" ? styles.lightButton : styles.darkButton,
        ]}
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
  lightHeading: {
    color: "#000",
  },
  darkHeading: {
    color: "#fff",
  },
  button: {
    width: 250,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
    borderRadius: 6,
  },
  lightButton: {
    backgroundColor: "#fff",
  },
  darkButton: {
    backgroundColor: "seagreen",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
