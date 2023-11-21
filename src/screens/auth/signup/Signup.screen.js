import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Chip } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import SocialButton from "../../../components/SocialButton.component";
import { buttonStyles } from "../../Styles";
import UserContext from "../../../context/user/User.context";
import CustomBackButton from "../../../components/CustomBackButton.component";
import { api } from "../../../api/Api";
import { TextLabel } from "../../../components/TextLabel.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SignupScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUserData } = useContext(UserContext);
  const {
    EXPO_PUBLIC_LASTFM_APIKEY,
    EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
    EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET,
  } = process.env;

  const checkEmail = async (email) => {
    const params = { field: "email", value: email };
    const response = await api.get("/api/users/check-field", { params });
    return response.data.isRegistered;
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignup = async (values) => {
    const isRegistered = await checkEmail(values.email.trim());
    if (!isRegistered) {
      setUserData((prevData) => ({
        ...prevData,
        email: values.email.trim(),
        password: values.password,
      }));
      navigation.navigate("SetUsername");
    } else {
      Alert.alert(
        "Email já está cadastrado!",
        "O email que você acaba de informar já está sendo utilizado. Por favor, utilize outro email.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const handleLastFMSignup = async () => {};

  const handleSpotifySignup = async () => {};

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .matches(/[a-z]/, "A senha deve conter pelo menos um caractere minúsculo")
      .matches(/[A-Z]/, "A senha deve conter pelo menos um caractere maiúsculo")
      .matches(/\d/, "A senha deve conter pelo menos um número")
      .matches(
        /[@$!%*?&]/,
        "A senha deve conter pelo menos um caractere especial"
      )
      .required("Senha é obrigatória"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas devem coincidir")
      .required("Confirmação é obrigatória"),
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerText}>
          Crie sua <Text style={styles.headerMarkedText}>conta</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Insira abaixo os seus dados para prosseguir e fazer parte da nossa
          comunidade!
        </Text>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            const passwordRequirements = [
              {
                label: "Oito ou mais caracteres",
                check: values.password.length >= 8,
              },
              {
                label: "Ao menos um caractere minúsculo",
                check: values.password.match(/[a-z]/),
              },
              {
                label: "Ao menos um caractere maiúsculo",
                check: values.password.match(/[A-Z]/),
              },
              {
                label: "Ao menos um caractere numérico",
                check: values.password.match(/\d/),
              },
              {
                label: "Ao menos um caractere especial",
                check: values.password.match(/[@$!%*?&]/),
              },
            ];
            return (
              <>
                <View>
                  <TextLabel
                    label="Email"
                    error={touched.email && errors.email}
                  />
                  <TextInput
                    placeholder="Digite aqui o seu email..."
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    style={styles.input}
                    placeholderTextColor="#737E86"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View>
                  <TextLabel
                    label="Senha"
                    error={touched.password && errors.password}
                  />
                  <View style={styles.passwordInput}>
                    <TextInput
                      placeholder="Digite aqui a sua senha..."
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry={!showPassword}
                      style={[styles.input, { flex: 1 }]}
                      placeholderTextColor="#737E86"
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.showPasswordButton}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={25}
                        color="#737E86"
                      />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={passwordRequirements}
                    keyExtractor={(item) => item.label}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Chip
                        style={{
                          backgroundColor: item.check ? "#92fc92" : "#2A3844",
                          marginHorizontal: 5,
                          borderColor: item.check ? "#fff" : "#fc5353",
                        }}
                        mode={item.check ? "flat" : "outlined"}
                        textStyle={{ color: item.check ? "#000" : "#999999" }}
                      >
                        {item.label}
                      </Chip>
                    )}
                  />
                </View>
                <View>
                  <TextLabel
                    label="Confirme a senha"
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                  <View style={styles.passwordInput}>
                    <TextInput
                      placeholder="Confirme a sua senha..."
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      secureTextEntry={!showConfirmPassword}
                      style={[styles.input, { flex: 1 }]}
                      placeholderTextColor="#737E86"
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={styles.showPasswordButton}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={25}
                        color="#737E86"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={buttonStyles.buttonContainer}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Button
                      mode="contained"
                      style={buttonStyles.button}
                      buttonColor="#FA3235"
                    >
                      Prosseguir
                    </Button>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
        {/* <View style={styles.footer}>
          <View style={styles.socialButtonsText}>
            <View style={styles.horizontalBar}></View>
            <Text style={styles.orText}>Ou continue com</Text>
            <View style={styles.horizontalBar}></View>
          </View>
          <View style={styles.socialButtonsContainer}>
            <SocialButton
              fontName="FontAwesome5"
              theme="icon"
              label="lastfm-square"
              width={56}
              height={56}
              onPress={handleLastFMSignup}
            />
            <SocialButton
              fontName="FontAwesome5"
              theme="icon"
              label="spotify"
              width={56}
              height={56}
              onPress={handleSpotifySignup}
            />
          </View>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 5,
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  showPasswordButton: {
    padding: 10,
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

export default SignupScreen;
