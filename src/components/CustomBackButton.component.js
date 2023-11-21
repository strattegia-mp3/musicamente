import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;

const CustomBackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <SimpleLineIcons
          name="arrow-left"
          size={deviceWidth / 15}
          color="#FA3235"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomBackButton;
