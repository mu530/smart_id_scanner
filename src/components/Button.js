import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Button = ({ title, onPress, style, icon, type, disabled }) => {
  const backgroundColor = type === "danger" ? "#B53105" : "#00A7FF";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        style,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons name={icon} size={28} color={"#FFD700"} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    margin: 3,
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    padding: 3,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Button;
