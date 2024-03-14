import React, {ReactElement} from "react";
import {styles} from "src/styles/components/ModalGlobal";
import Modal from "react-native-modal";
import {View} from "react-native";

interface ModalContainerProps {
  modalVisible: boolean;
  modalItem?: ReactElement;
  toggleModal: () => void;
}

function ModalGlobal({
  modalItem,
  modalVisible,
  toggleModal,
}: ModalContainerProps): ReactElement {
  return (
    <Modal
      style={styles.modal}
      isVisible={modalVisible}
      backdropOpacity={0.3}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}
      onBackdropPress={toggleModal}
      onSwipeComplete={(): void => {
        toggleModal();
      }}
      useNativeDriverForBackdrop
      swipeDirection="down"
      avoidKeyboard
    >
      <View style={styles.modalContent}>{modalItem}</View>
    </Modal>
  );
}

export default ModalGlobal;
