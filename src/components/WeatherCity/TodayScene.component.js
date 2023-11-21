import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-paper";

const TodayScene = ({ temperature, iconUrl, cityData }) => {
  const { name, sys, weather, main } = cityData;
  console.log(cityData)
  return (
    <View style={styles.todaySceneContainer}>
      <View style={styles.header}>
        <Text style={styles.cityName}>
          {name}, {sys.country}
        </Text>
        <Image
          source={{
            uri: `https://flagcdn.com/w40/${sys.country.toLowerCase()}.png`,
          }}
          style={styles.countryFlag}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      <Text style={styles.temperature}>{temperature.toFixed(1)}°C</Text>
      <Text style={styles.thermalSensation}>
        Sensação Térmica: {main.feels_like.toFixed(1)}°C
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: iconUrl }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.weatherDescription}>{weather[0].description}</Text>
      </View>
      {/* <View style={styles.infos}>
        <Icon source="water-percent" size={26} color="#fff" />
        <Text style={styles.mainInfo}> {main.humidity}%</Text>
      </View>
      <View style={styles.infos}>
        <Icon source="gauge" size={24} color="#fff" />
        <Text style={styles.mainInfo}> {main.pressure} hPa</Text>
      </View>
      <View style={styles.infos}>
        <Icon source="gauge" size={24} color="#fff" />
        <Text style={styles.mainInfo}> {main.pressure} hPa</Text>
      </View>
      <View style={styles.infos}>
        <Icon source="gauge" size={24} color="#fff" />
        <Text style={styles.mainInfo}> {main.pressure} hPa</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  todaySceneContainer: {
    flex: 2,
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  countryFlag: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
  date: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FA3235",
  },
  thermalSensation: {
    color: "#999999",
    marginBottom: 10,
  },
  weatherIcon: {
    width: 32,
    height: 32,
    marginBottom: 10,
    marginRight: 2.5,
  },
  weatherDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "#fff",
    textTransform: "capitalize",
  },
  infos: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainInfo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 2.5,
  },
});

export default TodayScene;
