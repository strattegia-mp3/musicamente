import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Checkbox, Chip } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/auth/Auth.context";

import SocialButton from "../../components/SocialButton.component";
import { getTutorialCompleted } from "../tutorial/Tutorial.screen";
import CustomBackButton from "../../components/CustomBackButton.component";
import { api } from "../../api/Api";
import { TextLabel } from "../../components/TextLabel.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { EXPO_PUBLIC_LASTFM_APIKEY } = process.env;

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const getCredentials = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log(userData);
      if (userData) {
        const { email, password } = JSON.parse(userData);
        setEmail(email);
        setPassword(password);
        setRememberPassword(true);
      } else {
        setEmail("");
        setPassword("");
        setRememberPassword(false);
      }
    };
    getCredentials();
  }, []);

  const handleLogin = async (values) => {
    try {
      const response = await api.post("/api/users/login", {
        email: values.email.trim() || email.trim(),
        password: values.password || password,
      });
      if (response.status === 200) {
        if (rememberPassword) {
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              email: values.email.trim(),
              password: values.password,
              isLoggedIn: true
            })
          );
        }
        setIsLoggedIn(true)
        const tutorialCompleted = await getTutorialCompleted().then(
          console.log
        );
        if (tutorialCompleted) {
          navigation.navigate("HomePage");
        } else {
          navigation.navigate("Tutorial", { from: "Login" });
        }
      } else {
        alert("Email ou senha incorretos!");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleLastFMLogin = async () => {
    try {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=${EXPO_PUBLIC_LASTFM_APIKEY}&format=json`
      );
      const data = await response.json();
      const token = data.token;

      // Redirect the user to the LastFM login page
      Linking.openURL(
        `http://www.last.fm/api/auth/?api_key=${EXPO_PUBLIC_LASTFM_APIKEY}&token=${token}`
      );

      // Listen for the redirect from LastFM, which will contain the user's session key
      Linking.addEventListener("url", async (event) => {
        const sessionKey = new URL(event.url).searchParams.get("token");

        // Use the session key to make authenticated requests to the LastFM API
        const sessionResponse = await fetch(
          `http://ws.audioscrobbler.com/2.0/?method=auth.getsession&api_key=${EXPO_PUBLIC_LASTFM_APIKEY}&token=${sessionKey}&format=json`
        );
        const sessionData = await sessionResponse.json();
        const userInfo = sessionData.session;

        console.log(userInfo);

        // Store the user info in your app's state or a database
        // Then navigate to the home page
        //navigation.navigate('HomePage');

        // Remove the event listener after it's no longer needed
        Linking.removeEventListener("url", handleLastFMLogin);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpotifyLogin = () => {};

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
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>
          Acesse sua <Text style={styles.headerMarkedText}>conta</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Insira abaixo os seus dados para prosseguir!
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
                <View style={styles.passwordActions}>
                  <View style={styles.rememberPasswordContainer}>
                    <Checkbox
                      status={rememberPassword ? "checked" : "unchecked"}
                      onPress={() => setRememberPassword(!rememberPassword)}
                      color="#FA3235"
                    />
                    <Text
                      onPress={() => setRememberPassword(!rememberPassword)}
                      style={styles.rememberPasswordText}
                    >
                      Lembrar minha senha
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPwd")}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Esqueci minha senha
                    </Text>
                  </TouchableOpacity> */}
                </View>
                <View style={styles.accountButtons}>
                  <TouchableOpacity onPress={handleSignup}>
                    <Button
                      mode="outlined"
                      style={styles.button}
                      textColor="#999999"
                    >
                      Cadastre-se
                    </Button>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Button
                      mode="contained"
                      style={styles.button}
                      textColor="#fff"
                      buttonColor="#FA3235"
                    >
                      Acessar
                    </Button>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
        {/* <View style={styles.footer}>
          <View style={styles.socialButtonsText}>
            <View style={styles.horizontalBar} />
            <Text style={styles.orText}>Ou continue com</Text>
            <View style={styles.horizontalBar} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <SocialButton
              fontName="FontAwesome5"
              theme="icon"
              label="lastfm-square"
              width={56}
              height={56}
              onPress={handleLastFMLogin}
            />
            <SocialButton
              fontName="FontAwesome5"
              theme="icon"
              label="spotify"
              width={56}
              height={56}
              onPress={handleSpotifyLogin}
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  showPasswordButton: {
    padding: 10,
  },
  passwordActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  rememberPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    alignSelf: "center",
    borderWidth: 0,
    width: 20,
    height: 20,
    borderRadius: 4,
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
    marginVertical: 15,
  },
  button: {
    width: deviceWidth / 2.5,
    height: 55,
    justifyContent: "center",
    borderRadius: 5,
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

export default LoginScreen;
