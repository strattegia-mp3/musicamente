import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const StoryScreen = ({ route }) => {
  const { stories, currentStory } = route.params;
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(0)).current;
  const initialIndex = Math.min(currentStory, stories.length - 1);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleExitStory = () => {
    navigation.goBack();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentStoryIndex]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timerRef.current);
          const nextIndex = currentStoryIndex + 1;
          if (nextIndex < stories.length) {
            setCurrentStoryIndex(nextIndex);
          } else {
            handleExitStory();
          }
          return 10;
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (!isPaused) {
      resetTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentStoryIndex, isPaused]);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { velocityX, translationX } = event.nativeEvent;

      const swipeRight = velocityX > 0;
      const swipeLeft = velocityX < 0;

      const swipe = swipeRight || swipeLeft;

      if (swipe) {
        const direction = swipeRight ? -1 : 1;
        Animated.timing(translateX, {
          toValue: -direction * windowWidth,
          useNativeDriver: true,
        }).start(() => {
          setCurrentStoryIndex((prevIndex) =>
            prevIndex + direction < 0 ? 0 : prevIndex + direction
          );
          translateX.setValue(0);
        });
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Pressable
        style={styles.container}
        onPressIn={() => setIsPaused(true)}
        onPressOut={() => setIsPaused(false)}
      >
        <View style={styles.statusBar} />
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={{
              transform: [{ translateX: translateX }],
              width: "100%",
              height: "100%",
              opacity: fadeAnim,
            }}
          >
            <View style={styles.fullImageContainer}>
              <Image
                source={{ uri: currentStory?.mediaUrl }}
                style={styles.fullImage}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.paginationContainer}>
          {stories.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentStoryIndex ? styles.paginationDotActive : null,
              ]}
            />
          ))}
        </View>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleExitStory} style={styles.exitButton}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: currentStory.userPhoto }}
              style={styles.userPhoto}
            />
            <Text style={styles.userName}>{currentStory.userName}</Text>
          </View>
        </View>
      </Pressable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  statusBar: {
    backgroundColor: "#212C35",
    height: 30,
  },
  fullImageContainer: {
    flex: 1,
  },
  fullImage: {
    flex: 1,
  },
  paginationContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#C0C0C0",
  },
  paginationDotActive: {
    backgroundColor: "#FA3235",
  },
  timerBar: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  topBar: {
    position: "absolute",
    top: 50,
    right: 5,
  },
  exitButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FA3235",
  },
  userName: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  reactionsContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  leftButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 0, // Largura do botão da esquerda
  },
  rightButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 0, // Largura do botão da direita
  },
  // Adicione estilos para as reações aqui
});

export default StoryScreen;
