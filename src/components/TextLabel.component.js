import { StyleSheet, Text, View } from "react-native";

export const TextLabel = ({ label, error }) => (
  <View style={styles.labelGroup}>
    <Text style={styles.labelText}>{label}</Text>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  labelText: {
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
});
