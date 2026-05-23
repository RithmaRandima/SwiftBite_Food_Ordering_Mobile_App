import { images } from "@/assets/constants";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className="items-center justify-center mt-12 min-w-[65px]">
      <View
        className={cn(
          "items-center justify-center rounded-full size-12",
          focused ? "bg-primary/15" : "bg-transparent",
        )}
      >
        <Image
          source={icon}
          className="size-7"
          resizeMode="contain"
          tintColor={focused ? "#EF4444" : "#9CA3AF"}
        />
      </View>

      <Text
        numberOfLines={1}
        className={cn(
          "text-[14px] text-center font-quicksand-semibold",
          focused ? "text-primary" : "text-gray-400",
        )}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          marginHorizontal: 20,

          height: 85,

          borderRadius: 999,

          backgroundColor: "#FFFFFF",

          borderTopWidth: 0,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.08,
          shadowRadius: 20,

          elevation: 10,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" icon={images.home} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" icon={images.search} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              icon={images.person}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
