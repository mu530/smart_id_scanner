import React, { useState, useEffect, useIsFocused, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  let { user, logoutUser } = useContext(AuthContext);

  const navigation = useNavigation();

  const getIconsArray = () => {
    if (!user) {
      return [
        {
          title: `መገለጫ \Profile`,
          onPress: () => navigation.navigate("Student Profile"),
          icon: "person",
        },
        {
          title: "Log in",
          onPress: () => navigation.navigate("Login"),
          icon: "login",
        },
      ];
    } else {
      const icons = [
        {
          title: `መገለጫ \Profile`,
          onPress: () => navigation.navigate("Student Profile"),
          icon: "person",
        },
        {
          title: `መዝገብ አክል \nAdd Record`,
          onPress: () => navigation.navigate("Add Record"),
          icon: "add-comment",
        },
        { title: `ውጣ \nLog out`, onPress: () => logoutUser(), icon: "logout" },
      ];
      if (
        user.role === "ADMIN" ||
        user.role === "REGISTRAR" ||
        user.role === "CAFE_STAFF"
      ) {
        icons.unshift({
          title: `ካፌ \nCafe`,
          onPress: () => navigation.navigate("Cafe"),
          icon: "emoji-food-beverage",
        });
      }
      return icons;
    }
  };

  const icons = getIconsArray();

  const renderIcons = () => {
    return icons.map((icon, index) => (
      <View key={index} style={styles.iconContainer}>
        <Icon
          title={icon.title}
          onPress={icon.onPress}
          icon={icon.icon}
          width={100}
          height={100}
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo width={200} height={180} />
        <Text style={styles.text}>ጎንደር ዩኒቨርሲቲ </Text>
        <Text style={styles.text}>የተማሪ መለያ ስርዓት</Text>
        <Text style={styles.text}>University of Gondar </Text>
        <Text style={styles.text}>Student identification system</Text>
      </View>
      <View style={styles.iconsWrapper}>{renderIcons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    justifyContent: "flex-start",
  },
  iconsWrapper: {
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconContainer: {
    margin: 6,
  },
  logo: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default Home;
