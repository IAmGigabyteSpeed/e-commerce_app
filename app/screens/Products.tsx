import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Home";

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

const Products = ({ route, navigation }: Props) => {
  const { Category } = route.params;
  return (
    <View>
      <Text>Products {Category}</Text>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
