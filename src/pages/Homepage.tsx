import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Ionicons,
  Entypo,
  Octicons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import {
  addPosts,
  deletePost,
  editPosts,
  getPosts,
} from "../redux/posts/postsAction";
import Posts from "../components/Post";
import * as ImagePicker from "expo-image-picker";
import SwipeModal from "../components/SwipeModal";
import EditModal from "../components/EdtModal";
import Toast from "react-native-root-toast";
import AddPostModal from "../components/AddPostModal";

export default function Homepage({ navigation }: any) {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.authorization);
  const { posts, isLoading, error } = useAppSelector((state) => state.posts);

  const [addPostModal, setAddPostModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [postId, setPostId] = useState("");

  const textInputRef = useRef<any>();
  const desc = posts
    .filter((i: { _id: string }) => i._id === postId)
    .map((post: { description: any }) => post.description);

  const selectPhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        let toast = Toast.show("Отказано в доступе к медиатеке", {
          duration: Toast.durations.LONG,
          backgroundColor: "green",
          opacity: 1,
          animation: true,
          position: Toast.positions.BOTTOM - 50,
        });
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 2000);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageURL(result.assets?.[0].uri);
        setAddPostModal(true);
      } else {
        let toast = Toast.show("Отменено пользователем", {
          duration: Toast.durations.LONG,
          backgroundColor: "green",
          opacity: 1,
          animation: true,
          position: Toast.positions.BOTTOM - 50,
        });
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 2000);
      }
    } catch (err) {
      let toast = Toast.show(`Ошибка выбора фотографии:${err}`, {
        duration: Toast.durations.LONG,
        backgroundColor: "green",
        opacity: 1,
        animation: true,
        position: Toast.positions.BOTTOM - 50,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }
  };

  const handleFormSubmit = async (
    values: { description: string },
    { resetForm }: any
  ) => {
    try {
      const formData = new FormData();
      formData.append("description", values.description);

      if (imageURL) {
        const fileUri = imageURL;
        const fileName = fileUri.split("/").pop() || "image.jpg";
        const fileExtension = fileName.split(".").pop() || "jpg";
        const fileMimeType = `image/${fileExtension}`;

        const fileInfo: Blob | any = {
          uri: fileUri,
          name: fileName,
          type: fileMimeType,
        };

        formData.append("image", fileInfo);
      }

      await dispatch(addPosts(formData));
      resetForm();
      Keyboard.dismiss();
      setAddPostModal(false);
    } catch (err) {
      let toast = Toast.show(`Ошибка при отправке данных:${err}`, {
        duration: Toast.durations.LONG,
        backgroundColor: "green",
        opacity: 1,
        animation: true,
        position: Toast.positions.BOTTOM - 50,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }
  };

  const handleOpenSwipeableModal = (id: string) => {
    setShowEditModal(true);
    setPostId(id);
  };

  const handleCloseSwipeableModal = () => {
    setShowEditModal(false);
  };

  const handleChangePostModalOpen = () => {
    setShowEditModal(false);
    setEdit(true);
  };

  const handleChangePostModalClose = () => {
    setEdit(false);
  };

  const handleChangePostFormSubmit = async (
    values: { description: string },
    { resetForm }: any
  ) => {
    await dispatch(editPosts({ postId, description: values.description }));

    resetForm();
    Keyboard.dismiss();
    setEdit(false);
  };

  const handleDeletePost = () => {
    handleCloseSwipeableModal;
    dispatch(deletePost(postId));
  };

  useEffect(() => {
    if (isAdmin) {
      navigation.navigate("Homepage");
    } else {
      navigation.navigate("Authorization");
    }
  }, [isAdmin]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      textInputRef.current.focus();
    }
  }, [edit]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#6A6A6A" />
      </View>
    );
  } else if (error) {
    return <Text style={{ flex: 1 }}>Ошибка!!!</Text>;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: showEditModal ? "rgba(0, 0, 0, 0.5)" : "white",
          opacity: showEditModal ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.iconsBlock}>
          <Ionicons name="heart-outline" size={30} />
          <Entypo name="direction" size={30} />
        </View>
      </View>
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <Posts
              {...item}
              handleOpenSwipeableModal={handleOpenSwipeableModal}
              index={index}
            />
          )}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerIcons}>
          <Entypo name="home" size={28} color="black" />
          <Fontisto name="search" size={24} color="black" />
          <Octicons
            name="diff-added"
            size={27}
            color="black"
            onPress={selectPhoto}
          />
          <Octicons name="video" size={30} color="black" />
          <FontAwesome
            onPress={() => navigation.navigate("ProfilePage")}
            name="user-circle"
            size={24}
            color="black"
          />
        </View>
      </View>
      <AddPostModal
        addPostModal={addPostModal}
        handleFormSubmit={handleFormSubmit}
        setAddPostModal={setAddPostModal}
        imageURL={imageURL}
      />
      <SwipeModal
        showEditModal={showEditModal}
        onClose={handleCloseSwipeableModal}
        changePostModal={handleChangePostModalOpen}
        handleDeletePost={handleDeletePost}
      />
      <EditModal
        edit={edit}
        desc={desc}
        changePostForm={handleChangePostFormSubmit}
        changePostModalClose={handleChangePostModalClose}
        postId={postId}
        textInputRef={textInputRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  logo: {
    fontSize: 25,
    fontFamily: "mt-medium",
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
  },
  iconsBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 80,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
