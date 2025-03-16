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
  const [page, setPage] = useState(1);
  const scrollRef = useRef<ScrollView>(null);

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
      <ScrollView contentContainerStyle={Mainstyle.scrollView} ref={scrollRef}>
        <View style={Mainstyle.gridContainer}>
          {displayedItems.map((product) => (
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
      </ScrollView>
      {totalPages > 1 && (
        <View style={Mainstyle.pagination}>
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

export default Home;
