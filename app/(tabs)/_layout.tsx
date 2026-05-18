import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href={"/(auth)/sign-in"} />;
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
