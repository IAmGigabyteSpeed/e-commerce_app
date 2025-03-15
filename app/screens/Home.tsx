import {
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { API_URL, useAuth } from "../context/AuthContext";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import Mainstyle from "../context/styles";

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  image: string;
  createdAt: string;
}

type Props = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation<Props>();
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const callProducts = async () => {
      const result = await axios.get(`${API_URL}/products/`);
      console.log(result.data);
      setProducts(result.data);
    };
    callProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <View style={Mainstyle.container}>
      <Text style={Mainstyle.title}>Welcome back {userInfo?.name}!</Text>
      <TextInput
        keyboardType="web-search"
        style={Mainstyle.searchBar}
        placeholder="Search for Products"
        value={search}
        onChangeText={(e) => setSearch(e)}
      ></TextInput>
      <Link screen="Categories">or Search by Categories</Link>
      <ScrollView contentContainerStyle={Mainstyle.scrollView}>
        <View style={Mainstyle.gridContainer}>
          {filteredProducts.map((product) => (
            <Pressable
              style={Mainstyle.productBox}
              key={product._id}
              onPress={() =>
                navigation.navigate("Product", { ProductId: product._id })
              }
            >
              <View>
                <Image
                  source={{ uri: product.image }}
                  style={Mainstyle.productImage}
                />
                <Text>{product.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Rp.{product.price}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("Transaction", { transactionId: 86 })
          }
        >
          <Text>Go to Transaction</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Home;
