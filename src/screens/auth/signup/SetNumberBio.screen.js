import React, { useContext, useState, useCallback } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { buttonStyles } from "../../Styles";
import UserContext from "../../../context/user/User.context";
import CustomBackButton from "../../../components/CustomBackButton.component";
import { TextLabel } from "../../../components/TextLabel.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetNumberBioScreen = ({ navigation }) => {
  const { setUserData } = useContext(UserContext);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const unformatPhoneNumber = (phoneNumberString) => {
    return phoneNumberString.replace(/[^\d]/g, "");
  };

  const handleSendNumberBio = (values) => {
    setUserData((prevData) => ({
      ...prevData,
      bio: values.bio,
      phone: parseFloat(unformatPhoneNumber(values.phone)),
    }));
    navigation.navigate("SetMusicalTaste");
  };

  const validationSchema = Yup.object().shape({
    bio: Yup.string()
      .max(150, "A biografia não pode ter mais de 150 caracteres.")
      .required("A biografia é obrigatória."),
    phone: Yup.string()
      .matches(/^\d{11}$/, "O telefone deve ter 11 dígitos.")
      .required("O telefone é obrigatório."),
  });

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Dados
          <Text style={styles.headerMarkedText}> adicionais</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Insira aqui alguns dados adicionais para personalizarmos ainda mais
          sua experiência!
        </Text>
        <Formik
          initialValues={{ bio: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendNumberBio}
        >
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={{ justifyContent: "center", marginVertical: 20 }}>
                <View>
                  <TextLabel
                    label="Telofone"
                    error={touched.phone && errors.phone}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      placeholder="Digite aqui o seu telefone..."
                      value={formatPhoneNumber(values.phone)}
                      onChangeText={(text) => {
                        setFieldValue("phone", text);
                      }}
                      onBlur={handleBlur("phone")}
                      style={[styles.input, { flex: 1 }]}
                      placeholderTextColor="#737E86"
                      keyboardType="phone-pad"
                      maxLength={15}
                    />
                  </View>
                </View>
                <View>
                  <TextLabel
                    label="Biografia"
                    error={touched.bio && errors.bio}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      placeholder="Digite aqui a sua biografia..."
                      value={values.bio}
                      onChangeText={handleChange("bio")}
                      onBlur={handleBlur("bio")}
                      style={[styles.input, { flex: 1, maxHeight: 150 }]}
                      placeholderTextColor="#737E86"
                      multiline={true}
                      numberOfLines={4}
                      maxLength={150}
                    />
                  </View>
                </View>
              </View>
              <View style={buttonStyles.buttonContainer}>
                <View style={{ padding: 5 }}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Button
                      mode="contained"
                      style={buttonStyles.button}
                      buttonColor="#FA3235"
                    >
                      Próximo
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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

export default SetNumberBioScreen;
