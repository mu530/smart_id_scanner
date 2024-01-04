import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import ProfilePhoto from "../components/ProfilePhoto";
import Scan from "../components/Scan";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StudentContext } from "../context/StudentContext";

const Record = () => {
  const navigation = useNavigation();
  const [record, steRecord] = useState(null);

  let {
    handleBarCodeScanned,
    student,
    error,
    loading,
    scanned,
    updateScanned,
  } = useContext(StudentContext);

  const handleButtonPress = () => {
    data = {
      student: student.id,
      reason: record,
    };
    navigation.navigate("Confirmation", { student, record, data });
  };

  return (
    <View style={styles.container}>
      {!scanned && <Scan onScan={handleBarCodeScanned} scanned={scanned} />}
      {error &&
        scanned && ( // Conditional rendering of error screen
          <View style={styles.error}>
            <MaterialIcons name='error' size={100} color='red' />
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
      {scanned && student && (
        <>
          <View style={styles.profileContainer}>
            <ProfilePhoto photoUrl={student.photo} width={100} height={100} />
            <Text
              style={styles.name}
            >{`${student.first_name_am} ${student.last_name_am}`}</Text>
            <Text
              style={styles.name}
            >{`${student.first_name} ${student.last_name}`}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {`የ${student.first_name_am} ${student.last_name_am} መረጃ ላይ መዝገብ እያከሉ ነው። \nYou are adding recored to this ${student.first_name} ${student.last_name}'s profile`}
            </Text>
            <Text style={styles.dangerText}>
              {`ትኩረት፡ እባክዎ ትክክለኛ መረጃ ያስገቡ። በተማሪዎች ወደፊት ላይ ተጽዕኖ ያሳድራል. ዝርዝሮችን ደግመው ያረጋግጡ። እናመሰግናለን! \nAttention: Please enter correct information. It impacts students' future. Double-check details. Thank you!`}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder={"Add the recored here."}
              onChangeText={(txt) => steRecord(txt)}
              multiline={true}
            />
            <Button
              title={`አክል Submit`}
              onPress={() => handleButtonPress()}
              type={"danger"}
              disabled={!record}
            />
          </View>
        </>
      )}
      {loading && ( // Conditional rendering of loading screen
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text>Adding record...</Text>
        </View>
      )}
      {scanned && (
        <Button
          title={`ሌላ ስካን አድርግ Scan Again`}
          onPress={() => {
            updateScanned(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    backgroundColor: "#FFD700",
    width: "100%",
  },
  inputContainer: {
    marginHorizontal: "10%",
    width: "80%",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  name: {
    fontWeight: "bold",
  },
  textContainer: {
    margin: 10,
  },
  text: {
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

export default Record;
