import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const getTheme = await AsyncStorage.getItem("theme");
        if (!getTheme) {
          await AsyncStorage.setItem("theme", theme);
        }
      } catch (error) {
        alert("Error getting theme! Error: " + error);
      }
    };

    fetchTheme();
  }, []);

  const handleSwicthTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      const globalThemeToSet = theme === "light" ? "dark" : "light";
      await AsyncStorage.setItem("theme", globalThemeToSet);
    } catch (error) {
      alert("Error saving theme! Error: ", error);
    }
  };

  return (
    <View
      style={[
        Styles.container,
        { backgroundColor: theme === "light" ? "#eee" : "#555" },
      ]}
    >
      <View style={Styles.option}>
        <Text
          style={[
            Styles.optionTitle,
            { color: theme === "light" ? "#000" : "#eee" },
          ]}
        >
          Switch Theme To
        </Text>
        <TouchableOpacity onPress={handleSwicthTheme}>
          <Text
            style={[
              Styles.button,
              {
                backgroundColor: theme === "light" ? "#333" : "seagreen",
                color: "#fff",
              },
            ]}
          >
            {theme === "light" ? "Dark" : "Light"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionTitle: {
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  button: {
    width: 120,
    textAlign: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 6,
    fontSize: 16,
  },
});

export default Settings;
