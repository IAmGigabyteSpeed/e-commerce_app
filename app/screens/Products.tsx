import {
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import MainStyle from "../context/styles";

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

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

const Products = ({ route, navigation }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const callProducts = async () => {
      const result = await axios.get(
        `${API_URL}/products/category/${Category}`
      );
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

  const { Category } = route.params;
  return (
    <View style={MainStyle.container}>
      <Text style={MainStyle.title}>Products</Text>
      <TextInput
        keyboardType="web-search"
        style={MainStyle.searchBar}
        placeholder="Search for Products"
        value={search}
        onChangeText={(e) => setSearch(e)}
      ></TextInput>
      <ScrollView style={MainStyle.scrollView}>
        <View style={MainStyle.gridContainer}>
          {filteredProducts.map((product) => (
            <Pressable
              style={MainStyle.productBox}
              key={product._id}
              onPress={() =>
                navigation.navigate("Product", { ProductId: product._id })
              }
            >
              <View>
                <Image
                  source={{ uri: product.image }}
                  style={MainStyle.productImage}
                />
                <Text>{product.name}</Text>
                <Text>Rp.{product.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Products;
