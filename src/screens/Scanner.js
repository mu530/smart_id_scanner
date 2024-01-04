import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Bounding from "../components/Bounding";
import Button from "../components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Scanner = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { to } = route.params;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useFocusEffect(() => {
    setScanned(false);
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Scan QR Code",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
      headerTintColor: "#FFF",
      headerStyle: { backgroundColor: "#FFD700" },
    });
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        key={scanned ? "scanner-1" : "scanner-2"}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Bounding />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFD700",
  },
});

export default Scanner;
