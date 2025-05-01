import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Your Profile" }} />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
        </Stack>
    );
}
