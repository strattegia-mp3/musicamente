import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: windowWidth / 1.1,
    maxWidth: windowWidth / 1.05,
    height: 55,
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#333",
  },
});
