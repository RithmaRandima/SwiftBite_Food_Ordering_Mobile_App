import CustomButton from "@/components/CustomButton";
import CustomInputs from "@/components/CustomInputs";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password)
      return Alert.alert("Error", "Please enter name, valid email & password");

    setIsSubmitting(true);

    try {
      await createUser({ name, email, password });
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
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
        }}
        label={"Name"}
        keyboardType="email-address"
      />
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
        title="Sign Up"
        onPress={submit}
        // style,
        // textStyle,
        // leftIcon,
        isLoading={isSubmitting}
      />

      <View className="flex items-end justify-center gap-1 mt-7">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link
          href="/sign-in"
          className="basebold text-primary text-[20px] font-extrabold"
        >
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
