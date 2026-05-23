import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/sign-in" />
  );
}
