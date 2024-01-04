import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import ProfilePhoto from "../components/ProfilePhoto";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { StudentContext } from "../context/StudentContext";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../services/config";

const Confirmation = ({ route, navigation }) => {
  const { record, data } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const reason = record;

  let { student } = useContext(StudentContext);

  let { authTokens } = useContext(AuthContext);

  axios.defaults.timeout = 3000;
  axios.defaults.timeoutErrorMessage = "timeout";

  const addRecord = async () => {
    try {
      setLoading(true); // Set loading to true
      const authToken = authTokens.access;
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const response = await axios.post(`${BASE_URL}/disciplin/`, data, config);

      alert(`መዝገብ ታክሏል። \nRecored added`);
      navigation.navigate("Home");
    } catch (error) {
      setError("Error occured");
      if (axios.isAxiosError(error) && error.message === "timeout") {
        throw new Error(
          `እባክዎ የበይነመረብ ግንኙነትዎን ያረጋግጡ እና እንደገና ይሞክሩ \nPlease check your internet connection and try again`
        );
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <View style={styles.container}>
      {error &&
        !loading && ( // Conditional rendering of error screen
          <View style={styles.error}>
            <MaterialIcons name='error' size={100} color='red' />
            <Text style={styles.errorText}>Error: {error}</Text>
            <Button
              title={"Try Again"}
              onPress={() => setError(null)}
              disabled={loading}
            />
          </View>
        )}
      {loading && ( // Conditional rendering of loading screen
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text>Adding record...</Text>
        </View>
      )}
      {!error && !loading && (
        <>
          <View style={styles.profileContainer}>
            <ProfilePhoto photoUrl={student.photo} width={100} height={100} />
            <Text style={styles.boldText}>
              {`${student.first_name} ${student.last_name}`}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>
              {`You are adding a record to ${student.first_name} ${student.last_name}'s profile`}
            </Text>
            <Text style={styles.dangerText}>
              Attention: Please enter correct information. It impacts students'
              future. Double-check details. Thank you!
            </Text>
          </View>
          <Text style={[styles.dangerText, styles.boldText]}>New Record</Text>
          <View style={styles.dangerContainer}>
            <Text style={styles.boldText}>{record}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              title={"Cancel"}
              onPress={() => navigation.goBack()}
              disabled={loading}
            />
            <Button
              title={"Confirm"}
              onPress={() => addRecord()}
              type={"danger"}
              disabled={loading}
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
    padding: 5,
    backgroundColor: "#FFD700",
    width: "100%",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dangerContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    margin: 10,
    backgroundColor: "red",
  },
  textContainer: {
    margin: 10,
  },
  buttons: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: "bold",
  },
  dangerText: {
    color: "#B53105",
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
});

export default Confirmation;
