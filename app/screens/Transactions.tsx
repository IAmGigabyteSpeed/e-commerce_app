import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MainStyle from "../context/styles";
import axios from "axios";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

type Props = NativeStackNavigationProp<RootStackParamList>;

const Transactions = () => {
  const navigation = useNavigation<Props>();
  const { userInfo, authState } = useAuth();
  const [Transactions, setTransactions] = useState<Transcations[]>([]);
  useEffect(() => {
    const getTransaction = async () => {
      const result = await axios.get(`${API_URL}/transactions/${userInfo?.id}`);
      console.log(result.data);
      setTransactions(result.data);
    };
    getTransaction();
    console.log("End");
  }, [userInfo, authState]);
  return (
    <View style={MainStyle.container}>
      <Text>Transactions</Text>
      <ScrollView contentContainerStyle={MainStyle.scrollView}>
        {Transactions.map((Transaction) => (
          <Pressable
            style={{ backgroundColor: "white", padding: 12, borderRadius: 10 }}
            key={Transaction._id}
            onPress={() =>
              navigation.navigate("Transaction", {
                transactionId: Transaction._id,
              })
            }
          >
            <View>
              <Text style={{}}>
                {new Date(Transaction.createdAt).toLocaleString()}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Transaction ID: {Transaction._id}
              </Text>
              <Text
                style={{
                  color: Transaction.status === "pending" ? "blue" : "green",
                }}
              >
                {Transaction.status}
              </Text>
              <Text style={{ fontWeight: "bold" }}>Products Purchased:</Text>
              {Transaction.products.map((product) => (
                <View key={product._id}>
                  <Text>
                    {product.product.name} (x{product.quantity})
                  </Text>
                </View>
              ))}
              <Text>Total Price {Transaction.totalAmount}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Transactions;
