import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ReactElement, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "src/components/headers/Header";
import { AppRootParamList } from "src/routes/RouteList";
import { Formik } from "formik";
import TextGlobal from "src/components/TextGlobal";
import config from "src/config";
import SelectDropDown from "react-native-select-dropdown"
import { useMutation, useQueryClient } from "react-query";
import ApiFamilyTree from "src/api/FamilyTree/ApiFamilyTree";
import { values } from "lodash";
import Icon from "src/utils/Icon";
import { showSuccess } from "src/utils/notification";
import Modal from "react-native-modal"
import ImagePicker from "react-native-image-crop-picker"

function MemberDetail(): ReactElement {
    const navigation = useNavigation()
    const route = useRoute<RouteProp<AppRootParamList, "MemberDetailRoute">>();
    const { id, data } = route.params
    const queryClient = useQueryClient()
    const [visible, setVisible] = useState<boolean>(false);
    const close = (): void => setVisible(false);
    const open = (): void => setVisible(true);

    const updateMemberMutation = useMutation({
        mutationFn: ApiFamilyTree.updateMember
    })
    const handleSave = async (values) => {
        const body = { ...values };

        // Kiểm tra nếu giới tính là "Nam" thì gán giá trị 0, ngược lại gán 1
        if (body.sex === "Nam") {
            body.sex = 0;
        } else {
            body.sex = 1;
        }
        body.photoURL = imageProfile
        updateMemberMutation.mutate(body, {
            onSuccess: (response) => {
                queryClient.prefetchQuery("memberByGen")
                showSuccess("Thành công")
                navigation.goBack()
            }
        })
    }

    const addImageMutation = useMutation({
        mutationFn: ApiFamilyTree.addImage,
        // onSuccess: (data) => {
        //     refetch()
        //     toast.success(data.data.message, {
        //         position: 'top-center',
        //         autoClose: 1000
        //     })
        // }
    })
    const [imageProfile, setImageProfile] = useState()



    const chooseImage = (): void => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImageProfile(image.path)
        });
    };

    const openCamera = (): void => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
        });
    };

    return (
        <View style={styles.root}>
            <Header
                title={data.fullName ?? ""}
            />
            <View style={{
                backgroundColor: "#F3F2D6",
                padding: 10
            }}>
                <Formik
                    onSubmit={handleSave}
                    initialValues={{
                        id: id,
                        fullName: data.fullName || "",
                        photoURL: data.photoURL || "",
                        sex: data.sex === 0 ? "Nam" : "Nữ ",
                        birthday: data.birthday || "",
                        maritalStatus: data.maritalStatus === "Married" ? "Đã kết hôn" : "Độc thân",
                        education: data.education || "",
                        job: data.job || "",
                        address: data.address || "",
                        phone: data.phone || "",

                    }}
                >{({ handleSubmit, setFieldValue, values }): ReactElement => (
                    <View style={{
                        backgroundColor: "white"
                        , borderRadius: 10,
                        padding: 10,
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={{ uri: imageProfile ?? values.photoURL }}
                                style={
                                    {
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10,
                                        resizeMode: "contain"
                                    }
                                }

                            />
                            <TouchableOpacity
                                onPress={open}
                            >
                                <Text>+ Them anh dai dien</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TextGlobal size="bold">Họ và tên</TextGlobal>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={(text) => setFieldValue('fullName', text)}

                                    placeholder="Họ tên"
                                    value={values.fullName}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ width: "46%" }}>
                                <TextGlobal size="bold">Giới tính</TextGlobal>
                                <View style={[styles.inputContainer]}>

                                    <TextInput
                                        onChangeText={(text) => setFieldValue('sex', text)}
                                        placeholder="Giới tính"
                                        value={values.sex}
                                    />


                                </View>
                            </View>
                            <View style={{ width: "46%" }}>
                                <TextGlobal size="bold">Tình trạng hôn nhân</TextGlobal>
                                <View style={[styles.inputContainer]}>

                                    <TextInput
                                        onChangeText={(text) => setFieldValue('maritalStatus', text)}

                                        placeholder="Tình trạng hôn nhân"
                                        value={values.maritalStatus}
                                    />

                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                            <View style={{ width: "46%" }}>
                                <TextGlobal size="bold">Ngày sinh</TextGlobal>
                                <View style={[styles.inputContainer]}>

                                    <TextInput
                                        onChangeText={(text) => setFieldValue('birthday', text)}

                                        placeholder="Ngày sinh"
                                        value={values.birthday}
                                    />
                                </View>
                            </View>
                            <View style={{ width: "46%" }}>
                                <TextGlobal size="bold">Số điện thoại</TextGlobal>
                                <View style={[styles.inputContainer]}>

                                    <TextInput
                                        onChangeText={(text) => setFieldValue('phone', text)}

                                        placeholder="Số điện thoại"
                                        value={values.phone}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <TextGlobal size="bold">Địa chỉ chi tiết</TextGlobal>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={(text) => setFieldValue('address', text)}

                                    placeholder="Địa chỉ chi tiết"
                                    value={values.address}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                borderRadius: 10,
                                backgroundColor: "#F2F1D3",
                                padding: 5,
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                            onPress={(): void => handleSubmit()}
                        >

                            <Icon icon="cart_id" size={30} color="orange" />
                            <Text style={{ marginLeft: 10, color: "orange", fontWeight: "bold" }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                )}


                </Formik>
            </View>
            <Modal
                isVisible={visible}
                onBackButtonPress={close}
                onBackdropPress={close}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                backdropOpacity={0.3}
                style={{ justifyContent: "flex-end", margin: 0 }}
            >
                <View style={styles.options}>
                    <View style={styles.option}>
                        <TextGlobal style={styles.textOptionSelect}>
                            Lựa chọn ảnh của bạn
                        </TextGlobal>
                    </View>
                    <TouchableOpacity style={styles.option} onPress={chooseImage}>
                        <Text style={{ fontSize: 20, color: "#3563E9" }}>
                            Từ thư viện ảnh
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={openCamera}>
                        <Text style={{ fontSize: 20, color: "#3563E9" }}>
                            Máy ảnh
                        </Text>
                    </TouchableOpacity>
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
    row: {
        marginVertical: 10
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
        width: "100%",
    },
    textOptionSelect: {
        fontSize: 22,
    },
    imageProduct: {
        height: 90,
        borderRadius: 3,
    },
    imageItemWrapper: {
        position: "relative",
    },
    iconClose: {
        position: "absolute",
        right: 2,
        top: 2,
    },
    options: {
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: 200,
        paddingBottom: 10,
    },

    option: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    avatarWrap: {
        marginBottom: 30,
        alignItems: "center",
    },
    avatar: {
        height: 131,
        width: 131,
        borderRadius: 65.5,
    },

})

export default MemberDetail;