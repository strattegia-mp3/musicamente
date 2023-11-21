import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import { Button, Chip } from "react-native-paper";
import { buttonStyles } from "../../Styles";
import UserContext from "../../../context/user/User.context";
import { api } from "../../../api/Api";
import CustomBackButton from "../../../components/CustomBackButton.component";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SetMusicalTasteScreen = React.memo(({ navigation }) => {
  const { EXPO_PUBLIC_LASTFM_APIKEY } = process.env;
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { userData, setUserData } = useContext(UserContext);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getMusicGenres = async () => {
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${EXPO_PUBLIC_LASTFM_APIKEY}&format=json`
      );
      if (response.data && response.data.toptags && response.data.toptags.tag) {
        const genres = response.data.toptags.tag.map((tag) => tag.name);
        setAvailableGenres(genres);
        setFilteredGenres(genres);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar gêneros musicais:", error);
    }
  };

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSaveTaste = useCallback(async () => {
    try {
      if (selectedGenres.length < 3) {
        Alert.alert(
          "Selecione mais!",
          "Precisamos que você selecione ao menos 3 estilos musicais de sua preferência.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        return;
      }
      const response = await api.post("/api/users", {
        ...userData,
        musicGenres: selectedGenres,
      });

      if (response.status === 201) {
        navigation.navigate("Tutorial", { from: "Signup" });
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro ao salvar o gosto musical:", error.response.data);
      } else if (error.request) {
        console.error("Erro ao salvar o gosto musical:", error.request);
      } else {
        console.error("Erro ao salvar o gosto musical:", error.message);
      }
      console.error(error.config);
    }
  }, [selectedGenres]);

  const filterGenres = (query) => {
    setSearchQuery(query);
    const filtered = availableGenres.filter((genre) =>
      genre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGenres(filtered);
  };

  useEffect(() => {
    getMusicGenres();
  }, []);

  return (
    <View style={styles.container}>
      <CustomBackButton onPress={handleBack} />
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Selecione os seus{" "}
          <Text style={styles.headerMarkedText}>estilos musicais</Text>!
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar gêneros musicais..."
          placeholderTextColor="#737E86"
          value={searchQuery}
          onChangeText={filterGenres}
        />
        {loading ? (
          <Text>Carregando gêneros musicais...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.chipsContainer}>
            {filteredGenres.map((item) => (
              <Chip
                key={item}
                selected={selectedGenres.includes(item)}
                onPress={() => toggleGenre(item)}
                mode="outlined"
                style={styles.chip}
                textStyle={{ color: "#fff", textTransform: "capitalize" }}
                selectedColor="#FA3235"
              >
                {item.toUpperCase()}
              </Chip>
            ))}
          </ScrollView>
        )}
        <View style={buttonStyles.buttonContainer}>
          <View style={{ padding: 5 }}>
            <TouchableOpacity onPress={handleSaveTaste}>
              <Button
                mode="contained"
                style={buttonStyles.button}
                buttonColor="#FA3235"
                disabled={selectedGenres.length === 0}
              >
                Finalizar!
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
});

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
    marginTop: 10,
    textAlign: "center",
  },
  headerMarkedText: {
    color: "#FA3235",
    fontSize: 28,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "#2A3844",
    color: "#fff",
    padding: 10,
    borderWidth: 0,
    borderRadius: 4,
    marginVertical: 10,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  chip: {
    backgroundColor: "#192229",
    margin: 5,
    borderRadius: 50,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SetMusicalTasteScreen;
