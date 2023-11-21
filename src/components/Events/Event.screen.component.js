import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import EventCard from "./EventCard.component";

const eventsData = [
  {
    id: 1,
    title: "DT in BSB",
    description:
      "O Dream Theater voltou com o Mike Portnoy, estão em turnê e virão para BSB pela primeira vez! ",
    eventImage:
      "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "Evento 2",
    description: "Descrição do Evento 2",
    eventImage:
      "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Evento 3",
    description: "Descrição do Evento 3",
    eventImage:
      "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    title: "Evento 4",
    description: "Descrição do Evento 4",
    eventImage:
      "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    title: "Evento 5",
    description: "Descrição do Evento 5",
    eventImage:
      "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    title: "Evento 6",
    description: "Descrição do Evento 6",
    eventImage:
      "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 7,
    title: "Evento 7",
    description: "Descrição do Evento 7",
    eventImage:
      "https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Event = () => {
  const [showMore, setShowMore] = useState(false);

  const visibleEvents = showMore
    ? eventsData
    : [...eventsData.slice(0, 6), { id: "more", type: "button" }];

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleEvents}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isLastItem = index === visibleEvents.length - 1;
          if (item.type === "button") {
            return (
              <TouchableOpacity
                onPress={() => setShowMore(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ver mais</Text>
                <AntDesign name="arrowright" size={24} color="#FA3235" />
              </TouchableOpacity>
            );
          }
          return <EventCard event={item} isLastItem={isLastItem} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 5,
  },
});

export default Event;
