import {
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState, useMemo, useRef } from "react";
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
  const [page, setPage] = useState(1);
  const scrollRef = useRef<ScrollView>(null);
  const [catName, setCatName] = useState<string>("");

  useEffect(() => {
    const callProducts = async () => {
      const result = await axios.get(
        `${API_URL}/products/category/${Category}`
      );
      console.log(result.data);
      setProducts(result.data);

      const catResult = await axios.get(`${API_URL}/categories/${Category}`);
      console.log(catResult.data);
      setCatName(catResult.data.name);
    };
    callProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handlePagination = (Page: number) => {
    setPage(Page);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil((filteredProducts?.length ?? 0) / itemsPerPage);
  const displayedItems = filteredProducts?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const { Category } = route.params;
  return (
    <View style={MainStyle.container}>
      <Text style={MainStyle.title}>Products in {catName}</Text>
      <TextInput
        keyboardType="web-search"
        style={MainStyle.searchBar}
        placeholder="Search for Products"
        value={search}
        onChangeText={(e) => setSearch(e)}
      ></TextInput>
      <ScrollView contentContainerStyle={MainStyle.scrollView} ref={scrollRef}>
        <View style={MainStyle.gridContainer}>
          {displayedItems.map((product) => (
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
                <Text>Rp.{product.price.toLocaleString("id-ID")}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    </View>
  );
};

export default Products;
