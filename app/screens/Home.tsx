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
import { API_URL } from "../context/AuthContext";
import { Link, useNavigation } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

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

export type RootStackParamList = {
  Transaction: { transactionId: number };
  Product: { ProductId: number };
  Products: { Category: string };
};

type Props = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TextInput
        keyboardType="web-search"
        style={styles.searchBar}
        placeholder="Search for Products"
        value={search}
        onChangeText={(e) => setSearch(e)}
      ></TextInput>
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {filteredProducts.map((product) => (
            <Pressable
              style={styles.productBox}
              key={product._id}
              onPress={() =>
                navigation.navigate("Product", { ProductId: product._id })
              }
            >
              <View>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <Text>{product.name}</Text>
                <Text>Rp.{product.price}</Text>
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
        <Pressable
          onPress={() =>
            navigation.navigate("Product", { ProductId: 123981023 })
          }
        >
          <Text>Go to Product</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Products", { Category: "Games" })}
        >
          <Text>Go to Products</Text>
        </Pressable>
        <Link screen="Categories">Testing Categories</Link>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
  },
  scrollView: {
    flex: 1,
    paddingTop: 10,
    gap: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productImage: {
    height: 150,
    width: 150,
  },
  productBox: {
    width: "47.5%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
