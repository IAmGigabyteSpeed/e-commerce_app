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
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Link, useNavigation } from "@react-navigation/native";
import MainStyle from "../context/styles";

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}
type Props = NativeStackNavigationProp<RootStackParamList>;

const Categories = () => {
  const navigation = useNavigation<Props>();
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const callCategories = async () => {
      const result = await axios.get(`${API_URL}/categories`);
      console.log(result.data);
      setCategories(result.data);
    };
    callCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    if (!search) return categories;

    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, categories]);

  return (
    <View style={MainStyle.container}>
      <Text style={MainStyle.title}>Categories</Text>
      <TextInput
        keyboardType="web-search"
        style={MainStyle.searchBar}
        placeholder="Search for Categories"
        value={search}
        onChangeText={(e) => setSearch(e)}
      ></TextInput>
      <ScrollView style={MainStyle.scrollView}>
        <View style={MainStyle.gridContainer}>
          {filteredCategories?.map((category) => (
            <Pressable
              key={category._id}
              style={MainStyle.productBox}
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
