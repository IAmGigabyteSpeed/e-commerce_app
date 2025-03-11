import { TouchableOpacity, Text } from "react-native";
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './app/screens/Cart';
import Transactions from './app/screens/Transactions';
import Payment from "./app/screens/Payment";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
const BottomTabs = () => {
  const { onLogout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerRight: () => <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "lightblue",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={onLogout}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerRight: () => <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={onLogout}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerRight: () => <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={onLogout}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>,
        }}
      />
    </Tab.Navigator>
  );
};

export const Layout = () => {
  const { authState } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.token !== null ? (
          <>
          <Stack.Screen name="App" component={BottomTabs} options={{ headerShown: false }}  />
          <Stack.Screen name="Payment" component={Payment} />
        </>
        
        ) :(<>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
