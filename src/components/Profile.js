import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import ProfileData from "./ProfileData";
import ProfilePhoto from "./ProfilePhoto";

const Profile = ({ data }) => {
  if (!data) {
    return null;
  }

  const student = data;
  const department = student.department;
  const gender = student.gender === "F" ? "Female" : "Male";
  const gender_am = student.gender === "F" ? "ሴት" : "ወንድ";
  const devices = student.devices;

  return (
    <View style={styles.container}>
      <ProfilePhoto
        photoUrl={student.photo}
        name={`${student.first_name_am} \n${student.first_name}`}
        width={"90%"}
        height={250}
      />

      <ScrollView>
        <ProfileData
          label={"ስም"}
          data={`${student.first_name_am}  ${student.last_name_am}`}
        />
        <ProfileData
          label={"Name"}
          data={`${student.first_name}  ${student.last_name}`}
        />
        <ProfileData label={"Gender"} data={`${gender_am} (${gender})`} />
        <ProfileData
          label={"Cumpus"}
          data={`${department.campus.name_am}  ${department.campus.name}`}
        />
        <ProfileData label={"Department"} data={department.name} />
        <ProfileData label={"Year"} data={student.year} />
        {student.is_active && <Text>በመማር ላይ ነው Active</Text>}

        {devices && (
          <View style={styles.deviceContainer}>
            {devices.map((device, index) => (
              <View key={index}>
                <Text style={styles.text}>Device {index + 1}</Text>
                <ProfileData label={"Type"} data={device.device_type} />
                <ProfileData label={"Model"} data={device.device_model} />
                <ProfileData label={"Serial Num"} data={device.serial_number} />
                <ProfileData label={"Date"} data={device.date_added} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    paddingHorizontal: 5,
  },
  deviceContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 30,
  },
  text: {
    fontWeight: "bold",
    color: "#00A7FF",
    fontSize: 20,
    alignSelf: "center",
  },
});

export default Profile;
