import CustomButton from "@/components/CustomButton";
import CustomInputs from "@/components/CustomInputs";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password)
      return Alert.alert("Error", "Please enter valid email & password");

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      Alert.alert("Success", "User signed is successfully.");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-[40px] p-8 pt-16 -mt-12 h-full">
      <CustomInputs
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
        }}
        label={"Email"}
        keyboardType="email-address"
      />

      <CustomInputs
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
        }}
        label={"Password"}
        keyboardType="email-address"
      />
      <CustomButton
        title="Sign In"
        onPress={submit}
        // style,
        // textStyle,
        // leftIcon,
        isLoading={isSubmitting}
      />

      <View className="flex items-end justify-center gap-1 mt-7">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link
          href="/sign-up"
          className="basebold text-primary text-[20px] font-extrabold"
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
