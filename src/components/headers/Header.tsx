
import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextGlobal from "../TextGlobal";
import Icon from "src/utils/Icon";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
    title: string,
    handleSaveMember?: () => void
    isSave?: boolean
}


function Header({ title, handleSaveMember, isSave }: HeaderProps): ReactElement {

    const navigation = useNavigation()
    return (
        <View style={styles.root}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    flexDirection: "row",
                    backgroundColor: "#D2672A",
                    alignItems: "center",
                }}>
                <Icon icon="ArrowLeft_2" size={20} color="white" />
                <Text style={styles.textHeader}>{title}</Text>
            </TouchableOpacity>
            {isSave && (
                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#F2F1D3",
                        padding: 5,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Icon icon="cart_id" size={30} color="orange" />
                    <Text style={{ marginLeft: 10, color: "orange", fontWeight: "bold" }}>Lưu</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        backgroundColor: "#D2672A",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    textHeader: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10
    }
});

export default Header;
