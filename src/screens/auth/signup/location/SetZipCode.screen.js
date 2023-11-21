import React, { useState, useCallback } from "react";
import {
  Alert,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomBackButton from "../../../../components/CustomBackButton.component";
import { TextLabel } from "../../../../components/TextLabel.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetZipCodeScreen = ({ navigation }) => {
  const { EXPO_PUBLIC_GOOGLE_MAPS_APIKEY } = process.env;
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const discoverZipCode = async (setFieldValue) => {
    setLoading(true);
    try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }
   
    const options = {
      accuracy: Location.Accuracy.Highest,
    };
   
    let location = await Location.getCurrentPositionAsync(options);
    let { coords } = location;
   
    if (!coords) {
      throw new Error("Could not retrieve user's location");
    }
   
    const { latitude, longitude } = coords;
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
   
    const response = await fetch(apiUrl);
    const geoResponse = await response.json();
    if (!geoResponse.address) {
      throw new Error("No location data found");
    }
   
    const postalCode = geoResponse.address.postcode;
    console.log(postalCode)
    if (!postalCode) {
      throw new Error("Zip code not found");
    }
   
    setFieldValue("zipCode", postalCode);
    } catch (error) {
    console.error("Error getting zip code:", error);
    } finally {
    setLoading(false);
    }
   };   

  const loadAddressData = async (address, setFieldValue) => {
    try {
      setLoadingData(true);
      if (address) {
        const numericAddress = address.replace(/\D/g, "");
        if (/^\d{8}$/.test(numericAddress)) {
          console.log(numericAddress);
          const response = await fetch(
            `https://viacep.com.br/ws/${numericAddress}/json/`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.erro) {
              Alert.alert(
                "CEP inexistente!",
                "O CEP que foi informado é inexistente e não pôde ser encontrado na base de dados. Insira outro CEP!",
                [{ text: "OK" }],
                { cancelable: false }
              );
            } else {
              setFieldValue("zipCode", data.cep);
              navigation.navigate("SetLocationData", {
                addressData: data,
                zipCode: data.cep,
              });
            }
          } else {
            console.error("Erro ao consultar o CEP");
          }
        }
      }
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSendZipCode = useCallback(
    async (values, { setFieldValue }) => {
      const zipCodeValue = values.zipCode;

      if (zipCodeValue && /^\d{8}$/.test(zipCodeValue.replace(/\D/g, ""))) {
        console.log(zipCodeValue);
        loadAddressData(zipCodeValue, setFieldValue);
      } else {
        console.error("Preencha os campos corretamente antes de buscar o CEP.");
      }
    },
    [navigation]
  );
  const validationSchema = Yup.object().shape({
    zipCode: Yup.string()
      .required("CEP é obrigatório")
      .transform((value) => (value ? value.replace("-", "") : value))
      .matches(/^\d{8}$/, "CEP deve ter 8 dígitos numéricos"),
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Insira abaixo o seu
          <Text style={styles.headerMarkedText}> CEP</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Informe o seu CEP para que possamos mostrar os eventos que ocorrerão
          próximo a você!
        </Text>
        <Formik
          initialValues={{ zipCode: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendZipCode}
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
              <TextLabel
                label="CEP"
                error={touched.zipCode && errors.zipCode}
              />
              <TextInput
                onChangeText={handleChange("zipCode")}
                onBlur={handleBlur("zipCode")}
                value={values.zipCode}
                style={styles.input}
                placeholder="Digite aqui o seu CEP..."
                placeholderTextColor="#737E86"
                keyboardType="number-pad"
                editable={!loading}
              />
              <View style={styles.passwordActions}>
                <TouchableOpacity disabled={loading}>
                  <Text
                    style={styles.zipCodeActions}
                    onPress={() => discoverZipCode(setFieldValue)}
                  >
                    {loading ? "Carregando..." : "Preencher o CEP"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading || loadingData}
              >
                <Button
                  mode="contained"
                  buttonColor="#FA3235"
                  textColor="#fff"
                  style={{ borderRadius: 5, marginVertical: 20, padding: 10 }}
                  disabled={loading || loadingData}
                >
                  {loadingData ? "Carregando..." : "Próximo"}
                </Button>
              </TouchableOpacity>
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
  zipCodeActions: {
    color: "#fff",
    marginRight: "auto",
    textDecorationLine: "underline",
    fontSize: 10,
  },
  labelText: {
    color: "#fff",
    marginTop: 10,
  },
});

export default SetZipCodeScreen;
