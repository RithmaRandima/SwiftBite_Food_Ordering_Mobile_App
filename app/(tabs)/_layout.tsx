import { Tabs } from "expo-router";

export default function TabsLayout() {
  const isAuthenticated = true;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="profile" /> */}
    </Tabs>
  );
}
