import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-web";

const FileContentScreen = () => {
  const [fileContent, setFileContent] = useState([]);
  const [isCleared, setCleared] = useState(false);

  useEffect(() => {
    const getFileContent = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(allKeys);
        const content = values.map(([key, value]) => ({ key, value }));
        setFileContent(content);
      } catch (error) {
        console.log("Error occurred while retrieving file content:", error);
      }
    };

    getFileContent();
  }, []);

  const handleClearData = async () => {
    try {
      await AsyncStorage.clear();
      setCleared(true);
      console.log("AsyncStorage data cleared successfully.");
    } catch (error) {
      console.log("Error occurred while clearing AsyncStorage data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {fileContent.map((item) => (
        <Text key={item.key} style={styles.item}>
          <Text style={styles.item_key}>{`${item.key}`}</Text>
          <Text style={styles.item_value}>{`${item.value}`}</Text>
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleClearData}>
        <Text style={styles.buttonText}>Clear Storage</Text>
      </TouchableOpacity>
      <Text>{isCleared ? "Cleared, needs refresh!" : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    maxWidth: "75%",
  },
  item_key: {
    padding: 10,
  },
  item_value: {
    padding: 10,
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
});

export default FileContentScreen;
