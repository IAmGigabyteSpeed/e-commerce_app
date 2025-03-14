import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MainStyle from "../context/styles";
import axios from "axios";
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

const Transactions = () => {
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
          <View
            style={{ backgroundColor: "white", padding: 12, borderRadius: 10 }}
            key={Transaction._id}
          >
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
        ))}
      </ScrollView>
    </View>
  );
};

export default Transactions;
