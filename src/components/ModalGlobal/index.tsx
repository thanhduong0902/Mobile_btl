import React, { ReactElement } from "react";
import { styles } from "src/styles/components/ModalGlobal";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";

interface ModalContainerProps {
  modalVisible: boolean;
  modalItem?: ReactElement;
  toggleModal: () => void;
  handleAddSon: () => void
  handleAddMate: () => void;
}

function ModalGlobal({
  modalItem,
  modalVisible,
  toggleModal,
  handleAddSon,
  handleAddMate
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
      <View style={{
        alignItems: "center", justifyContent: "center", backgroundColor: "white",
        borderRadius: 10,
        padding: 20
      }}>
        <Text>Thêm thành viên</Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={{
              borderWidth: 1, borderColor: "orange",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              width: 120,
              marginHorizontal: 10
            }}
            onPress={handleAddSon}
          >
            <Text>Thêm con</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1, borderColor: "orange",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              width: 120,
              marginHorizontal: 10
            }}
            onPress={handleAddMate}
          >
            <Text>Thêm vợ chồng</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

export default ModalGlobal;
