import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Scan from "./../components/Scan";
import Meal from "../components/Meal";
import ProfilePhoto from "../components/ProfilePhoto";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { CafeContext } from "../context/CafeContext";

const Cafe = () => {
  let {
    handleBarCodeScanned,
    cafeUser,
    error,
    loading,
    scanned,
    updateScanned,
    selectedPeriodId,
    mark_as_eaten,
  } = useContext(CafeContext);

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <Meal />
      </View>
      {!loading && scanned && error && (
        <View style={styles.error}>
          <MaterialIcons name='error' size={100} color='red' />
          <Text style={styles.errorText}>Error: {error.toString()}</Text>
        </View>
      )}
      {!scanned && selectedPeriodId && (
        <Scan onScan={handleBarCodeScanned} scanned={scanned} />
      )}
      {!selectedPeriodId && (
        <View style={{ alignItems: "center" }}>
          <Text>እባኮን የምግብ ጊዜን ይምረጡ </Text>
          <Text>Please select the meal period first</Text>
        </View>
      )}
      {scanned && selectedPeriodId && (
        <>
          {cafeUser && (
            <View style={styles.profileContainer}>
              <ProfilePhoto
                photoUrl={cafeUser.student.photo}
                width={100}
                height={100}
              />
              <Text style={styles.boldText}>
                {`${cafeUser.student.first_name_am} ${cafeUser.student.last_name_am} \n${cafeUser.student.first_name} ${cafeUser.student.last_name}`}
              </Text>
              {!cafeUser.has_eaten && (
                <Button
                  title='አረጋግጥ Check'
                  icon='check'
                  style={{ width: "50%", backgroundColor: "green" }}
                  onPress={() => {
                    mark_as_eaten();
                  }}
                />
              )}
              {cafeUser.has_eaten && (
                <>
                  <Text style={styles.errorText}>
                    {`@${
                      cafeUser.time_checked
                        ? `${cafeUser.time_checked.slice(
                            0,
                            5
                          )} ${cafeUser.time_checked.slice(6, 8)}`
                        : ""
                    } \n${
                      cafeUser.student.gender === "M"
                        ? "በልቷል He ate"
                        : "በልታለች She ate"
                    }`}
                  </Text>

                  <Button
                    title='እለፍ Pass'
                    icon='close'
                    style={{ width: "50%", backgroundColor: "red" }}
                    onPress={() => {
                      mark_as_eaten();
                    }}
                  />
                </>
              )}
            </View>
          )}
          <View style={styles.footer}>
            <Button
              title='ሌላ ስካን አድርግ Scan Again'
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
    padding: 5,
    backgroundColor: "#FFD700",
    width: "100%",
  },
  dropdown: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
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
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
  },
});

export default Cafe;
