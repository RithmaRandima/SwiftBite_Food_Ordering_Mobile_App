import {
  appWriteConfig,
  databases,
  getCategoryById,
  getCustomization,
} from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { getCustomization } from "@/lib/appwrite";

export default function Product() {
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState<any>(null);
  const [customizations, setCustomizations] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const res = await databases.getDocument(
        appWriteConfig.databaseId,
        appWriteConfig.menuCollectionId,
        id as string,
      );

      setProduct(res);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCustomizations = async () => {
      try {
        const res = await getCustomization();
        setCustomizations(res.documents); // Appwrite returns { documents: [] }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomizations();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!product?.categories) return;

      try {
        const res = await getCategoryById(product.categories);
        setCategory(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, [product]);

  if (!product) return <Text>Loading...</Text>;

  const imageUrl = `${product.image_url}?project=${appWriteConfig.projectId}`;

  return (
    <ScrollView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-5 pt-12">
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="search" size={24} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 flex-row mt-8">
        {/* TITLE */}
        <View className="px-5">
          <Text className="text-2xl font-bold">{product?.name}</Text>
          <Text className="text-gray-400 mt-1 font-semibold text-[17px]">
            {category?.name}
          </Text>

          {/* RATING */}
          <View className="flex-row items-center mt-5">
            <Text className="text-yellow-500">⭐</Text>
            <Text className="ml-1 font-semibold">{product.rating}/5</Text>
          </View>

          {/* PRICE */}
          <Text className="text-[30px] mt-7 font-extrabold text-primary">
            ${product?.price.toFixed(2)}
          </Text>

          {/* NUTRITION */}
          <View className="flex-row gap-5 mt-7">
            <View className="items-start">
              <Text className="text-gray-400 text-[14px]">Calories</Text>
              <Text className="font-bold  text-[14px]">{product.calories}</Text>
            </View>

            <View className="items-start">
              <Text className="text-gray-400  text-[14px]">Protein</Text>
              <Text className="font-bold  text-[14px]">{product.protein}g</Text>
            </View>
          </View>

          {/* type */}
          <View className="mt-10">
            <Text className="text-gray-400 text-xs my-2">{category?.name}</Text>
            <Text className="font-bold text-sm">{category?.description}</Text>
          </View>
        </View>

        {/* IMAGE */}
        <View className="items-center relative -ml-7">
          <Image
            source={{ uri: imageUrl }}
            className="w-[350px] h-[350px]"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* DELIVERY INFO */}
      <View className="flex-row bg-primary/5 justify-between items-center py-5 px-8 m-6 mb-4 rounded-2xl">
        {/* DELIVERY */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="bicycle" size={20} color={"#EF4444"} />
          <Text className="text-[13px] font-semibold">Free Delivery</Text>
        </View>

        {/* TIME */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="time" size={20} color={"#EF4444"} />
          <Text className="text-[13px] font-semibold">20 - 30 mins</Text>
        </View>

        {/* RATING */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="star" size={20} color={"#EF4444"} />
          <Text className="text-[13px] font-semibold">4.5</Text>
        </View>
      </View>
      {/* DESCRIPTION */}
      <View className="px-5 mt-6">
        <Text className="text-slate-500 leading-7 tracking-[1px] ">
          Crafted with fresh ingredients and packed with rich flavor, this
          delicious food item is prepared to satisfy your cravings with every
          bite. Made using high-quality ingredients, it offers the perfect
          balance of taste, texture, and freshness. Carefully seasoned and
          cooked to perfection, it delivers a mouthwatering experience that
          pairs beautifully with your favorite sides and drinks. Whether you're
          enjoying it for lunch, dinner, or a quick snack, this meal is designed
          to be both comforting and satisfying.
        </Text>
      </View>

      {/* TOPPINGS */}
      <View className="px-5 mt-12">
        <Text className="font-bold mb-3 text-[17px]">Toppings</Text>

        <FlatList
          data={customizations.filter(
            (item) => item.type?.toLowerCase() === "topping",
          )}
          keyExtractor={(item) => item.$id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-primary/10 px-4 py-3 rounded-2xl flex-row items-center gap-2">
              <Text className="text-sm font-semibold text-primary">
                {item.name}
              </Text>

              {item.price && (
                <Text className="text-xs text-gray-500">+${item.price}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* side */}
      <View className="px-5 mt-12">
        <Text className="font-bold mb-3 text-[17px]">Side Options</Text>

        <FlatList
          data={customizations.filter(
            (item) => item.type?.toLowerCase() === "side",
          )}
          keyExtractor={(item) => item.$id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-primary/10 px-4 py-3 rounded-2xl flex-row items-center gap-2">
              <Text className="text-sm font-semibold text-primary">
                {item.name}
              </Text>

              {item.price && (
                <Text className="text-xs text-gray-500">+${item.price}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ADD BUTTON */}
      <View className="px-5 mt-14 mb-10">
        <TouchableOpacity className="bg-primary py-4 rounded-2xl items-center">
          <Text className="text-white font-bold text-lg">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
