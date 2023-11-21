import React, { useCallback, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import CustomBackButton from "../../../components/CustomBackButton.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SucefullyCodeScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  handleSendCode = () => {
    // Adicione aqui a lógica de autenticação com o MongoDB.
    navigation.navigate("NewPwd");
  };

  handleResendCode = () => {};

  return (
    <View style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Código enviado com{" "}
          <Text style={styles.headerMarkedText}>sucesso</Text>!
        </Text>
        <Text style={styles.subHeaderText}>
          Digite o código de verificação recebido:
        </Text>
        <TextInput
          style={styles.otpInput}
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.accountButtons}>
          <TouchableOpacity onPress={handleResendCode}>
            <Button mode="outlined" textColor="#999999">
              Reenviar código
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendCode}>
            <Button mode="contained" textColor="#fff" buttonColor="#FA3235">
              Verificar código
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
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  otpInput: {
    color: "#fff",
    backgroundColor: "#2A3844",
    padding: 10,
    borderWidth: 0,
    borderRadius: 4,
    width: "75%",
    height: 50,
    fontSize: 20,
    textAlign: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  accountButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default SucefullyCodeScreen;
