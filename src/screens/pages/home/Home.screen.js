import React from "react";
import {
  BackHandler,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { WeatherCity } from "../../../components/WeatherCity/WeatherCity.component";
import HomeStories from "../../../components/Stories/HomeStories.component";
import BannerAd from "../../../components/Events/BannerAd.component";
import Event from "../../../components/Events/Event.screen.component";
import GroupCluster from "../../../components/GroupCluster/GroupCluster.screen.component";
import Feed from "../../../components/Feed/Feed.screen.component";
import NavigationBar from "../../../components/NavigationBar.component";

const icon = require("../../../../assets/icon.png");

class HomePage extends React.Component {
  componentDidMount() {
    Alert.alert(
      "Conta acessada com sucesso!",
      "Esta é uma versão de demonstração do aplicativo",
      [{ text: "OK" }]
    );
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.statusBar} />
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image source={icon} style={{ width: 48, height: 55 }} />
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Feather
                  name="plus-circle"
                  size={24}
                  color="#737E86"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome5
                  name="bell"
                  size={24}
                  color="#737E86"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Avatar.Image
                  source={{
                    uri: "https://images.pexels.com/photos/4220967/pexels-photo-4220967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  }}
                  size={50}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#FA3235",
                    borderWidth: 4,
                    borderRadius: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <WeatherCity />
            <View style={{ maxHeight: 150, margin: 15 }}>
              <HomeStories stories={stories} />
            </View>
            <BannerAd />
            <Event />
            <GroupCluster />
            <Feed />
          </View>
        </ScrollView>
        <View style={styles.footer}>{/* <NavigationBar /> */}</View>
      </>
    );
  }
}

const stories = [
  {
    user: "userId1", // Substitua 'userId1' pelo ID do usuário
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/2753432/pexels-photo-2753432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    expiresAt: new Date(),
    viewers: ["userId1"], // Substitua 'userId1' pelo ID do usuário
    reactions: [
      {
        user: "userId1", // Substitua 'userId1' pelo ID do usuário
        emoji: "😍",
      },
    ],
  },
  {
    user: "userId2", // Substitua 'userId2' pelo ID do usuário
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    expiresAt: new Date(),
    viewers: ["userId2"], // Substitua 'userId2' pelo ID do usuário
    reactions: [
      {
        user: "userId2", // Substitua 'userId2' pelo ID do usuário
        emoji: "😄",
      },
    ],
  },
  {
    user: "userId3", // Substitua 'userId3' pelo ID do usuário
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    expiresAt: new Date(),
    viewers: ["userId3"], // Substitua 'userId3' pelo ID do usuário
    reactions: [
      {
        user: "userId3", // Substitua 'userId3' pelo ID do usuário
        emoji: "👏",
      },
    ],
  },
  {
    user: "userId4", // Substitua 'userId4' pelo ID do usuário
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg",
    expiresAt: new Date(),
    viewers: ["userId4"], // Substitua 'userId4' pelo ID do usuário
    reactions: [
      {
        user: "userId4", // Substitua 'userId4' pelo ID do usuário
        emoji: "🔥",
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192229",
  },
  statusBar: {
    backgroundColor: "#212C35",
    height: 30,
  },
  header: {
    backgroundColor: "#212C35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomePage;
