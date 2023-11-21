import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import GroupClusterCard from "./GroupClusterCard.component";

const groupClusterData = [
  {
    id: 1,
    clusterImage:
      "https://images.pexels.com/photos/3220090/pexels-photo-3220090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    members: [
      {
        id: 101,
        name: "Membro 1",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        id: 102,
        name: "Membro 2",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        id: 103,
        name: "Membro 3",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/3.jpg",
      },
    ],
    name: "Metal",
    numGroups: 5,
    numMembers: 100,
  },
  {
    id: 2,
    clusterImage:
      "https://images.pexels.com/photos/3379257/pexels-photo-3379257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    members: [
      {
        id: 104,
        name: "Membro 4",
        memberPhoto:
          "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 105,
        name: "Membro 5",
        memberPhoto:
          "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        id: 106,
        name: "Membro 6",
        memberPhoto:
          "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ],
    name: "E-Harmony",
    numGroups: 3,
    numMembers: 75,
  },
  {
    id: 3,
    clusterImage:
      "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    members: [
      {
        id: 107,
        name: "Membro 7",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        id: 108,
        name: "Membro 8",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/5.jpg",
      },
      {
        id: 109,
        name: "Membro 9",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/6.jpg",
      },
    ],
    name: "Mid-Echoes",
    numGroups: 7,
    numMembers: 120,
  },
  {
    id: 4,
    clusterImage:
      "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    members: [
      {
        id: 110,
        name: "Membro10",
        memberPhoto:
          "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        id: 111,
        name: "Membro11",
        memberPhoto:
          "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        id: 112,
        name: "Membro12",
        memberPhoto:
          "https://randomuser.me/api/portraits/men/6.jpg",
      },
    ],
    name: "SynthWave",
    numGroups: 3,
    numMembers: 40,
  },
  {
    id: 5,
    clusterImage:
      "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    members: [
      {
        id: 113,
        name: "Membro13",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/7.jpg",
      },
      {
        id: 114,
        name: "Membro14",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/8.jpg",
      },
      {
        id: 115,
        name: "Membro15",
        memberPhoto:
          "https://randomuser.me/api/portraits/women/9.jpg",
      },
    ],
    name: "Voice Female",
    numGroups: 20,
    numMembers: 110,
  },
  // Adicione mais dados fictícios conforme necessário
];

const GroupCluster = () => {
  const [showMore, setShowMore] = useState(false);

  const visibleGroupClusters = showMore
    ? groupClusterData
    : [...groupClusterData.slice(0, 6), { id: "more", type: "button" }];

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleGroupClusters}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isLastCluster = index === visibleGroupClusters.length - 1;
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
          return (
            <GroupClusterCard cluster={item} isLastCluster={isLastCluster} />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
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

export default GroupCluster;
