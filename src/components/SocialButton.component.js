import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function SocialButton({
  fontName,
  label,
  onPress,
  width,
  height,
}) {
  const buttonStyle = {
    width: width || 320,
    height: height || 70,
  };

  const Icon = fontName === "FontAwesome" ? FontAwesome : FontAwesome5;

  const styles = StyleSheet.create({
    buttonContainer: {
      width: buttonStyle.width,
      height: buttonStyle.height,
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    },
    button: {
      borderRadius: 10,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: "#fff",
      fontSize: 16,
    },
  });

  return (
    <View style={[styles.buttonContainer, buttonStyle]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={label} size={40} color="#fff" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
}
