import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Story = ({ story }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: story.mediaUrl }}
        style={styles.previewImage}
        resizeMode="cover"
      />
      <Image source={{ uri: story.userPhoto }} style={styles.userPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  userPhoto: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fa3235",
  },
});

export default Story;
