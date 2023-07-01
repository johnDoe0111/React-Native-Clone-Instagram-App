import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from "react-native";

import { Octicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

interface Props {
  showEditModal: boolean;
  onClose: () => void;
  changePostModal: () => void;
  handleDeletePost: () => void;
}

const SwipeModal: React.FC<Props> = ({
  showEditModal,
  onClose,
  changePostModal,
  handleDeletePost,
}) => {
  return (
    <Modal visible={showEditModal} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
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
            <TouchableOpacity onPress={changePostModal}>
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
      </View>
    </Modal>
  );
};

export default SwipeModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: "white",
    height: "90%",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  editModalSwap: {
    height: 5,
    width: 50,
    borderRadius: 15,
    backgroundColor: "#ebd8d8",
  },
  saveGeneralBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  saveBlock: {
    backgroundColor: "#ebd8d8",
    width: 170,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
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
});
