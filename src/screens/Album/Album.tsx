import { RouteProp, useRoute } from "@react-navigation/native";
import { ReactElement, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { useMutation, useQuery } from "react-query";
import ApiFamilyTree from "src/api/FamilyTree/ApiFamilyTree";
import ModalAddAlbum from "src/components/ModalAddAlbum";
import Header from "src/components/headers/Header";
import { AppRootParamList } from "src/routes/RouteList";
import { getScreenWidth } from "src/utils/layout/layout";
import Modal from "react-native-modal"
import { TextInput } from "react-native";
import config from "src/config";
import { showSuccess } from "src/utils/notification";
import AlbumDetail from "./AlbumDetail";

function Album(): ReactElement {
    const route = useRoute<RouteProp<AppRootParamList, "AlbumRoute">>();
    const { idTree } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitlte] = useState("")

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    const albumData = useQuery({
        queryKey: ['album'],
        queryFn: () => {
            return ApiFamilyTree.getAlbum(idTree)
        },
        // keepPreviousData: true,
    })
    const creatAlbumMutation = useMutation({
        mutationFn: (data: any) => ApiFamilyTree.createAlbum(data)
    })

    const handleAddAlbum = () => {
        const name = {
            name: title
        }

        creatAlbumMutation.mutate({ idTree: idTree, name }, {
            onSuccess: (response) => {

                toggleModal()
                showSuccess("Thành công")
                albumData.refetch()
            }
        })
    }
    return (
        <View style={styles.root}>
            <Header
                title="Ảnh gia đình"
            />
            <View style={{
                alignItems: "center", justifyContent: "center",
                marginVertical: 10
            }}>
                <Button
                    title="Thêm album"
                    buttonStyle={styles.buttonStyle}
                    onPress={() => setModalVisible(true)}
                />
            </View>
            {albumData.data?.data.map((item, index) => (
                <AlbumDetail data={item} key={item.id} />
            ))}
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
                        <View style={[styles.inputContainer]}>

                            <TextInput
                                onChangeText={(text) => setTitlte(text)}
                                placeholder="Tiêu đề"
                                value={title}
                            />
                        </View>
                    </View>
                    <Button
                        title="Lưu"
                        buttonStyle={styles.button}
                        onPress={handleAddAlbum}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F3F2D6"
    },
    buttonStyle: {
        padding: 10,
        backgroundColor: "#D2672A",
        borderRadius: 10
    },
    button: {
        width: 80,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#D2672A"
    },
    modal: {
        justifyContent: "center",
        margin: 0,
        alignItems: "center"
    },
    inputContainer: {
        alignItems: "center",
        marginTop: 5,
        backgroundColor: config.COLOR_CONFIG.WHITE,
        borderColor: config.COLOR_CONFIG.NEUTRALS_6,
        borderRadius: 12,
        borderWidth: 1,
        color: config.COLOR_CONFIG.NEUTRALS_4,
        flexDirection: "row",
        height: 48,
        paddingRight: 16,
        paddingLeft: 10,
        width: "60%",
    },
})

export default Album;