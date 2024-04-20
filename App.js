import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import Header from "./components/Header";
import Body from "./components/Body";

export default function App() {
  return (
    <ImageBackground source={require("./assets/hi.jpg")} style={styles.imgene}>
      <View style={styles.container}>
        <Header />
        <Body />

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imgene: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
