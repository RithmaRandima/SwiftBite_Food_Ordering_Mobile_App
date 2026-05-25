import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";
const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category);

  const filterData: (Category | { $id: string; name: string })[] = [
    { $id: "all", name: "All" },
    ...(categories ?? []),
  ];

  const handelPress = (id: string) => {
    setActive(id);

    if (id === "all") {
      router.setParams({ category: undefined });
    } else {
      router.setParams({ category: id });
    }
  };

  return (
    <FlatList
      data={filterData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-2"
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.$id}
          className={cn("filter")}
          style={
            Platform.OS === "android"
              ? {
                  backgroundColor: active === item.$id ? "#DC2626" : "#fff",
                  elevation: 5,
                  shadowColor: "#878787",
                }
              : {
                  backgroundColor: active === item.$id ? "#DC2626" : "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                }
          }
          onPress={() => handelPress(item.$id)}
        >
          <Text
            className={cn(
              "body-medium",
              active === item.$id ? "text-white" : "text-gray-200",
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
