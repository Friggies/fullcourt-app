import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth";

export default function App() {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
}
