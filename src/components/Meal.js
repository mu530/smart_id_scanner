import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CafeContext } from "../context/CafeContext";

const MealPeriodDropdown = () => {
  let {
    error,
    loading,
    selectedPeriod,
    mealPeriods,
    showOptions,
    fetchMeal,
    handleMealSelect,
    updateShowOption,
  } = useContext(CafeContext);

  useEffect(() => {
    fetchMeal();
  }, [selectedPeriod]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text>Searching meal periods...</Text>
        </View>
      )}
      {!loading && error && (
        <View style={styles.error}>
          <MaterialIcons name='error' size={100} color='red' />
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      {!loading && mealPeriods && (
        <>
          <TouchableOpacity
            onPress={() => updateShowOption()}
            style={styles.selectedOption}
          >
            <Text style={styles.optionText}>
              {selectedPeriod
                ? `${selectedPeriod.meal_period_am} \n${selectedPeriod.meal_period}`
                : "የምግብ ጊዜን ይምረጡ Select a meal period"}
            </Text>
          </TouchableOpacity>
          {showOptions && (
            <View style={styles.optionsContainer}>
              {mealPeriods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  onPress={() => handleMealSelect(period)}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>
                    {`${period.meal_period_am} \n${period.meal_period}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00A7FF",
    backgroundColor: "#00A7FF",
    borderRadius: 5,
    padding: 10,
  },
  selectedOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionsContainer: {
    position: "absolute",
    top: "200%",
    left: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: 5,
    backgroundColor: "#00A7FF",
    padding: 10,
    zIndex: 1,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: 18,
  },
});

export default MealPeriodDropdown;
