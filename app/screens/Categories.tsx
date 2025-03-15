import {
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Link, useNavigation } from "@react-navigation/native";

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}
type Props = NativeStackNavigationProp<RootStackParamList>;

const Categories = () => {
  const navigation = useNavigation<Props>();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const callCategories = async () => {
      const result = await axios.get(`${API_URL}/categories`);
      console.log(result.data);
      setCategories(result.data);
    };
    callCategories();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <TextInput
        keyboardType="web-search"
        style={styles.searchBar}
        placeholder="Search for Categories"
      ></TextInput>
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {categories?.map((category) => (
            <Pressable
              key={category._id}
              style={styles.productBox}
              onPress={() =>
                navigation.navigate("Products", { Category: category._id })
              }
            >
              <View>
                <Text>{category.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
