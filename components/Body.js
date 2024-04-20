import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { db, ref, onValue, update } from "../firebase";
import { useEffect } from "react";
import axios from 'axios';
export default function Body() {
  const [isOn1, setIsOn1] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [ledOne, setledOne] = useState("OFF");
  const [ledTwo, setledTwo] = useState("OFF");
  const handlePress1 = async () => {
    setIsOn1(!isOn1);
    if (isOn1) {
      setledOne("OFF");
    } else {
      setledOne("ON");
    }
    update(ref(db, `/`), {
      LED_STATUS: ledOne,
    })
  };
  const handlePress2 = () => {
    setIsOn2(!isOn2);
    if (isOn2) {
      setledTwo("OFF");
    } else {
      setledTwo("ON");
    }
    update(ref(db, `/`), {
      LED_STATUS2: ledTwo,
    });
  };

  const [temp, setTemp] = useState(61);
  const [humidity, setHumidity] = useState(40);

  useEffect(() => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      setTemp(snapshot.val().temp);
      setHumidity(snapshot.val().humid);
      if (snapshot.val().LED_STATUS2 == "OFF") {
        setIsOn2(true);
      } else {
        setIsOn2(false);
      }
      if (snapshot.val().LED_STATUS == "OFF") {
        setIsOn1(true);
      } else {
        setIsOn1(false);
      }
    });
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.text}>Humidity</Text>
          <Text style={styles.textNumber}>{humidity}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Temperature</Text>
          <Text style={styles.textNumber}>{temp}</Text>
        </View>
      </View>

      {/* phần 2 */}
      {/* Bóng 1 */}
      <View style={styles.container2}>
        <View style={styles.khung}>
          <Image
            style={styles.image}
            source={
              isOn1 == false
                ? require("../assets/sun-solid-24.png")
                : require("../assets/moon-solid-24.png")
            }
          />
        </View>
        <View>
          <TouchableOpacity onPress={handlePress1} style={styles.button}>
            <Text style={styles.buttonText}>
              {isOn1 == false ? "ON" : "Off"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bóng 2 */}
      <View style={styles.container2}>
        <View style={styles.khung}>
          <Image
            style={styles.image}
            source={
              isOn2 == false
                ? require("../assets/sun-solid-24.png")
                : require("../assets/moon-solid-24.png")
            }
          />
        </View>
        <View>
          <TouchableOpacity onPress={handlePress2} style={styles.button2}>
            <Text style={styles.buttonText}>
              {isOn2 == false ? "ON" : "Off"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    // backgroundColor: "yellow",
  },
  item: {
    width: 150,
    height: 150,
    backgroundColor: "black",
    color: "white",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginTop: 7,
  },
  textNumber: {
    marginTop: 20,
    color: "white",
    fontSize: 50,
  },
  // ***** phần 2
  container2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 70,
  },
  khung: {
    padding: 20,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  //button1
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 160,
  },
  //button2
  button2: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 160,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
