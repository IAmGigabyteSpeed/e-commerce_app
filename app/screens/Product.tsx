import { Text, View, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addQuantity } from "../context/cartReducer";
import { RootState, AppDispatch } from "../context/reduxStore";
import MainStyle from "../context/styles";

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

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalprice: number;
}

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const Product = ({ route }: Props) => {
  const { ProductId } = route.params;
  const cartInfo = useSelector((state: RootState) => state.Cart.Cartitems);
  const inCart = cartInfo.find((cart) => cart.id === ProductId);
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const callProducts = async () => {
      const result = await axios.get(`${API_URL}/products/${ProductId}`);
      setProduct(result.data);
    };
    callProducts();
  }, [ProductId]);

  const handleAddToCart = (
    id: string,
    name: string,
    price: number,
    quantity: number
  ) => {
    const item: CartItem = {
      id,
      name,
      price,
      quantity,
      totalprice: price * quantity,
    };
    dispatch(addProduct(item));
  };

  const handleAddQtyToCart = (id: string) => {
    dispatch(addQuantity(id));
  };

  return (
    <View style={MainStyle.prodcontainer}>
      <ScrollView style={MainStyle.prodscrollView}>
        <Image
          source={{ uri: product?.image }}
          style={MainStyle.productDetImage}
        />
        <Text style={MainStyle.productPrice}>Rp.{product?.price}</Text>
        <Text style={MainStyle.productTitle}>{product?.name}</Text>
        <Text>{product?.category.name}</Text>
        <Text style={MainStyle.productDescriptionTitle}>Description</Text>
        <Text style={MainStyle.productDescription}>{product?.description}</Text>
        <Text>Quantity: {product?.stock}</Text>
      </ScrollView>

      {product && (
        <View style={MainStyle.footer}>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "lightblue",
              borderRadius: 5,
              marginRight: 10,
              width: "auto",
            }}
            onPress={() =>
              inCart
                ? handleAddQtyToCart(product._id)
                : handleAddToCart(product._id, product.name, product.price, 1)
            }
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {inCart ? "+ Add Quantity" : "+ Add to Cart"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Product;
