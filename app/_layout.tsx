import { Stack } from "expo-router";
import './globals.css'; 
import AuthProvider from "@/contexts/auth-context";

export default function RootLayout() {
  return (
    <Stack>
      <AuthProvider>
        <Stack.Screen 
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="register"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="prediction/[id]"
          options={{
            headerShown: false
          }}
        />
      </AuthProvider>
    </Stack>
  );
}
