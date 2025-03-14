import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Home";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";

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

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const Product = ({ route, navigation }: Props) => {
  const [product, setProduct] = useState<Product>();
  const { ProductId } = route.params;
  useEffect(() => {
    const callProducts = async () => {
      const result = await axios.get(`${API_URL}/products/${ProductId}`);
      console.log(result.data);
      setProduct(result.data);
    };
    callProducts();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: product?.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product?.name}</Text>
        <Text style={styles.productPrice}>Rp.{product?.price}</Text>
        <Text>{product?.category.name}</Text>
        <Text style={styles.productDescriptionTitle}>Description</Text>
        <Text style={styles.productDescription}>{product?.description}</Text>
        <Text>Quantity: {product?.stock}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "lightblue",
            borderRadius: 5,
            marginRight: 10,
            width: "auto",
          }}
        >
          <Text
            style={{ color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            + Add to Cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    fontFamily: "sans-serif",
  },
  scrollView: {
    padding: 32,
    paddingBottom: 80,
  },
  productImage: {
    height: 300,
    width: "auto",
  },
  productTitle: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: 24,
  },
  productDescriptionTitle: {
    fontSize: 18,
  },
  productDescription: {
    fontSize: 16,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
