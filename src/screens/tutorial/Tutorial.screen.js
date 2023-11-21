import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTutorialCompleted = async () => {
  try {
    const tutorialCompleted = await AsyncStorage.getItem("TutorialCompleted");
    return tutorialCompleted === "true";
  } catch (error) {
    console.error(error);
  }
};

const TutorialComponent = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      image: require("../../../assets/tutorial/improve.png"),
      title: "Aprimore-se",
      content:
        "Descubra dicas e técnicas valiosas para aprimorar suas habilidades musicais. Explore tutoriais passo a passo, aprenda novos estilos e experimente diferentes técnicas de execução.",
    },
    {
      image: require("../../../assets/tutorial/harmonize.png"),
      title: "Harmonize-se",
      content:
        "Aprenda a criar harmonias envolventes e explore a arte de combinar sons para criar melodias cativantes.",
    },
    {
      image: require("../../../assets/tutorial/connect.png"),
      title: "Conecte-se",
      content:
        "Faça parte de uma comunidade de músicos apaixonados que compartilham sua paixão pela música e encontre colaboradores para projetos emocionantes.",
    },
    {
      image: require("../../../assets/tutorial/share.png"),
      title: "Compartilhe",
      content:
        "Mostre ao mundo sua música! Compartilhe suas criações, gravações e performances. Receba feedback valioso da comunidade musical e expanda seu alcance como artista.",
    },
  ];

  useEffect(() => {
    const checkTutorialCompletion = async () => {
      const tutorialCompleted = await getTutorialCompleted();
      if (tutorialCompleted) {
        navigation.navigate("HomePage");
      } else {
        navigation.navigate("Tutorial");
      }
    };
    checkTutorialCompletion();
  }, []);

  const setTutorialCompleted = async () => {
    try {
      await AsyncStorage.setItem("TutorialCompleted", "true");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNextSlide = () => {
    if (currentSlide < 3) {
      swiperRef.current.scrollBy(1);
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === 3) {
      setTutorialCompleted();
      navigation.navigate("HomePage");
    }
  };

  const handleSkipSlides = () => {
    setTutorialCompleted();
    navigation.navigate("HomePage");
  };

  return (
    <View style={styles.container}>
      <SimpleLineIcons
        name="arrow-left"
        size={24}
        color="#fff"
        onPress={handleBack}
        style={{ paddingTop: 50, paddingLeft: 20 }}
      />
      <View style={styles.imageSection}>
        <Image source={slides[currentSlide].image} style={styles.image} />
      </View>
      <View style={styles.carouselSection}>
        <View style={styles.middleSection}>
          <Swiper
            loop={false}
            onIndexChanged={(index) => setCurrentSlide(index)}
            dotStyle={{ height: 3, width: 50, backgroundColor: "#535353" }}
            activeDotStyle={{
              height: 3,
              width: 50,
              backgroundColor: "#FA3235",
            }}
            ref={swiperRef}
            springConfig={{ speed: 15, bounciness: 30 }}
          >
            {slides.map((slide, index) => (
              <View style={styles.slide} key={index}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideText}>{slide.content}</Text>
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.buttonsSection}>
          <Text style={{ color: "#999999" }} onPress={handleSkipSlides}>
            Pular
          </Text>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            style={{
              backgroundColor: "#FA3235",
              padding: 15,
              borderRadius: 100,
            }}
            onPress={handleNextSlide}
          />
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FA3235",
  },
  imageSection: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width / 1.25,
    height: height / 2.75,
    resizeMode: "contain",
  },
  carouselSection: {
    flex: 0.5,
    backgroundColor: "#212C35",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slideTitle: {
    fontSize: 30,
    color: "#FA3235",
    paddingBottom: 20,
    fontWeight: "700",
  },
  slideText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  middleSection: {
    flex: 1,
  },
  buttonsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default TutorialComponent;
