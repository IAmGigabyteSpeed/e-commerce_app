import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/reduxStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch<AppDispatch>();
  const cartItem = useSelector((state: RootState) => state.Cart.Cartitems);
  return (
    <View>
      <Text>Cart</Text>
      <ScrollView>
        {cartItem.map((item, index) => (
          <View key={item.id}>
            <Text>
              {index + 1}. {item.name}
            </Text>
            <Text>
              Rp.{item.price} x {item.quantity}pcs = Rp.{item.totalprice}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>
        Total: Rp.{cartItem.reduce((total, item) => total + item.totalprice, 0)}
      </Text>
      <Link screen="Payment">Purchase Now</Link>
    </View>
  );
};

export default Cart;
