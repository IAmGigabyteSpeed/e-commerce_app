import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Home";

type Props = NativeStackScreenProps<RootStackParamList, "Transaction">;

const Transaction = ({ route, navigation }: Props) => {
  const { transactionId } = route.params;
  return (
    <View>
      <Text>Transaction ID: {transactionId}</Text>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
