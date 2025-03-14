import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Link } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Cart = () => {
  useEffect(() => {
    const getCart = async () => {
      const cartList = await SecureStore.getItemAsync("cart-list");
      console.log(cartList);
    };
  }, []);
  return (
    <View>
      <Text>Cart</Text>
      <Link screen="Payment">Purchase Now</Link>
    </View>
  );
};

export default Cart;
