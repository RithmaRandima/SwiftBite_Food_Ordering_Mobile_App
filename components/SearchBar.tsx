import { images } from "@/assets/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";
const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500,
  );

  const handelSearch = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };
  return (
    <View
      className=" my-5 relative flex flex-row items-center w-full bg-white rounded-full px-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      <TextInput
        className="flex-1 px-5 py-3"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handelSearch}
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity className="pr-5" onPress={() => console.log("search")}>
        <Image
          source={images.search}
          style={{ width: 25, height: 25 }}
          resizeMode="contain"
          tintColor="#5d5d5d"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
