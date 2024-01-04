import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  let { loginUser } = useContext(AuthContext);
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      // Display an error message or perform any validation logic here
      setError(`ስም እና የይለፍቃሎ ያስገቡ \nUsername and password are required`);
      return;
    } else {
      try {
        await loginUser(username, password);
        navigation.navigate("Home");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo width={200} height={180} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='መለያ ስም User name'
          value={username}
          onChangeText={(user) => setUserName(user)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          secureTextEntry={true}
          placeholder='የይለፍ ቃል Password'
          value={password}
          onChangeText={(psw) => setPassword(psw)}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputContainer}>
        <Button title={"ግባ Sign in"} onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD700",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00A7FF",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
