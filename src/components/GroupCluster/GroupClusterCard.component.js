import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const GroupClusterCard = ({ cluster, isLastCluster }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isLastCluster ? styles.lastCard : null]}
    >
      <Image source={{ uri: cluster.clusterImage }} style={styles.photo} />
      <View style={styles.bottomSection}>
        <View style={styles.membersSection}>
          {cluster.members.map((member, index) => {
            return (
              <Image
                key={member.id}
                source={{ uri: member.memberPhoto }}
                style={[
                  styles.memberPhoto,
                  { position: "absolute", bottom: 0, left: 10 * index },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.clusterName}>{cluster.name}</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share-2" size={14} color="#737E86" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.info}>
            <MaterialCommunityIcons
              name="home-group"
              size={14}
              color="#58656F"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.groupCount}>{cluster.numGroups} Grupos</Text>
          </View>
          <View style={styles.info}>
            <FontAwesome
              name="group"
              size={14}
              color="#58656F"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.memberCount}>{cluster.numMembers} Membros</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 170,
    backgroundColor: "#2A3844",
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  lastCard: {
    marginRight: 0,
  },
  photo: {
    width: 120,
    height: 60,
    resizeMode: "cover",
    borderRadius: 10,
  },
  bottomSection: {
    marginTop: 10,
  },
  membersSection: {
    flexDirection: "row",
    marginBottom: 5,
  },
  memberPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "#FA3235",
    borderWidth: 1,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clusterName: {
    fontSize: 14,
    color: "#FA3235",
    fontWeight: "600",
    lineHeight: 20,
  },
  infoSection: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupCount: {
    color: "#9FA6AC",
  },
  memberCount: {
    color: "#9FA6AC",
  },
});

export default GroupClusterCard;
