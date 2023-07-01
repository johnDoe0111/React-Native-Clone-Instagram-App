import { Formik } from "formik";
import React, { Key } from "react";
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useAppSelector } from "../hooks/hooks";

interface Props {
  edit: boolean;
  desc: any;
  changePostForm: any;
  changePostModalClose: () => void;
  postId: string;
  textInputRef: any;
}

const EditModal: React.FC<Props> = ({
  edit,
  desc,
  changePostForm,
  changePostModalClose,
  postId,
  textInputRef,
}) => {
  const { posts } = useAppSelector((state) => state.posts);

  return (
    <Modal visible={edit} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <Formik
          initialValues={{
            description: `${desc}`,
          }}
          onSubmit={changePostForm}
        >
          {({ handleChange, values, handleBlur, handleSubmit }) => (
            <View>
              <View style={styles.editModalHeader}>
                <Text style={styles.headerText} onPress={changePostModalClose}>
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
                  .filter((i: { _id: string }) => i._id === postId)
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
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  editModalHeader: {
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
  changePostHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
    padding: 10,
  },
  changePostUserAvatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "white",
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
