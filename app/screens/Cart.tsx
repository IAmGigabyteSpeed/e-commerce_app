import { View, Text } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

const Cart = () => {
  return (
    <View>
      <Text>Cart</Text>
      <Link screen="Payment">Purchase Now</Link>
    </View>
  )
}

export default Cart