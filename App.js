import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./src/navigation/Stack";
import { AuthProvider } from "./src/context/AuthContext";
import { StudentProvider } from "./src/context/StudentContext";
import { CafeProvider } from "./src/context/CafeContext";

export default function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <CafeProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#00A7FF' />
            <NavigationContainer>
              <HomeStack />
            </NavigationContainer>
          </SafeAreaView>
        </CafeProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
