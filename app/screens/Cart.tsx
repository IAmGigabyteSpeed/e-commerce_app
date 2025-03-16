import { View, Text, ScrollView, Modal, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/reduxStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import MainStyle from "../context/styles";
import axios from "axios";
import { clearProducts } from "../context/cartReducer";
import { API_URL } from "../context/AuthContext";

type Props = NativeStackNavigationProp<RootStackParamList>;

interface CartRequest {
  productId: string;
  quantity: number;
}

interface Request {
  cart: CartRequest[];
  totalAmount: number;
}

const Cart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const purchaseItem = async () => {
    let cartBody: CartRequest[] = cartItem.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    let totalAmount = cartItem.reduce((sum, item) => sum + item.totalprice, 0);
    let RequestBody: Request = {
      cart: cartBody,
      totalAmount: totalAmount,
    };
    try {
      const result = await axios.post(`${API_URL}/transactions`, RequestBody);
      console.log(result);
      Alert.alert("Transaction Successful:", result.data.message);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
    dispatch(clearProducts());
    setModalVisible(!modalVisible);
  };
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch<AppDispatch>();
  const cartItem = useSelector((state: RootState) => state.Cart.Cartitems);
  return (
    <View style={MainStyle.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              minWidth: 350,
              padding: 15,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
            >
              Confirmation
            </Text>
            <Text>Would you like to proceed with your purchase?</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Pressable style={{ marginRight: 15 }} onPress={purchaseItem}>
                <Text style={{ fontWeight: "bold", color: "green" }}>
                  Continue
                </Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ fontWeight: "bold", color: "red" }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={MainStyle.scrollView}>
        {cartItem.map((item, index) => (
          <View key={item.id} style={MainStyle.cartList}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {index + 1}. {item.name}
            </Text>
            <Text>
              Rp. {item.price.toLocaleString("id-ID")} x {item.quantity} pcs =
              Rp. {item.totalprice.toLocaleString("id-ID")}
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
          {cartItem
            .reduce((total, item) => total + item.totalprice, 0)
            .toLocaleString("id-ID")}
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{ color: "blue" }}>Purchase Now</Text>
        </Pressable>
        {/* <Link screen="Payment">Pay Now</Link> */}
      </View>
    </View>
  );
};

export default Cart;
