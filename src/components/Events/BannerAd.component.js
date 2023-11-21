import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const BannerAd = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "100%" }}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/2091383/pexels-photo-2091383.jpeg",
        }}
        style={styles.banner}
      >
        <View style={styles.overlay} />
        <Text style={styles.bannerText}>
          Batalha de Rima: Projeto Interventivo
        </Text>
        <Text style={styles.bannerSubText}>Clique aqui e saiba mais!</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  bannerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  bannerSubText: {
    fontSize: 14,
    color: "#999999",
  },
});

export default BannerAd;
