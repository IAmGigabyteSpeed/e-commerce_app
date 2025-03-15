import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/reduxStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import MainStyle from "../context/styles";

type Props = NativeStackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch<AppDispatch>();
  const cartItem = useSelector((state: RootState) => state.Cart.Cartitems);
  return (
    <View style={MainStyle.container}>
      <ScrollView style={MainStyle.scrollView}>
        {cartItem.map((item, index) => (
          <View key={item.id} style={MainStyle.cartList}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {index + 1}. {item.name}
            </Text>
            <Text>
              Rp.{item.price} x {item.quantity} pcs = Rp.{item.totalprice}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={[
          MainStyle.footer,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>
          Total: Rp.
          {cartItem.reduce((total, item) => total + item.totalprice, 0)}
        </Text>
        <Link screen="Payment">Pay Now</Link>
      </View>
    </View>
  );
};

export default Cart;
