import { TextInput, Text, StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useState, useMemo, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'

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

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TextInput keyboardType="web-search" style={styles.searchBar} placeholder="Search for Products"></TextInput>
      <ScrollView style={styles.scrollView}>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        fontFamily:"sans-serif",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    searchBar:{
      borderWidth:1,
      fontSize:12,
    },
    scrollView: {
      flex: 1,
      paddingTop:10,
    },
});
