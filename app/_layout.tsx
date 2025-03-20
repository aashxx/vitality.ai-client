import { Stack } from "expo-router";
import './globals.css'; 
import AuthProvider from "@/contexts/auth-context";
import HistoryProvider from "@/contexts/history-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <Stack>
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
            name="history"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="create-profile"
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
          <Stack.Screen 
            name="recommendation/[id]"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </HistoryProvider>
    </AuthProvider>
  );
}
