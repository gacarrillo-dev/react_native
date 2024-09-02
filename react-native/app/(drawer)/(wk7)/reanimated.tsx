import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic here
    console.log("Login button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#6e45e2", "#88d3ce"]} style={styles.background}>
        <ThemedView style={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <LinearGradient
              colors={["#6e45e2", "#88d3ce"]}
              style={styles.loginButtonGradient}>
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.forgotPassword}>Forgot your password?</Text>

          <Text style={styles.orConnectText}>or connect with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={20} color="#3b5998" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Icon name="twitter" size={20} color="#1da1f2" />
              <Text style={styles.socialButtonText}>Twitter</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text style={styles.signUpLink}>Sign up</Text>
          </Text>
        </ThemedView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6e45e2",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    width: "100%",
    marginTop: 20,
    borderRadius: 30,
  },
  loginButtonGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 15,
    color: "#6e45e2",
  },
  orConnectText: {
    marginTop: 20,
    marginBottom: 10,
    color: "#888",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "48%",
    justifyContent: "center",
  },
  socialButtonText: {
    marginLeft: 10,
    color: "#888",
  },
  signUpText: {
    marginTop: 20,
    color: "#888",
  },
  signUpLink: {
    color: "#6e45e2",
    fontWeight: "bold",
  },
});
