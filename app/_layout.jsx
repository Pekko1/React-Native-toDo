import { Slot, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar
                style="dark"
                backgroundColor="#f1f5f9"
                translucent={false}
            />
            <Slot />
        </SafeAreaProvider>
    );
}
