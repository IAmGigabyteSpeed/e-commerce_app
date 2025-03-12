import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Home";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const Product = ({ route, navigation }: Props) => {
  const { ProductId } = route.params;
  return (
    <View>
      <Text>Product {ProductId}</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
