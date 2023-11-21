import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import WeatherModal from "./WeatherModal.component";
import NodeCache from "node-cache";

const weatherCache = new NodeCache({ stdTTL: 24 * 60 * 60 });

export function WeatherCity() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [nearbyCities, setNearbyCities] = useState([]);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { EXPO_PUBLIC_GOOGLE_MAPS_APIKEY, EXPO_PUBLIC_OPENWEATHER_APIKEY } =
    process.env;

  const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${EXPO_PUBLIC_OPENWEATHER_APIKEY}&units=metric&lang=pt_br`
      );
      const weatherData = response.data;
      setCityData(weatherData);
      setTemperature(weatherData.main.temp);
      setIconUrl(
        `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
      );
    } catch (error) {
      console.error("Erro ao obter dados climáticos:", error);
    }
  };

  const getNearbyCities = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=10&units=metric&appid=${EXPO_PUBLIC_OPENWEATHER_APIKEY}`
      );
      const cityData = response.data.list;
      const cityNames = cityData.map((city) => city.name);
      setNearbyCities(cityNames);
    } catch (error) {
      console.error("Erro ao buscar cidades próximas:", error);
    }
  };

  const getWeatherForecast = async (latitude, longitude) => {
    const cacheKey = `${latitude}_${longitude}_forecast`;

    const cachedForecastData = weatherCache.get(cacheKey);
    if (cachedForecastData) {
      console.log("Dados da previsão do tempo recuperados do cache.");
      setWeatherForecast(cachedForecastData);
    } else {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const forecastData = response.data.daily;

        weatherCache.set(cacheKey, forecastData);

        console.log(
          "Dados da previsão do tempo obtidos da API e armazenados em cache."
        );

        setWeatherForecast(forecastData);
      } catch (error) {
        console.error("Erro ao obter a previsão do tempo:", error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (!dataLoaded) {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        try {
          let location = await getCurrentPositionAsync({});
          setLocation(location);

          if (location.coords.latitude && location.coords.longitude) {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${EXPO_PUBLIC_GOOGLE_MAPS_APIKEY}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              const cityName = data.results[0].address_components[3].long_name;
              setCityName(cityName);
              setSelectedCity(cityName);
            }
          }

          getWeatherData(location.coords.latitude, location.coords.longitude);
          getNearbyCities(location.coords.latitude, location.coords.longitude);
          getWeatherForecast(
            location.coords.latitude,
            location.coords.longitude
          );
          setDataLoaded(true);
        } catch (error) {
          if (error instanceof Error) {
            setErrorMsg(`Error getting location: ${error.message}`);
          } else {
            setErrorMsg("An unknown error occurred");
          }
        }
      }
    })();
  }, [dataLoaded]);

  useEffect(() => {
    if (cityName) {
      setSelectedCity(cityName);
    }
  }, [cityName]);

  const handleCitySearch = async () => {
    if (search) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${EXPO_PUBLIC_OPENWEATHER_APIKEY}&units=metric&lang=pt_br`
        );
        const weatherData = response.data;
        setTemperature(weatherData.main.temp);
        setIconUrl(
          `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        );
        setSelectedCity(weatherData.name);
        setSearch("");
      } catch (error) {
        console.error("Erro ao pesquisar cidade:", error);
      }
    }
  };

  return (
    <View style={styles.weatherCity}>
      <TouchableOpacity style={styles.citySelection}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCity(value)}
          items={nearbyCities.map((city) => ({
            label: city,
            value: city,
          }))}
          Icon={() => (
            <Entypo
              name="chevron-small-down"
              size={24}
              color="#FA3235"
              style={styles.iconContainer}
            />
          )}
          placeholder={{
            label: "Cidades...",
            value: null,
            color: "#999999",
          }}
          style={{
            inputAndroid: {
              fontSize: 16,
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: "transparent",
              color: "#fff",
              flexDirection: "row",
              alignItems: "center",
            },
            iconContainer: {
              position: "absolute",
              top: "50%",
              left: 0,
              transform: [{ translateY: -12 }],
            },
          }}
          useNativeAndroidPickerStyle={false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.weather}
        onPress={() => setShowWeatherModal(true)}
      >
        <Text style={styles.temperature}>
          {temperature !== null
            ? `${temperature.toFixed(0)}°C`
            : "Carregando..."}
        </Text>
        {iconUrl && (
          <Image
            source={{ uri: iconUrl }}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      {showWeatherModal && (
        <WeatherModal
          visible={showWeatherModal}
          onDismiss={() => setShowWeatherModal(false)}
          weatherForecast={weatherForecast}
          cityData={cityData}
          temperature={temperature}
          iconUrl={iconUrl}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  citySelection: {
    flex: 1,
  },
  weather: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    color: "#999999",
    fontSize: 14,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
