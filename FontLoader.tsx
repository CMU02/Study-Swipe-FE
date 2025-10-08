import { PropsWithChildren, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function FontLoader({ children }: PropsWithChildren) {
  const [loaded, error] = useFonts({
    "Paperlogy-Thin": require("./assets/fonts/Paperlogy-1Thin.ttf"),
    "Paperlogy-ExtraLight": require("./assets/fonts/Paperlogy-2ExtraLight.ttf"),
    "Paperlogy-Light": require("./assets/fonts/Paperlogy-3Light.ttf"),
    "Paperlogy-Regular": require("./assets/fonts/Paperlogy-4Regular.ttf"),
    "Paperlogy-Medium": require("./assets/fonts/Paperlogy-5Medium.ttf"),
    "Paperlogy-SemiBold": require("./assets/fonts/Paperlogy-6SemiBold.ttf"),
    "Paperlogy-Bold": require("./assets/fonts/Paperlogy-7Bold.ttf"),
    "Paperlogy-ExtraBold": require("./assets/fonts/Paperlogy-8ExtraBold.ttf"),
    "Paperlogy-Black": require("./assets/fonts/Paperlogy-9Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <>{children}</>;
}
