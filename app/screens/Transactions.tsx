import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState, useMemo, useRef } from "react";
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
  const [search, setSearch] = useState<string>("");
  const [Transactions, setTransactions] = useState<Transcations[]>([]);
  const [page, setPage] = useState(1);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const getTransaction = async () => {
      const result = await axios.get(`${API_URL}/transactions/${userInfo?.id}`);
      console.log(result.data);
      setTransactions(result.data);
    };
    getTransaction();
  }, [userInfo, authState]);

  const filteredTransactions = useMemo(() => {
    if (!search) return Transactions;

    return Transactions.filter((product) =>
      product._id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, Transactions]);

  const handlePagination = (Page: number) => {
    setPage(Page);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(
    (filteredTransactions?.length ?? 0) / itemsPerPage
  );
  const displayedItems = filteredTransactions?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <View style={MainStyle.container}>
      <Text style={MainStyle.title}>Your Transactions</Text>
      <TextInput
        keyboardType="web-search"
        style={MainStyle.searchBar}
        placeholder="Search for Transactions"
        value={search}
        onChangeText={(e) => setSearch(e)}
      ></TextInput>
      <ScrollView contentContainerStyle={MainStyle.scrollView} ref={scrollRef}>
        {displayedItems.map((Transaction) => (
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
                Status: {Transaction.status}
              </Text>
              <Text style={{ fontWeight: "bold" }}>Products Purchased:</Text>
              {Transaction.products.map((product) => (
                <View key={product._id}>
                  <Text>
                    - {product.product.name} (x{product.quantity})
                  </Text>
                </View>
              ))}
              <Text>
                Total Price {Transaction.totalAmount.toLocaleString("id-ID")}
              </Text>
            </View>
          </Pressable>
        ))}
        {totalPages > 1 && (
          <View style={MainStyle.pagination}>
            <Button
              title="Prev"
              onPress={() => handlePagination(Math.max(1, page - 1))}
              disabled={page === 1}
            />
            <Text>
              Page {page} of {totalPages}
            </Text>
            <Button
              title="Next"
              onPress={() => handlePagination(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Transactions;
