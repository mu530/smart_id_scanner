import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Profile from "../components/Profile";
import Scan from "./../components/Scan";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const StudentProfile = () => {
  let {
    handleBarCodeScanned,
    student,
    error,
    loading,
    scanned,
    updateScanned,
  } = useContext(StudentContext);
  let { user } = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {!scanned && <Scan onScan={handleBarCodeScanned} scanned={scanned} />}
      {scanned && (
        <>
          {loading ? ( // Conditional rendering of loading screen
            <View style={styles.loading}>
              <ActivityIndicator size='large' color='#0000ff' />
              <Text>Searching...</Text>
            </View>
          ) : error ? ( // Conditional rendering of error screen
            <View style={styles.error}>
              <MaterialIcons name='error' size={100} color='red' />
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          ) : (
            // Conditional rendering of student profile
            <>
              {user && (
                <Button
                  title={`መዝገብ አክል Add Record`}
                  onPress={() => navigation.navigate("Add Record")}
                  type={"danger"}
                />
              )}
              <View style={styles.profileContainer}>
                <Profile data={student} />
              </View>
            </>
          )}
          <View style={styles.footer}>
            <Button
              title={`ሌላ ስካን አድርግ Scan Again`}
              onPress={() => {
                updateScanned(false);
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    marginBottom: 10,
  },
  error: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 30,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
  },
});

export default StudentProfile;
