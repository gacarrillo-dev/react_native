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
import { ThemedView } from "@/components/ThemedView";
import { supabase }  from "../../supabase";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // Implement sign-up logic here
    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert(
        "Signup successful! Please check your email to confirm your account."
      );
      router.replace("/login");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#6e45e2", "#88d3ce"]} style={styles.background}>
        <ThemedView style={styles.signUpContainer}>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"#888"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"#888"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
            <LinearGradient
              colors={["#6e45e2", "#88d3ce"]}
              style={styles.signUpButtonGradient}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.orConnectText}>or connect with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={20} color="#3b5998" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Icon name="instagram" size={20} color="#dd2a7b" />
              <Text style={styles.socialButtonText}>Instagram</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Link href="/login">
              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.signInLink}>Login</Text>
              </TouchableOpacity>
            </Link>
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
  signUpContainer: {
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
  signUpButton: {
    width: "100%",
    marginTop: 20,
    borderRadius: 30,
  },
  signUpButtonGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
  signInText: {
    marginTop: 20,
    color: "#888",
  },
  signInLink: {
    color: "#6e45e2",
    fontWeight: "bold",
  },
});
