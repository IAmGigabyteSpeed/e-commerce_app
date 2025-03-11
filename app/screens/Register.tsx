import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { Link } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const { onRegister, onLogin } = useAuth();

    const login = async () => {
      const result = await onLogin!(name,password);
      if (result && result.error){
          console.log(result)
          alert(result.msg.data.error)
      }
  }

    const register = async () => {
        const result = await onRegister!(name,email,password);
        if (result && result.error){
          console.log(result.msg)
          alert(result.msg.data.error)
        }else{
          login()
        }
    }    

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.headertext}>Register</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Username' value={name} onChangeText={(text:string) => setName(text)}/>
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text:string) => setEmail(text)}/>
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={password} onChangeText={(text:string) => setPassword(text)}/>
        <Button onPress={register} title='Register'/>  
        <Link screen="Login">Go to Login</Link>
      </View>
    </View>
    </>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#f8f8f8',
      fontFamily:"sans-serif"
  },
  form: {
      width: '80%',
      gap: 15,
  },
  headertext:{
      fontSize:40,
      paddingBottom:15,
  },
  input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      backgroundColor: '#fff',
      fontSize: 16,
  },
});