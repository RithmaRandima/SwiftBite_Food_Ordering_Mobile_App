import { images } from "@/assets/constants";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import useAuthStore from "@/store/auth.store";
import { BlurView } from "expo-blur";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href="/" />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.5 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="size-full"
            resizeMode="stretch"
          />

          <BlurView
            intensity={50}
            tint="dark"
            className="absolute w-full h-full justify-center pl-5"
          >
            <Image source={images.logo} className="size-32 -mt-8" />

            <Text className="text-white font-bold text-[30px] ">
              Get started now
            </Text>

            <Text className="text-white text-[16px] mt-2">
              Create an account or log in to explore
            </Text>
          </BlurView>
        </View>

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
