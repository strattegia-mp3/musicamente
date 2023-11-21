import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { buttonStyles } from "../../Styles";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";

import UserContext from "../../../context/user/User.context";
import CustomBackButton from "../../../components/CustomBackButton.component";
import { api } from "../../../api/Api";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetPhotoScreen = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserContext);

  const handleChooseFromGallery = async (setFieldValue) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permissão para acessar a biblioteca de mídia foi negada");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("selectedImage", { uri: result.assets[0].uri });
    }
  };

  const handleTakePhoto = async (setFieldValue) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      console.log("Permissão para acessar a câmera foi negada");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("selectedImage", { uri: result.assets[0].uri });
    }
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendPhoto = async (values) => {
    const { email } = userData;

    const formData = new FormData();
    formData.append("image", {
      uri: values.selectedImage.uri,
      name: `${email}_profileImage.jpg`,
      type: "image/jpg",
    });

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const { file } = response.data;
        console.log("Informações do arquivo:", file);

        setUserData((prevData) => ({
          ...prevData,
          profileImage: file.path,
        }));

        navigation.navigate("SetZipCode");
      }
    } catch (error) {
      console.error("Erro ao enviar a foto:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    selectedImage: Yup.object()
      .shape({
        uri: Yup.string(),
      })
      .test(
        "is-image-selected",
        "Uma foto de perfil é obrigatória",
        (value) => value !== null
      )
      .nullable()
      .required("Uma foto de perfil é obrigatória"),
  });

  return (
    <View style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Escolha a sua{" "}
          <Text style={styles.headerMarkedText}>foto de perfil</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Hora de escolher uma foto incrível para mostrar para todos sua
          essência!
        </Text>
        <Formik
          initialValues={{ selectedImage: null }}
          validationSchema={validationSchema}
          onSubmit={handleSendPhoto}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => {
            return (
              <>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="outlined"
                    textColor="#999999"
                    style={styles.button}
                    onPress={() => handleChooseFromGallery(setFieldValue)}
                  >
                    Galeria
                  </Button>
                  <Button
                    icon="camera"
                    mode="contained"
                    buttonColor="#FA3235"
                    style={styles.button}
                    onPress={() => handleTakePhoto(setFieldValue)}
                  >
                    Tirar Foto
                  </Button>
                </View>
                <View style={styles.imageContainer}>
                  {values.selectedImage ? (
                    <Image
                      source={{ uri: values.selectedImage.uri }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View
                      style={{
                        width: 250,
                        height: 250,
                        borderColor: "#535353",
                        borderWidth: 5,
                        borderRadius: 150,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SimpleLineIcons
                        name="camera"
                        size={62}
                        color="#535353"
                      />
                    </View>
                  )}
                  {touched.selectedImage && errors.selectedImage && (
                    <Text style={styles.errorText}>{errors.selectedImage}</Text>
                  )}
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
    marginBottom: 5,
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 5,
  },
  button: {
    width: "48%",
    maxWidth: deviceWidth / 1.05,
    height: 55,
    justifyContent: "center",
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 150,
    borderColor: "#FA3235",
    borderWidth: 5,
    resizeMode: "cover",
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
});

export default SetPhotoScreen;
