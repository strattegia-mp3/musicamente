import React, { useCallback, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import CustomBackButton from "../../../components/CustomBackButton.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const NewPwdScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  handleSendNewPwd = () => {
    // Adicione aqui a lógica de autenticação com o MongoDB.
    navigation.navigate("SucefullyNewPwd");
  };

  return (
    <View style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Digite a sua
          <Text style={styles.headerMarkedText}> nova senha</Text>!
        </Text>
        <Text style={styles.subHeaderText}>
          O controle sobre sua conta está a um passo de distância!
        </Text>
        <View>
          <Text style={styles.labelText}>Nova senha</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Digite aqui a sua nova senha..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={[styles.input, { flex: 1 }]}
              placeholderTextColor="#737E86"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={{ padding: 10 }}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="#737E86"
              />
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.labelText}>Confirme a sua nova senha</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Confirme a sua nova senha..."
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              style={[styles.input, { flex: 1 }]}
              placeholderTextColor="#737E86"
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ padding: 10 }}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="#737E86"
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.rememberPasswordContainer, { marginTop: 10 }]}>
          <Pressable
            onPress={() => setRememberPassword(!rememberPassword)}
            style={[styles.checkBox, { backgroundColor: "#2A3844" }]}
          >
            {rememberPassword && <View style={styles.checkIcon}></View>}
          </Pressable>
          <Text
            onPress={() => setRememberPassword(!rememberPassword)}
            style={styles.rememberPasswordText}
          >
            Lembrar minha senha
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSendNewPwd}>
          <Button mode="contained" textColor="#fff" buttonColor="#FA3235">
            Enviar nova senha
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
  labelText: {
    color: "#fff",
    marginTop: 10,
  },
  inputGroup: {
    marginVertical: 7,
  },
  input: {
    color: "#fff",
    backgroundColor: "#2A3844",
    marginVertical: 10,
    padding: 10,
    borderWidth: 0,
    borderRadius: 4,
  },
  passwordActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlignVertical: "center",
    marginVertical: 10,
  },
  rememberPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    alignSelf: "center",
    backgroundColor: "#2A3844",
    borderWidth: 0,
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  checkIcon: {
    backgroundColor: "#FA3235",
    width: 20,
    height: 20,
    borderRadius: 2,
  },
  rememberPasswordText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 10,
  },
  checkForgotPasswordText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },
  forgotPasswordText: {
    color: "#fff",
    marginLeft: "auto",
    textDecorationLine: "underline",
    fontSize: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  accountButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  socialButtonsText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  horizontalBar: {
    flex: 1,
    height: 1,
    backgroundColor: "#535353",
  },
  orText: {
    color: "#fff",
    marginHorizontal: 15,
    fontSize: 12,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
});

export default NewPwdScreen;
