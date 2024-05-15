import React, { ReactElement } from "react";
import { styles } from "src/styles/components/ModalGlobal";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";

interface ModalContainerProps {
    modalVisible: boolean;
    modalItem?: ReactElement;
    toggleModal: () => void;
}

function ModalAddAlbum({
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
            <View style={{
                alignItems: "center", justifyContent: "center", backgroundColor: "white",
                borderRadius: 10,
                padding: 20
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Album mới</Text>
                <Text style={{ fontSize: 12 }}>Nhập tên cho album này</Text>

                <View style={{ flexDirection: "row", marginTop: 20 }}>

                </View>
            </View>
        </Modal>
    );
}

export default ModalAddAlbum;
