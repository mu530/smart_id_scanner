import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Scanner from "../screens/Scanner";
import StudentProfile from "../screens/StudentProfile";
import Login from "../screens/Login";
import Record from "../screens/Record";
import Cafe from "../screens/Cafe";
import Confirmation from "../screens/Confirmation";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00A7FF",
        },
        headerTintColor: "#FFD700",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Scanner' component={Scanner} />
      <Stack.Screen name='Add Record' component={Record} />
      <Stack.Screen name='Student Profile' component={StudentProfile} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Cafe' component={Cafe} />
      <Stack.Screen name='Confirmation' component={Confirmation} />
    </Stack.Navigator>
  );
}

export default HomeStack;
