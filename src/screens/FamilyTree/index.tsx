import {useNavigation} from "@react-navigation/native";
import React, {ReactElement} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Button} from "react-native-elements";
import StatusBar from "src/components/StatusBar";
import config from "src/config";
import Icon from "src/utils/Icon";

function FamiyTree(): ReactElement {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Gia phả</Text>
        <Button title="+ Tạo mới" buttonStyle={styles.addButton} />
      </View>
      <ScrollView style={{paddingBottom: 50}}>
        <View style={styles.container}>
          <Text style={{fontSize: 16, fontWeight: "bold"}}>
            Gia đình Thanh Dương
          </Text>
          <View style={styles.rowContent}>
            <View style={styles.row}>
              <Icon icon="Teacher_2" size={12} color="black" />
              <Text style={{paddingLeft: 10}}>2 Đời</Text>
            </View>
            <View style={styles.row}>
              <Icon icon="Teacher_2" size={12} color="black" />
              <Text style={{paddingLeft: 10}}>4 Thành viên</Text>
            </View>
            <View style={styles.row}>
              <Icon icon="clock" size={12} color="black" />
              <Text style={{paddingLeft: 10}}>25/03/2024</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Icon icon="candidate" size={30} />
            <Text style={{paddingLeft: 10}}>Nguời tạo: Dương Đức Thanh</Text>
          </View>
          <View style={styles.line} />
          <View>
            <TouchableOpacity
              style={styles.buttonContain}
              onPress={() => {
                navigation.navigate("MembersRoute");
              }}
            >
              <Text style={styles.textContent}>Danh sách thành viên</Text>
              <View style={styles.row}>
                <Icon icon="Menu" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Phả hệ</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.buttonContain}>
              <Text style={styles.textContent}>Sắp xếp phả đồ</Text>
              <View style={styles.row}>
                <Icon
                  icon="Scale"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.textContent}>Thiết kế phả đồ</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Dòng thời gian</Text>
              <View style={styles.row}>
                <Icon icon="note" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Bảng tin</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Ngày gia đình</Text>
              <View style={styles.row}>
                <Icon icon="day" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Sự kiện</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Ảnh gia đình</Text>
              <View style={styles.row}>
                <Icon
                  icon="Image"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.textContent}>Album</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Quản lí tài khoản</Text>
              <View style={styles.row}>
                <Icon icon="User" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Tài khoản</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{fontSize: 16, fontWeight: "bold"}}>
            Gia đình Thanh Dương
          </Text>
          <View style={styles.rowContent}>
            <View style={styles.row}>
              <Icon icon="Teacher_2" size={12} color="black" />
              <Text style={{paddingLeft: 10}}>2 Đời</Text>
            </View>
            <View style={styles.row}>
              <Icon icon="Teacher_2" size={12} color="black" />
              <Text style={{paddingLeft: 10}}>4 Thành viên</Text>
            </View>
            <View style={styles.row}>
              <Icon icon="clock" size={12} color="black" />
              <Text style={{paddingLeft: 10}}>25/03/2024</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Icon icon="candidate" size={30} />
            <Text style={{paddingLeft: 10}}>Nguời tạo: Dương Đức Thanh</Text>
          </View>
          <View style={styles.line} />
          <TouchableOpacity style={styles.buttonContain}>
            <Text style={styles.textContent}>Danh sách thành viên</Text>
            <View style={styles.row}>
              <Icon icon="Menu" size={20} color="white" style={styles.icon} />
              <Text style={styles.textContent}>Phả hệ</Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.buttonContain}>
              <Text style={styles.textContent}>Sắp xếp phả đồ</Text>
              <View style={styles.row}>
                <Icon
                  icon="Scale"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.textContent}>Thiết kế phả đồ</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Dòng thời gian</Text>
              <View style={styles.row}>
                <Icon icon="note" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Bảng tin</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Ngày gia đình</Text>
              <View style={styles.row}>
                <Icon icon="day" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Sự kiện</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Ảnh gia đình</Text>
              <View style={styles.row}>
                <Icon
                  icon="Image"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.textContent}>Album</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContain,
                {
                  width: "48%",
                },
              ]}
            >
              <Text style={styles.textContent}>Quản lí tài khoản</Text>
              <View style={styles.row}>
                <Icon icon="User" size={20} color="white" style={styles.icon} />
                <Text style={styles.textContent}>Tài khoản</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F1D6",
  },
  header: {
    backgroundColor: "#D2672A",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomRightRadius: 10,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#D88249",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  textHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    marginVertical: 10,
    borderColor: config.COLOR_CONFIG.NEUTRALS_10,
  },
  buttonContain: {
    width: "auto",
    backgroundColor: "#C15213",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 5,
  },
  textContent: {
    color: "white",
  },
  icon: {
    marginRight: 10,
  },
});

export default FamiyTree;
