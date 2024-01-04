import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ProfileData = ({ label, data }) => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>{label}: </Text>
        <Text style={styles.detailValue}>{data}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  detailValue: {
    fontSize: 16,
    paddingHorizontal: 2,
  },
});

export default ProfileData;
