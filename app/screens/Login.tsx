import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [name, setname] = useState(``);
  const [password, setPassword] = useState(``);
  const { onLogin } = useAuth();

  const login = async () => {
    console.log(name);
    console.log(password);
    const result = await onLogin!(name, password);
    if (result && result.error) {
      console.log(result);
      alert(result.msg.data.error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.headertext, { fontWeight: "bold" }]}>Login</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={name}
            onChangeText={(text: string) => setname(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
          <Button color="#72966d" onPress={login} title="Login" />
          <Link style={{ textAlign: "center" }} screen="Register">
            Go to Register
          </Link>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f8f8f8",
    fontFamily: "sans-serif",
  },
  form: {
    width: "80%",
    gap: 15,
  },
  headertext: {
    fontSize: 40,
    paddingBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});
