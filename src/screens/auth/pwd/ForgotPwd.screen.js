import React, { useCallback, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { buttonStyles } from "../../Styles";
import CustomBackButton from "../../../components/CustomBackButton.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const ForgotPwdScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState("");

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  handleSendMethod = () => {
    // Adicione aqui a lógica de autenticação com o MongoDB.
    navigation.navigate("SucefullyCode");
  };

  const toggleOption = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setUserInput("");
    } else {
      setSelectedOption(option);
      setUserInput("");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "O telefone deve conter apenas números")
      .required("O telefone é obrigatório"),
  });

  return (
    <View style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Esqueceu sua <Text style={styles.headerMarkedText}>senha</Text>?
        </Text>
        <Text style={styles.subHeaderText}>
          Selecione uma opção para receber o código de alteração de senha!
        </Text>
        <View style={[styles.passwordActions, { marginTop: 25 }]}>
          <View style={styles.rememberPasswordContainer}>
            <Checkbox
              status={selectedOption === "email" ? "checked" : "unchecked"}
              onPress={() => toggleOption("email")}
              color="#FA3235"
            />
            <Text style={styles.checkForgotPasswordText}>Email</Text>
          </View>
          <View style={styles.rememberPasswordContainer}>
            <Checkbox
              status={selectedOption === "phone" ? "checked" : "unchecked"}
              onPress={() => toggleOption("phone")}
              color="#FA3235"
            />
            <Text style={styles.checkForgotPasswordText}>Telefone</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSendMethod}>
          <Button
            mode="contained"
            textColor="#fff"
            buttonColor="#FA3235"
            style={buttonStyles.button}
          >
            Enviar código
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  rememberPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  checkForgotPasswordText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
  input: {
    color: "#fff",
    backgroundColor: "#2A3844",
    padding: 10,
    borderWidth: 0,
    borderRadius: 4,
    width: "80%",
    textAlign: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default ForgotPwdScreen;
