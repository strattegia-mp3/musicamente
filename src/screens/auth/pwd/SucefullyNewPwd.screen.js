import React, { useCallback } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import CustomBackButton from "../../../components/CustomBackButton.component";
import { buttonStyles } from "../../Styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const NewPwdScreen = ({ navigation }) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  handleWelcome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View
        style={[
          styles.content,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={[styles.headerText, { textAlign: "center" }]}>
          Senha alterada com
          <Text style={styles.headerMarkedText}> sucesso</Text>!
        </Text>
        <View style={{ paddingTop: 25 }}>
          <Text style={styles.text}>
            Verifique o seu <Text style={styles.text}>email</Text>!
          </Text>
          <Text style={styles.text}>
            Mandamos um link de ativação de sua nova senha por lá.
          </Text>
          <Text style={styles.text}>
            Caso não encontre em sua caixa de entrada, verifique a sua caixa de{" "}
            <Text
              style={{ color: "#FA3235", fontSize: 14, textAlign: "center" }}
            >
              SPAM
            </Text>
            !
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleWelcome}>
          <Button
            mode="contained"
            textColor="#fff"
            buttonColor="#FA3235"
            style={buttonStyles.button}
          >
            Voltar à página inicial
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192229",
    paddingHorizontal: deviceWidth / 25,
    paddingVertical: deviceHeight / 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    marginTop: 30,
    textAlign: "center",
  },
  headerMarkedText: {
    color: "#FA3235",
    fontSize: 28,
  },
  subHeaderText: {
    color: "#999999",
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: "#999999",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 3,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewPwdScreen;
