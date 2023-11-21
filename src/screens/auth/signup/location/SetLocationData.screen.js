import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";

import { buttonStyles } from "../../../Styles";
import UserContext from "../../../../context/user/User.context";
import CustomBackButton from "../../../../components/CustomBackButton.component";
import { TextLabel } from "../../../../components/TextLabel.component";
import axios from "axios";
import LoadingScreen from "../../../Loading.screen";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetLocationDataScreen = ({ navigation, route }) => {
  const [states, setStates] = useState([]);
  console.log("Props recebidas:", route.params);

  if (!route.params || !route.params.addressData || !route.params.zipCode) {
    return <LoadingScreen />;
  }

  const { addressData, zipCode } = route.params;
  const { setUserData } = useContext(UserContext);

  const placeholder = {
    label: "...",
    value: null,
    color: "#9EA0A4",
  };

  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        setStates(response.data);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };
    getStates();
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendLocationData = (values) => {
    setUserData((prevData) => ({ ...prevData, address: values }));
    navigation.navigate("SetNumberBio");
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Endereço é obrigatório"),
    neighborhood: Yup.string().required("Bairro é obrigatório"),
    number: Yup.string().required("*"),
    city: Yup.string().required("Cidade é obrigatório"),
    state: Yup.string().required("*"),
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Complete o seu
          <Text style={styles.headerMarkedText}> endereço</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Complete as suas informações de endereço aqui.
        </Text>
        <Formik
          initialValues={{
            zipCode: zipCode,
            address: addressData.logradouro || "",
            neighborhood: addressData.bairro || "",
            complement: addressData.complemento || "",
            number: "",
            city: addressData.localidade || "",
            state: addressData.uf || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSendLocationData}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ justifyContent: "center", marginVertical: 20 }}>
              <View>
                <TextLabel
                  label="Endereço"
                  error={touched.address && errors.address}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    placeholder="Digite aqui o seu endereço..."
                    value={values.address}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    style={[styles.input, { flex: 1 }]}
                    placeholderTextColor="#737E86"
                  />
                </View>
              </View>
              <View>
                <TextLabel
                  label="Bairro"
                  error={touched.neighborhood && errors.neighborhood}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    placeholder="Digite aqui o seu bairro..."
                    value={values.neighborhood}
                    onChangeText={handleChange("neighborhood")}
                    onBlur={handleBlur("neighborhood")}
                    style={[styles.input, { flex: 1 }]}
                    placeholderTextColor="#737E86"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "71%" }}>
                  <TextLabel
                    label="Cidade"
                    error={touched.city && errors.city}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      placeholder="Digite aqui a sua cidade..."
                      value={values.city}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      style={[styles.input, { flex: 1 }]}
                      placeholderTextColor="#737E86"
                    />
                  </View>
                </View>
                <View style={{ width: "25%" }}>
                  <TextLabel
                    label="Número"
                    error={touched.number && errors.number}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      placeholder="Nº"
                      value={values.number}
                      onChangeText={handleChange("number")}
                      onBlur={handleBlur("number")}
                      style={[styles.input, { flex: 1 }]}
                      placeholderTextColor="#737E86"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "61%" }}>
                  <TextLabel
                    label="Complemento"
                    error={touched.complement && errors.complement}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      placeholder="Digite o complemento..."
                      value={values.complement}
                      onChangeText={handleChange("complement")}
                      onBlur={handleBlur("complement")}
                      style={[styles.input, { flex: 1 }]}
                      placeholderTextColor="#737E86"
                    />
                  </View>
                </View>
                <View style={{ width: "35%" }}>
                  <TextLabel
                    label="Estado"
                    error={touched.state && errors.state}
                  />
                  {states.length > 0 && (
                    <RNPickerSelect
                      placeholder={placeholder}
                      onValueChange={handleChange("state")}
                      value={values?.state || addressData.uf}
                      items={states.map((state) => ({
                        label: state.sigla,
                        value: state.nome,
                      }))}
                      style={{
                        inputAndroid: {
                          paddingRight: 40,
                          backgroundColor: "#2A3844",
                          color: "#fff",
                        },
                      }}
                    />
                  )}
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
});

export default SetLocationDataScreen;
