import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Link } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/reduxStore";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.Cart.Cartitems);
  return (
    <View>
      <Text>Cart</Text>
      <Link screen="Payment">Purchase Now</Link>
    </View>
  );
};

export default Cart;
