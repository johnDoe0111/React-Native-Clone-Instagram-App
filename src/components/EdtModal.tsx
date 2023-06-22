import { ReactNode } from "react";
import { StyleSheet, Modal, View, Text } from "react-native";

interface IEdit {
  edit: boolean;
  children: any;
}

const EditModal: React.FC<IEdit> = ({ edit, children }) => {
  return (
    <Modal visible={edit} animationType="slide">
      {children}
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({});
