import { images, offers } from "@/assets/constants";
import CartButton from "@/components/CartButton";
import useAuthStore from "@/store/auth.store";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Promo banner */}
      <View className="px-7 py-5">
        <View className="flex-row items-center justify-between px-4">
          <Text className="text-primary text-[30px] font-extrabold ">
            SwiftBite.
          </Text>

          {/* Right: Greeting */}
          <View className="flex-1 items-end">
            {/* Offer text*/}
            <Text className="h2-bold text-dark-100 text-[20px] font-bold mb-1">
              Fast • Fresh • Delivered
            </Text>
            <Text className="text-sm text-dark-200 mt-1">
              Handpicked deals just for you.
            </Text>
            <Text className="text-gray-400 text-[14px] mt-1">
              🍽️ Special Offers
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <View className="flex-between flex-row w-full my-5 px-5">
              <View className="flex-start">
                <Text className="small-bold text-primary">DELIVER TO</Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">Croatia</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <CartButton />
            </View>

            {/* NEW: Section intro text */}

            <View className="ml-10 flex-row items-center justify-between">
              <Text className="text-primary font-semibold text-sm">
                🚀 Free Delivery Today
              </Text>

              {/* Footer line */}
              <Text className="text-primary text-[10px] font-semibold">
                Tap to explore →
              </Text>
            </View>
          </>
        }
        data={offers}
        renderItem={({ item, index }) => {
          const isEven: boolean = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fff" }}
              >
                <Fragment>
                  <View
                    className={cn("h-full w-1/2", isEven ? "pl-10" : "pr-10")}
                  >
                    <Image
                      source={item.image}
                      className="size-full"
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    className={cn(
                      "offer-card__info",
                      isEven ? "pl-10" : "pr-10",
                    )}
                  >
                    <Text className="h1-bold text-white leading-tight">
                      {item.title}
                    </Text>

                    {/* NEW: small hint text */}
                    <Text className="text-white/80 text-xs mt-1">
                      Tap to explore deals
                    </Text>

                    <Image
                      source={images.arrowRight}
                      className="size-10"
                      resizeMode="contain"
                      tintColor={"#fff"}
                    />
                  </View>
                </Fragment>
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-8"
        // NEW: Footer spacing + subtle closing message
        ListFooterComponent={
          <View className="mt-6 items-center">
            <Text className="text-xs text-gray-400">
              Fresh deals updated daily ✨
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
