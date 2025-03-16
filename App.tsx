import { TouchableOpacity, Text } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "./app/screens/Cart";
import Transactions from "./app/screens/Transactions";
import Payment from "./app/screens/Payment";
import Transaction from "./app/screens/Transaction";
import Categories from "./app/screens/Categories";
import Product from "./app/screens/Product";
import Products from "./app/screens/Products";
import { Provider } from "react-redux";
import { store } from "./app/context/reduxStore";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  App: undefined;
  Login: undefined;
  Register: undefined;
  Transaction: { transactionId: string };
  Categories: undefined;
  Product: { ProductId: string };
  Products: { Category: string };
  Payment: undefined;
};

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
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Cart") {
            iconName = "cart-outline";
          } else if (route.name === "Transactions") {
            iconName = "list-outline";
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "lightblue",
                borderRadius: 5,
                marginRight: 10,
              }}
              onPress={onLogout}
            >
              <Text>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "lightblue",
                borderRadius: 5,
                marginRight: 10,
              }}
              onPress={onLogout}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "lightblue",
                borderRadius: 5,
                marginRight: 10,
              }}
              onPress={onLogout}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Layout = () => {
  const { authState } = useAuth();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {authState?.token !== null ? (
            <>
              <Stack.Screen
                name="App"
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Transaction" component={Transaction} />
              <Stack.Screen name="Categories" component={Categories} />
              <Stack.Screen name="Product" component={Product} />
              <Stack.Screen name="Products" component={Products} />
              <Stack.Screen name="Payment" component={Payment} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
