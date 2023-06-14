import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Settings = () => {
  return (
    <View>
      <Text>Switch Theme</Text>
      <TouchableOpacity>
        <Text>Dark</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
  },
});

export default Settings;
