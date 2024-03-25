import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import Icon from "src/utils/Icon";

function CreateNewsScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.uri) {
        setImageUri(response.uri);
      }
    });
  };

  const handleAddNews = () => {
    if (!topic || !date || !detail) {
      Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin");
      return;
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon icon="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tạo mới bảng tin</Text>
        <TouchableOpacity onPress={handleAddNews} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Chủ đề"
          placeholderTextColor="#999"
          value={topic}
          onChangeText={setTopic}
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày"
          placeholderTextColor="#999"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Chi tiết"
          placeholderTextColor="#999"
          multiline
          value={detail}
          onChangeText={setDetail}
        />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
          <Text style={styles.selectImageText}>Chọn ảnh</Text>
        </TouchableOpacity>
      </View>
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
  saveButton: {
    padding: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  selectImageButton: {
    backgroundColor: "#D88249",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  selectImageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateNewsScreen;