import { View, Text, ScrollView, Image } from "react-native";
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
      <ScrollView
        contentContainerStyle={[
          MainStyle.scrollView,
          { backgroundColor: "white", padding: 10 },
        ]}
      >
        <View>
          <Text style={{ fontSize: 16 }}>
            {Transactions?.createdAt
              ? new Date(Transactions.createdAt).toLocaleString()
              : "N/A"}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Transaction {Transactions?._id}
          </Text>
          <Text
            style={{
              color: Transactions?.status === "pending" ? "blue" : "green",
            }}
          >
            Status: {Transactions?.status}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Products Purchased:
          </Text>
          {Transactions?.products.map((product) => (
            <View
              key={product._id}
              style={{
                padding: 10,
                flex: 1,
                flexDirection: "row",
                minHeight: 96,
              }}
            >
              <Image
                source={{ uri: product.product.image }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
              <View style={{ flexShrink: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {product.product.name}
                </Text>
                <Text>
                  Rp. {product.product.price.toLocaleString("id-ID")} x{" "}
                  {product.quantity}
                </Text>
              </View>
            </View>
          ))}
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Total Price: Rp. {Transactions?.totalAmount.toLocaleString("id-ID")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Transaction;
