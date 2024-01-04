import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfilePhoto = (props) => {
  const { name, photoUrl, width, height } = props;

  return (
    <View style={[styles.profile, { width: width, height: height }]}>
      <Image source={{ uri: `${photoUrl}` }} style={styles.photo} />
      {name && (
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    borderRadius: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
export default ProfilePhoto;
