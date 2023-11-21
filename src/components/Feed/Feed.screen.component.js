import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedCard from "./FeedCard.component";

const feedData = [
  {
    id: 1,
    userName: "User 1",
    userPhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    postTime: "Há 2 horas",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["#sample", "#test"],
    media: "https://via.placeholder.com/300",
    comments: [
      { id: 101, userPhoto: "https://randomuser.me/api/portraits/men/11.jpg" },
      { id: 102, userPhoto: "https://randomuser.me/api/portraits/men/12.jpg" },
    ],
  },
  {
    id: 2,
    userName: "User 2",
    userPhoto: "https://randomuser.me/api/portraits/men/2.jpg",
    postTime: "Há 3 horas",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["#sample", "#test", "#demo"],
    media: "https://via.placeholder.com/400",
    comments: [
      { id: 201, userPhoto: "https://randomuser.me/api/portraits/men/21.jpg" },
      { id: 202, userPhoto: "https://randomuser.me/api/portraits/men/22.jpg" },
      { id: 203, userPhoto: "https://randomuser.me/api/portraits/men/23.jpg" },
    ],
  },
  {
    id: 3,
    userName: "User 3",
    userPhoto: "https://randomuser.me/api/portraits/women/3.jpg",
    postTime: "Há 2 minutos",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["#Sample", "#Test", "#Demo", "MusicaMente", "#GRL_PWR"],
    media: null,
    comments: [
      {
        id: 301,
        userPhoto: "https://randomuser.me/api/portraits/women/31.jpg",
      },
      {
        id: 302,
        userPhoto: "https://randomuser.me/api/portraits/women/32.jpg",
      },
      {
        id: 303,
        userPhoto: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      {
        id: 304,
        userPhoto: "https://randomuser.me/api/portraits/women/34.jpg",
      },
      {
        id: 305,
        userPhoto: "https://randomuser.me/api/portraits/women/35.jpg",
      },
      {
        id: 306,
        userPhoto: "https://randomuser.me/api/portraits/women/36.jpg",
      },
    ],
  },
  {
    id: 4,
    userName: "User 4",
    userPhoto: "https://randomuser.me/api/portraits/women/4.jpg",
    postTime: "Há 4 minutos",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: [],
    media: null,
    comments: [],
  },
  // Adicione mais objetos de dados
];

const Feed = () => {
  return (
    <FlatList
      data={feedData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <FeedCard post={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192229",
  },
});

export default Feed;
