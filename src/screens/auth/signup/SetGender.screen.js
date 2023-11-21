import React, { useCallback, useContext, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { buttonStyles } from "../../Styles";
import UserContext from "../../../context/user/User.context";
import CustomBackButton from "../../../components/CustomBackButton.component";
import { TextLabel } from "../../../components/TextLabel.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetGenderScreen = ({ navigation }) => {
  const { setUserData } = useContext(UserContext);

  const placeholder = {
    label: "Selecione uma opção...",
    value: null,
    color: "#9EA0A4",
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendGender = async (values) => {
    setUserData((prevData) => ({
      ...prevData,
      gender: values.gender,
      customGender: values.customGender.trim(),
    }));
    navigation.navigate("SetBirth");
  };

  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("O gênero é obrigatório"),
    customGender: Yup.string().when("gender", {
      is: "others",
      then: Yup.string().required("Por favor, forneça um gênero personalizado"),
    }),
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Qual é o seu
          <Text style={styles.headerMarkedText}> gênero</Text>?
        </Text>
        <Text style={styles.subHeaderText}>Selecione abaixo o seu gênero!</Text>
        <Formik
          initialValues={{ gender: "", customGender: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendGender}
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
                  <TextLabel
                    label="Gênero"
                    error={touched.gender && errors.gender}
                  />
                  <RNPickerSelect
                    placeholder={placeholder}
                    onValueChange={handleChange("gender")}
                    items={[
                      { label: "Masculino", value: "male" },
                      { label: "Feminino", value: "female" },
                      { label: "Não binário", value: "non-binary" },
                      { label: "Outros", value: "others" },
                    ]}
                    value={values.gender}
                    style={{
                      inputAndroid: {
                        fontSize: 16,
                        marginVertical: 10,
                        padding: 10,
                        paddingRight: 30,
                        backgroundColor: "#2A3844",
                        color: "#fff",
                      },
                    }}
                  />
                </View>
                {values.gender === "others" && (
                  <View style={{ marginTop: 10 }}>
                    <TextLabel
                      label="Gênero Personalizado"
                      error={touched.customGender && errors.customGender}
                    />
                    <TextInput
                      placeholder="Digite o seu gênero..."
                      value={values.customGender}
                      onChangeText={handleChange("customGender")}
                      onBLur={handleBlur("customGender")}
                      style={styles.input}
                      placeholderTextColor="#737E86"
                    />
                  </View>
                )}
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
              </>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
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

export default SetGenderScreen;
