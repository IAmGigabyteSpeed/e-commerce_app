import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MainStyle from "../context/styles";
import axios from "axios";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { API_URL, useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
}

interface ProductBought {
  product: Product;
  quantity: number;
  _id: string;
}

interface Transcations {
  _id: string;
  user: string;
  products: ProductBought[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}

type Props = NativeStackScreenProps<RootStackParamList, "Transaction">;

const Transaction = ({ route, navigation }: Props) => {
  const { transactionId } = route.params;
  const { userInfo, authState } = useAuth();
  const [Transactions, setTransactions] = useState<Transcations>();
  useEffect(() => {
    const getTransaction = async () => {
      const result = await axios.get(
        `${API_URL}/transactions/${userInfo?.id}/${transactionId}`
      );
      setTransactions(result.data);
    };
    getTransaction();
  }, [userInfo, authState]);
  return (
    <View style={MainStyle.container}>
      <Text>Transactions {transactionId}</Text>
      <ScrollView
        contentContainerStyle={[
          MainStyle.scrollView,
          { backgroundColor: "white", padding: 10 },
        ]}
      >
        <View>
          <Text style={{}}>
            {Transactions?.createdAt
              ? new Date(Transactions.createdAt).toLocaleString()
              : "N/A"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Transaction ID: {Transactions?._id}
          </Text>
          <Text
            style={{
              color: Transactions?.status === "pending" ? "blue" : "green",
            }}
          >
            {Transactions?.status}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Products Purchased:</Text>
          {Transactions?.products.map((product) => (
            <View key={product._id}>
              <Text>{product.product.name}</Text>
              <Text>
                Rp.{product.product.price} x {product.quantity} = Rp.
                {product.product.price * product.quantity}
              </Text>
            </View>
          ))}
          <Text>Total Price Rp.{Transactions?.totalAmount}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Transaction;
