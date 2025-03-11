import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

export default function Payment() {
  return (
    <View>
      <Text>Payment</Text>
      <Link screen="Home">Cancel</Link>
    </View>
  )
}

const styles = StyleSheet.create({})