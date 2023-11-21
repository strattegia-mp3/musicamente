import React, { useCallback, useContext, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { buttonStyles } from "../../Styles";
import { Button } from "react-native-paper";
import UserContext from "../../../context/user/User.context";
import CustomBackButton from "../../../components/CustomBackButton.component";
import { TextLabel } from "../../../components/TextLabel.component";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetBirthScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("pt-BR")
  );
  const { setUserData } = useContext(UserContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date.toLocaleDateString("pt-BR"));
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendDateBirth = () => {
    setUserData((prevData) => ({
      ...prevData,
      birthdate: selectedDate,
    }));
    navigation.navigate("SetPhoto");
  };

  const validationSchema = Yup.object().shape({
    birthdate: Yup.string()
      .required("A data de nascimento é obrigatória")
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/,
        "A data de nascimento deve estar no formato dd/MM/yyyy"
      ),
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Qual a sua{" "}
          <Text style={styles.headerMarkedText}>data de nascimento</Text>?
        </Text>
        <Formik
          initialValues={{ birthdate: selectedDate }}
          validationSchema={validationSchema}
          onSubmit={handleSendDateBirth}
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
                    label="Data de Nascimento"
                    error={touched.birthdate && errors.birthdate}
                  />
                  <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                      placeholder="Clique aqui para selecionar a data"
                      value={selectedDate}
                      editable={false}
                      style={styles.input}
                      placeholderTextColor="#737E86"
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    locale="pt-BR"
                    headerTextIOS="Selecione a data"
                    confirmTextIOS="Confirmar"
                    cancelTextIOS="Cancelar"
                  />
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

export default SetBirthScreen;
