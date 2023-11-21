import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { buttonStyles } from "../Styles";

const icon = require("../../../assets/icon.png");

const deviceWidth = Dimensions.get("window").width;

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={icon}
          style={{ width: deviceWidth / 1.75, height: deviceWidth / 1.75 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Bem-vindo(a) ao </Text>
        <Text style={styles.musicMenteText}>
          <Text style={styles.redText}>Musica</Text>Mente
        </Text>
        <Text style={styles.howToAccessText}>Como deseja acessar?</Text>
      </View>
      <View style={buttonStyles.buttonContainer}>
        <View style={{ padding: 5 }}>
          <TouchableOpacity onPress={handleLogin}>
            <Button
              mode="contained"
              style={buttonStyles.button}
              buttonColor="#FA3235"
            >
              Acessar minha conta
            </Button>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5 }}>
          <TouchableOpacity onPress={handleSignup}>
            <Button
              mode="outlined"
              style={buttonStyles.button}
              textColor="#999999"
            >
              Sou novo por aqui!
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#192229",
    padding: deviceWidth / 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  welcomeText: {
    fontSize: deviceWidth / 15,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
  },
  musicMenteText: {
    fontSize: deviceWidth / 12.5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  redText: {
    color: "#FA3235",
  },
  howToAccessText: {
    fontSize: deviceWidth / 25,
    color: "#999999",
  },
});

export default WelcomeScreen;
