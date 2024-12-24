import React, { useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";

let currentTime: any = null;
let ss = 0;
let mm = 0;
let hh = 0;
function App() {
  const [timer, setTimer] = useState("0");
  const [start, setStart] = useState("Start");
  const [lastTime, setLastTime] = useState(null);

  function startTimer() {
    if (currentTime !== null) {
      clearInterval(currentTime);
      currentTime = null;
      setStart("Start");
    } else {
      currentTime = setInterval(() => {
        setStart("Stop");
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }
        if (mm == 60) {
          mm = 0;
          hh++;
        }

        const format = (num: any) => (num < 10 ? `0${num}` : num);

        setTimer(`${format(hh)}:${format(mm)}:${format(ss)}`);
      }, 100);
    }
  }

  function resetTimer() {
    if (currentTime !== null) {
      clearInterval(currentTime);
      currentTime = null;
    }
    setLastTime(timer);
    setStart("Start");
    setTimer("0");
    ss = 0;
    mm = 0;
    hh = 0;
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/crono.png")} />
      <Text style={styles.stopwatch}> {timer} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={[styles.btn, {}]} onPress={startTimer}>
          <Text style={[styles.btnLabel, {}]}>{start}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: "#FFA500",
              borderWidth: 0,
            },
          ]}
          onPress={resetTimer}
        >
          <Text style={[styles.btnLabel, {}]}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.lastTime]}>
        {" "}
        {lastTime ? `Last Time: ${lastTime}` : ""}{" "}
      </Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  stopwatch: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -160,
  },
  btnArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 180,
  },
  btn: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "#313131",
    borderRadius: 10,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLabel: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  lastTime: {
    marginTop: 30,
    color: "#ffffff",
    fontSize: 25,
    fontStyle: "italic",
  },
});
