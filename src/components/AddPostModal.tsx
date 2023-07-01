import { Formik } from "formik";
import React from "react";
import {
  Keyboard,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  addPostModal: boolean;
  handleFormSubmit: any;
  setAddPostModal: (value: boolean) => void;
  imageURL: string;
}

const AddPostModal: React.FC<Props> = ({
  addPostModal,
  handleFormSubmit,
  setAddPostModal,
  imageURL,
}) => {
  return (
    <Modal visible={addPostModal} animationType="slide">
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
                    onPress={() => setAddPostModal(false)}
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
  );
};

export default AddPostModal;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
  },
  textBlock: {
    flexDirection: "row",
  },
  firstText: {
    fontSize: 16,
    fontFamily: "mt-medium",
  },
  secondText: {
    fontSize: 18,
    color: "#0095F6",
  },
  modalMain: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
  },
  modalImg: {
    width: 50,
    height: 70,
  },
  postDesc: {
    fontSize: 16,
    paddingLeft: 10,
  },
});
