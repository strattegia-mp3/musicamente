import React, { useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import Story from "./Story.component";
import { useNavigation } from "@react-navigation/native";

const HomeStories = ({ stories }) => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const handleStoryPress = (story) => {
    navigation.navigate("StoryScreen", { currentStory: story, stories });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleStoryPress(item)}>
        <Story story={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={stories}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={120}
        loop={true}
        autoplay={true}
        autoplayInterval={10000}
      />
    </View>
  );
};

export default HomeStories;
