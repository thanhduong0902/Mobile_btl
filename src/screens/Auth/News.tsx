import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "src/utils/Icon";

function NewsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon icon="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bảng tin</Text>
        <TouchableOpacity onPress={() => {/* Xử lý logic khi nhấn nút tạo mới */}} style={styles.addButton}>
          <Icon icon="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Thêm nội dung của bảng tin ở đây */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1D6",
  },
  header: {
    backgroundColor: "#D2672A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomRightRadius: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    padding: 10,
  },
  addButton: {
    padding: 10,
  },
});

export default NewsScreen;