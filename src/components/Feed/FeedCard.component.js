import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const FeedCard = ({ post }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.userPhoto }} style={styles.userPhoto} />
          <View>
            <Text style={styles.userName}>{post.userName}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="music-note-plus"
                size={12}
                color="#737E86"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.postTime}>{post.postTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.postInfo}>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#737E86" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Parte central do card */}
      <View style={styles.postContent}>
        <Text style={styles.postText}>{post.text}</Text>
        <View style={styles.postTags}>
          <FlatList
            horizontal
            data={post.tags}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.tag}>
                <Text style={{ color: "#FA3235", textAlign: "center" }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {post.media && (
          <Image source={{ uri: post.media }} style={styles.postMedia} />
        )}
      </View>

      {/* Parte inferior do card (comentários e ações) */}
      <View style={styles.footer}>
        <View style={styles.comments}>
          {post.comments.slice(0, 5).map((comment, index) => (
            <Image
              key={comment.id}
              source={{ uri: comment.userPhoto }}
              style={[
                styles.commentUserPhoto,
                { position: "absolute", bottom: 0, left: 10 * index },
              ]}
            />
          ))}
          <Text style={styles.commentCount}>
            {post.comments.length} comentários
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={{ marginRight: 5 }}>
            <AntDesign name="hearto" size={24} color="#737E86" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 2.5 }}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color="#737E86"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="md-arrow-redo-outline" size={24} color="#737E86" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2A3844",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    borderColor: "#FA3235",
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FA3235",
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  postTime: {
    color: "#737E86",
    marginRight: 5,
    fontSize: 10,
  },
  postContent: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center25"
  },
  postText: {
    fontSize: 14,
    color: "#fff",
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 5,
  },
  postTags: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#9B9B9B",
    borderRadius: 20,
    paddingVertical: 6.5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  postMedia: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentUserPhoto: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 5,
    borderColor: "#FA3235",
    borderWidth: 1,
  },
  commentCount: {
    fontSize: 12,
    color: "#9FA6AC",
    marginLeft: "35%",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FeedCard;
