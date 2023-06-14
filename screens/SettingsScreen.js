import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  const handleSwicthTheme = async () => {
    setTheme(theme === "light" ? "dark" : "light");
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
