import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MainStyle from "../context/styles";
import axios from "axios";
import { API_URL, useAuth } from "../context/AuthContext";
interface Products {
  product: string;
  quantity: number;
}
interface Transcations {
  _id: string;
  user: string;
  products: Products;
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
      console.log(result.data.message);
      setTransactions(result.data);
    };
    getTransaction();
  }, []);
  return (
    <View style={MainStyle.container}>
      <Text>Transactions</Text>
      <ScrollView contentContainerStyle={MainStyle.scrollView}>
        {Transactions.map((Transaction) => (
          <View key={Transaction._id}>
            <Text>{Transaction._id}</Text>
            <Text>{Transaction.user}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Transactions;
