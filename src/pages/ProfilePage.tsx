import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useAppSelector } from "../hooks/hooks";
import {
  Ionicons,
  Entypo,
  Octicons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { Key } from "react";

const Profile = ({ navigation }: any) => {
  const { user } = useAppSelector((state) => state.authorization);
  const { posts } = useAppSelector((state) => state.posts);
  const postsLength = posts.filter(
    (i: { user: { _id: any } }) => i.user._id === user?._id
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.userBlock}>
        <Text style={styles.userText}>{user?.username}</Text>
        <ScrollView>
          <View style={styles.userInfo}>
            <Image style={styles.avatar} source={{ uri: user?.avatar }} />
            <View style={styles.subInfo}>
              <View>
                <Text style={styles.font}>{postsLength}</Text>
                <Text style={styles.secondFont}>Публикации</Text>
              </View>
              <View>
                <Text style={styles.font}>0</Text>
                <Text style={styles.secondFont}>Подписчики</Text>
              </View>
              <View>
                <Text style={styles.font}>0</Text>
                <Text style={styles.secondFont}>Подпсики</Text>
              </View>
            </View>
          </View>
          <View style={styles.optionsBlock}>
            <View style={styles.subOptionsBlock}>
              <Text style={styles.font}>Изменить</Text>
            </View>
            <View style={[styles.subOptionsBlock, { paddingVertical: 7 }]}>
              <Text style={[styles.font, { fontSize: 11 }]}>
                Поделиться профилем
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#ebd8d8",
                width: "8%",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Ionicons name="person-add-outline" size={15} color="black" />
            </View>
          </View>
          <View style={styles.imagesBlock}>
            {posts
              .filter((i: { user: { _id: any } }) => i.user._id === user?._id)
              .map((post: { _id: Key | null | undefined; image: any }) => (
                <View key={post._id}>
                  <Image
                    style={styles.postImage}
                    source={{ uri: post.image }}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerIcons}>
          <Entypo
            onPress={() => navigation.navigate("Homepage")}
            name="home"
            size={28}
            color="black"
          />
          <Fontisto name="search" size={24} color="black" />
          <Octicons name="diff-added" size={27} color="black" />
          <Octicons name="video" size={30} color="black" />
          <FontAwesome name="user-circle" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userText: {
    fontFamily: "mt-bold",
    fontSize: 20,
  },
  userBlock: {
    padding: 15,
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  subInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  font: {
    fontFamily: "mt-medium",
    textAlign: "center",
  },
  secondFont: {
    fontFamily: "mt-regular",
    fontSize: 12,
  },
  optionsBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  subOptionsBlock: {
    backgroundColor: "#ebd8d8",
    width: "44%",
    borderRadius: 5,
    paddingVertical: 5,
  },
  imagesBlock: {
    flexDirection: "row",
  },
  postImage: {
    width: 120,
    height: 120,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#DBDBDB",
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
