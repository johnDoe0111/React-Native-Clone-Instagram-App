import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
  Image,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Ionicons,
  Entypo,
  Octicons,
  Fontisto,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import {
  addPosts,
  deletePost,
  editPosts,
  getPosts,
} from "../redux/posts/postsAction";
import Posts from "../components/Posts";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import SwipeableModal from "../components/SwipeableModal";
import EditModal from "../components/EdtModal";

export default function Homepage({ navigation }: any) {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.authorization);
  const { posts, isLoading, error } = useAppSelector((state) => state.posts);

  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [postId, setPostId] = useState("");

  const textInputRef = useRef<any>();
  const desc = posts
    .filter((i) => i._id === postId)
    .map((post) => post.description);

  const selectPhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        console.log("Отказано в доступе к медиатеке");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageURL(result.assets?.[0].uri);
        setShowModal(true);
      } else {
        console.log("Отменено пользователем");
      }
    } catch (err) {
      console.log("Ошибка выбора фотографии:", err);
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
      setShowModal(false);
    } catch (err) {
      console.log("Ошибка при отправке данных:", err);
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
      <Modal visible={showModal} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{ flex: 1 }}>
            <Formik
              initialValues={{
                description: "",
                image: File,
              }}
              onSubmit={handleFormSubmit}
            >
              {({ handleChange, values, handleBlur, handleSubmit }) => (
                <View>
                  <View style={styles.modalHeader}>
                    <AntDesign
                      name="close"
                      size={28}
                      color="black"
                      onPress={() => setShowModal(false)}
                    />
                    <View style={styles.textBlock}>
                      <Text style={styles.firstText}>Новая публикация</Text>
                      <TouchableOpacity onPress={handleSubmit as any}>
                        <Text style={styles.secondText}>Поделиться</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.modalMain}>
                    <Image style={styles.modalImg} source={{ uri: imageURL }} />
                    <TextInput
                      style={styles.postDesc}
                      placeholder="Добавьте подпись..."
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
      <SwipeableModal
        showEditModal={showEditModal}
        onClose={handleCloseSwipeableModal}
      >
        <View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.editModalSwap}></View>
          </View>
          <View style={styles.saveGeneralBlock}>
            <View style={styles.saveBlock}>
              <Octicons name="bookmark" size={24} />
              <Text style={{ fontSize: 12, fontFamily: "mt-regular" }}>
                Сохранить
              </Text>
            </View>
            <View style={styles.saveBlock}>
              <MaterialCommunityIcons name="qrcode-scan" size={24} />
              <Text style={{ fontSize: 12, fontFamily: "mt-regular" }}>
                QR-код
              </Text>
            </View>
          </View>
          <View style={styles.generalEditBlock}>
            <TouchableOpacity onPress={handleChangePostModalOpen}>
              <View style={styles.editBlock}>
                <Octicons name="pencil" size={28} color="black" />
                <Text style={styles.editText}>Изменить</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePost}>
              <View style={styles.deleteBlock}>
                <Feather name="trash" size={24} color="red" />
                <Text style={styles.deleteText}>Удалить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SwipeableModal>
      <EditModal edit={edit}>
        <SafeAreaView style={{ flex: 1 }}>
          <Formik
            initialValues={{
              description: `${desc}`,
            }}
            onSubmit={handleChangePostFormSubmit}
          >
            {({ handleChange, values, handleBlur, handleSubmit }) => (
              <View>
                <View style={styles.editModalHeder}>
                  <Text
                    style={styles.headerText}
                    onPress={handleChangePostModalClose}
                  >
                    Отмена
                  </Text>
                  <Text style={{ fontFamily: "mt-medium", fontSize: 18 }}>
                    Редактировать
                  </Text>
                  <Text onPress={handleSubmit as any} style={styles.headerText}>
                    Готово
                  </Text>
                </View>
                <View>
                  {posts
                    .filter((i) => i._id === postId)
                    .map((post) => (
                      <View key={post._id}>
                        <View style={styles.changePostHeader}>
                          <Image
                            style={styles.changePostUserAvatar}
                            source={{ uri: post.user.avatar }}
                          />
                          <Text style={styles.changePostHeaderText}>
                            {post.user.username}
                          </Text>
                        </View>
                        <View style={{ height: "100%" }}>
                          <ScrollView>
                            <Image
                              style={styles.changePostImg}
                              source={{ uri: post.image }}
                            />
                            <TextInput
                              placeholder="Добавьте подпись"
                              style={styles.changePostInput}
                              ref={textInputRef}
                              value={values.description}
                              onChangeText={handleChange("description")}
                              onBlur={handleBlur("description")}
                            />
                          </ScrollView>
                        </View>
                      </View>
                    ))}
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </EditModal>
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
  modalImg: {
    width: 50,
    height: 70,
  },
  modalHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
  },
  firstText: {
    fontSize: 16,
    fontFamily: "mt-medium",
  },
  secondText: {
    fontSize: 18,
    color: "#0095F6",
  },
  textBlock: {
    flexDirection: "row",
  },
  modalMain: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
  },
  postDesc: {
    fontSize: 16,
    paddingLeft: 10,
  },
  editModalSwap: {
    height: 5,
    width: 50,
    borderRadius: 15,
    backgroundColor: "#ebd8d8",
  },
  saveBlock: {
    backgroundColor: "#ebd8d8",
    width: 170,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  saveGeneralBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  generalEditBlock: {
    backgroundColor: "#ebd8d8",
    width: "100%",
    marginTop: 10,
    borderRadius: 15,
  },
  editBlock: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dbc8c8",
    padding: 10,
  },
  editText: {
    fontSize: 16,
    paddingLeft: 5,
  },
  deleteText: {
    fontSize: 16,
    paddingLeft: 5,
    color: "red",
  },
  deleteBlock: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  editModalHeder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
  },
  headerText: {
    fontSize: 16,
    fontFamily: "mt-regular",
  },
  changePostUserAvatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "white",
  },
  changePostHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
    padding: 10,
  },
  changePostHeaderText: {
    fontFamily: "mt-medium",
    paddingLeft: 5,
    color: "gray",
  },
  changePostImg: {
    height: 230,
  },
  changePostInput: {
    padding: 20,
  },
});
