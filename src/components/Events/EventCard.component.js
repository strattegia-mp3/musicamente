import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const EventCard = ({ event, isLastItem }) => {
  return (
    <View style={[styles.card, isLastItem ? styles.lastCard : null]}>
      <View style={styles.cardContent}>
        <View style={styles.textSection}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardDescription}>{event.description}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Saber mais</Text>
            <AntDesign name="arrowright" size={24} color="#FA3235" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageSection}>
          <Image style={styles.cardImage} source={{ uri: event.eventImage }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 400,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: "#2A3844",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  lastCard: {
    marginRight: 0,
  },
  cardContent: {
    flexDirection: "row",
  },
  textSection: {
    flex: 1,
    padding: 10,
  },
  imageSection: {
    width: 100,
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FA3235",
  },
  cardDescription: {
    fontSize: 14,
    color: "#BEC3C7",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 5,
  },
});

export default EventCard;
