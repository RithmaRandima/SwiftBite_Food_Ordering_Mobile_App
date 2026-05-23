import { CustomInputProps } from "@/type";
import cn from "clsx";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
const CustomInputs = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <Text className="label mb-1">{label}</Text>
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#888"}
        className={cn(
          "input",
          isFocused ? "border-primary" : "border-gray-300",
        )}
      />
    </View>
  );
};

export default CustomInputs;
