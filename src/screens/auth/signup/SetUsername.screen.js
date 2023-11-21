import React, { useContext, useCallback } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { buttonStyles } from "../../Styles";
import UserContext from "../../../context/user/User.context";
import { TextLabel } from "../../../components/TextLabel.component";
import { api } from "../../../api/Api";
import CustomBackButton from "../../../components/CustomBackButton.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetUsernameScreen = ({ navigation }) => {
  const { setUserData } = useContext(UserContext);

  const checkUsername = async (username) => {
    const params = { field: "username", value: username };
    const response = await api.get("/api/users/check-field", { params });
    return response.data.isRegistered;
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendUsername = async (values) => {
    const isRegistered = await checkUsername(values.username.trim());
    if (!isRegistered) {
      setUserData((prevData) => ({
        ...prevData,
        name: values.name.trim(),
        username: values.username.trim(),
      }));
      navigation.navigate("SetGender");
    } else {
      Alert.alert(
        "Nome de usuário já está cadastrado!",
        "O nomde de usuário que você acaba de informar já está sendo utilizado. Por favor, utilize outro.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    username: Yup.string()
      .min(3, "No mínimo três caracteres")
      .required("O nome de usuário é obrigatório")
      .matches(/^[^\s]*$/, "Não pode conter espaços"),
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Como deseja ser
          <Text style={styles.headerMarkedText}> chamado(a)</Text>?
        </Text>
        <Text style={styles.subHeaderText}>
          Digite aqui o seu nome e nome de usuário único e maneiro!
        </Text>
        <Formik
          initialValues={{ name: "", username: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendUsername}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            return (
              <>
                <View>
                  <TextLabel label="Nome" error={touched.name && errors.name} />
                  <TextInput
                    placeholder="Digite aqui o seu nome..."
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    style={styles.input}
                    placeholderTextColor="#737E86"
                    autoCapitalize="words"
                  />
                </View>
                <View>
                  <TextLabel
                    label="Nome de usuário"
                    error={touched.username && errors.username}
                  />
                  <TextInput
                    placeholder="Digite aqui o seu nome de usuário..."
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    style={styles.input}
                    placeholderTextColor="#737E86"
                    autoCapitalize="none"
                  />
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
      </View>
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
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  input: {
    color: "#fff",
    backgroundColor: "#2A3844",
    marginVertical: 10,
    padding: 10,
    borderWidth: 0,
    borderRadius: 4,
  },
});

export default SetUsernameScreen;
