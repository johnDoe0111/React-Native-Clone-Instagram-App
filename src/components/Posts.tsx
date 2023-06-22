import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useAppSelector } from "../hooks/hooks";
import { IPost } from "../types/IPosts";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

interface IEditMode {
  handleOpenSwipeableModal: (value: string) => void;
  index: number;
}

type CombinedInterface = IPost & IEditMode;

const Posts: React.FC<CombinedInterface> = ({
  user,
  description,
  image,
  created_at,
  handleOpenSwipeableModal,
  _id,
  index,
}) => {
  const userId = useAppSelector((state) => state.authorization.user?._id);

  const [isExpanded, setIsExpanded] = useState(false);

  dayjs.extend(relativeTime);
  dayjs.locale("ru");

  return (
    <View style={{ marginTop: index !== 0 ? 50 : 0 }}>
      <View style={styles.generaLeft}>
        <View style={styles.leftItems}>
          <Image style={styles.headerImg} source={{ uri: user.avatar }} />
          <Text style={styles.text}>{user.username}</Text>
        </View>
        <Entypo
          onPress={() => handleOpenSwipeableModal(_id)}
          style={{ display: userId === user._id ? "flex" : "none" }}
          name="dots-three-horizontal"
          size={20}
          color="black"
        />
      </View>
      <View>
        <Image style={styles.mainImg} source={{ uri: image }} />
      </View>
      <View style={styles.postFooter}>
        <View style={styles.iconsBlock}>
          <View style={styles.leftIcons}>
            <Ionicons name="heart-outline" size={30} />
            <Ionicons name="chatbubble-outline" size={28} />
            <Ionicons name="ios-paper-plane-outline" size={28} />
          </View>
          <Octicons name="bookmark" size={28} />
        </View>
        <Text style={{ fontFamily: "mt-medium" }}>Нравится: 100</Text>
        <View style={styles.descBlock}>
          <View style={styles.usernameBlock}>
            <Text>{user.username}</Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              height: isExpanded ? "auto" : 17,
              paddingVertical: isExpanded ? 10 : 0,
            }}
          >
            <Text style={{ fontFamily: "mt-regular" }}>
              {isExpanded
                ? description
                : !isExpanded && description.length <= 20
                ? description
                : `${description.slice(0, 20)}...`}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
            <Text
              style={[styles.grayColor, { marginLeft: !isExpanded ? 5 : 0 }]}
            >
              {isExpanded
                ? "less"
                : !isExpanded && description.length <= 20
                ? ""
                : "more"}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.comments}>Смотреть все комментарии</Text>
        <View style={{ paddingTop: 10 }}>
          <View style={styles.addCommentBlock}>
            <Image
              style={styles.addCommentAvatar}
              source={{ uri: user.avatar }}
            />
            <Text style={[styles.grayColor, { paddingLeft: 10 }]}>
              Добавьте комментарий...
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.grayColor, { paddingTop: 10 }]}>
            {dayjs(+created_at).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  headerImg: {
    borderRadius: 50,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "white",
  },
  leftItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "mt-medium",
    paddingLeft: 10,
    fontSize: 13,
  },
  generaLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainImg: {
    width: "100%",
    height: 400,
  },
  iconsBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  leftIcons: {
    width: 115,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postFooter: {
    paddingHorizontal: 10,
  },
  descBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  comments: {
    color: "#8E8E8E",
    paddingTop: 10,
  },
  addCommentAvatar: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  addCommentBlock: {
    marginTop: 10,
    flexDirection: "row",
  },
  grayColor: {
    color: "#8E8E8E",
  },
  usernameBlock: {
    marginVertical: 0,
    paddingVertical: 0,
    height: 15,
  },
});
