import React, { ReactNode, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  PanResponder,
} from "react-native";

interface ISwipeModal {
  children: ReactNode;
  showEditModal: boolean;
  onClose: () => void;
}

const SwipeableModal: React.FC<ISwipeModal> = ({
  children,
  showEditModal,
  onClose,
}) => {
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            velocity: gestureState.vy,
            tension: 20,
            friction: 20,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const animatedStyles = {
    transform: [{ translateY: panY }],
  };

  return (
    <Modal visible={showEditModal} transparent>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modalContent, animatedStyles]}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SwipeableModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  overlay: {
    flex: 1,
  },
  modalContent: {
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
