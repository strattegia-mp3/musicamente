import React, { useState } from "react";
import { Modal, Text, View, StyleSheet, Image, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import TodayScene from "./TodayScene.component";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, "EEEEEE", { locale: ptBR });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1) + ".";
};

const mapWeatherCodeToIcon = (weatherCode, isDay) => {
  const prefix = isDay ? "d" : "n";
  const iconCodes = {
    0: "01",
    1: "01",
    2: "02",
    3: "03",
    45: "50",
    48: "50",
    51: "09",
    53: "09",
    55: "09",
    56: "13",
    57: "13",
    61: "10",
    63: "10",
    65: "10",
    66: "13",
    67: "13",
    71: "13",
    73: "13",
    75: "13",
    77: "13",
    80: "10",
    81: "10",
    82: "10",
    85: "13",
    86: "13",
    95: "11",
    96: "11",
    99: "11",
  };

  const iconCode = iconCodes[weatherCode];

  if (iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}${prefix}@2x.png`;
  } else {
    console.log("Icon URL: ERRO!");
  }
};

const WeatherDay = ({ date, maxTemp, minTemp, weatherCode }) => {
  const iconUrl = mapWeatherCodeToIcon(weatherCode, true);

  return (
    <View style={styles.weatherDayContainer}>
      <Text style={[styles.weatherDayText, { color: "#FA3235" }]}>
        {formatDate(date)}
      </Text>
      {weatherCode >= 0 && weatherCode <= 99 ? (
        <View style={{ marginHorizontal: 5 }}>
          <Image source={{ uri: iconUrl }} style={styles.weatherDayIcon} />
        </View>
      ) : (
        <View style={{ marginHorizontal: 5 }}>
          <MaterialCommunityIcons
            name="robot-confused"
            size={18}
            color="#737E86"
          />
        </View>
      )}
      <Text style={[styles.weatherDayText, { marginHorizontal: 5 }]}>
        Max. {maxTemp}°C
      </Text>
      <Text style={styles.weatherDayText}>Min. {minTemp}°C</Text>
    </View>
  );
};

const SevenDaysScene = ({ weatherForecast }) => (
  <View style={styles.sevenDaysSceneContainer}>
    <Text style={styles.sevenDaysSceneText}>
      Previsão aos próximos sete dias
    </Text>
    {weatherForecast.time.map((date, index) => (
      <WeatherDay
        key={index}
        date={date}
        maxTemp={weatherForecast.temperature_2m_max[index]}
        minTemp={weatherForecast.temperature_2m_min[index]}
        weatherCode={weatherForecast.weather_code[index]}
      />
    ))}
  </View>
);

const WeatherModal = ({
  visible,
  onDismiss,
  weatherForecast,
  temperature,
  cityData,
  iconUrl,
}) => {
  const draggedDown = new Animated.Value(0);
  const modalHeight = 500;
  console.log(cityData);
  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: draggedDown,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(draggedDown, {
        toValue: 0,
        tension: 30,
        friction: 10,
        useNativeDriver: false,
      }).start();

      if (event.nativeEvent.translationY > modalHeight * 0.7) {
        onDismiss();
      }
    }
  };

  const renderScene = SceneMap({
    today: () => (
      <TodayScene
        temperature={temperature}
        iconUrl={iconUrl}
        cityData={cityData}
      />
    ),
    sevenDays: () => <SevenDaysScene weatherForecast={weatherForecast} />,
  });

  const [index, setIndex] = useState(0);
  const routes = [
    { key: "today", title: "Hoje" },
    { key: "sevenDays", title: "Previsão" },
  ];

  return (
    <GestureHandlerRootView>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onDismiss}
      >
        <View style={styles.modalContainer}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.modal,
                { transform: [{ translateY: draggedDown }] },
              ]}
            >
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    labelStyle={styles.tabLabel}
                    style={styles.tabBar}
                    indicatorStyle={styles.tabIndicator}
                  />
                )}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    width: "100%",
    height: "60%",
    backgroundColor: "#192229",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  weatherDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherDayText: {
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
  weatherDayIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  sevenDaysSceneContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sevenDaysSceneText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  tabLabel: {
    fontSize: 14,
    color: "#fff",
  },
  tabBar: {
    backgroundColor: "#192229",
  },
  tabIndicator: {
    backgroundColor: "#FA3235",
  },
  closeButton: {
    borderRadius: 5,
    marginTop: 50,
  },
});

export default WeatherModal;
