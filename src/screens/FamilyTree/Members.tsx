import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { ReactElement, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import ApiFamilyTree from "src/api/FamilyTree/ApiFamilyTree";
import ModalGlobal from "src/components/ModalGlobal";
import Header from "src/components/headers/Header";
import { AppRootParamList } from "src/routes/RouteList";
import Icon from "src/utils/Icon";
import { getDeviceHeight, getScreenWidth } from "src/utils/layout/layout";
import { showSuccess } from "src/utils/notification";

function Members(): ReactElement {
  const route = useRoute<RouteProp<AppRootParamList, "MembersRoute">>();
  const { idTree } = route.params
  const navigation = useNavigation()
  const [gen, setGen] = useState(1);
  const [idSelect, setIdSelect] = useState(1);
  const memberByGenData = useQuery({
    queryKey: ['memberByGen'],
    queryFn: () => {
      return ApiFamilyTree.getMemeberbyGen(idTree, gen)
    },
    // keepPreviousData: true,
  })
  const maxGen = useQuery({
    queryKey: ['maxGen'],
    queryFn: () => {
      return ApiFamilyTree.getMaxGen(idTree)
    },
  }
  )
  useEffect(() => {
    memberByGenData.refetch()
  }, [gen])
  const emptyArray = Array.from(Array(maxGen.data?.data));

  const calculateAge = (birthday: string) => {
    if (birthday !== null) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return ""
  }

  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const addSonMutation = useMutation({
    mutationFn: (data: any) => ApiFamilyTree.addSon(data),
    // onSuccess: (data) => {
    //     refetch()
    //     toast.success(data.data.message, {
    //         position: 'top-center',
    //         autoClose: 1000
    //     })
    // }
  })

  const addMateMutation = useMutation({
    mutationFn: (data: any) => ApiFamilyTree.addMate(data)
  })

  const handleAddSon = () => {
    const body = {
      fullName: "",
      dealDate: "",
      birthday: "",
      photoUrl: "",
      sex: 0
    }
    addSonMutation.mutate({ idMember: idSelect, body },
      {
        onSuccess: (response) => {
          memberByGenData.refetch(),
            maxGen.refetch(),
            toggleModal()
          showSuccess("Thành công")

        }
      })
  }

  const handleAddMate = () => {
    const body = {
      fullName: "",
      dealDate: "",
      birthday: "",
      photoUrl: "",
      sex: 0
    }
    addMateMutation.mutate({ idMember: idSelect, body },
      {
        onSuccess: (response) => {
          memberByGenData.refetch(),
            maxGen.refetch(),
            toggleModal()
          showSuccess("Thành công")
        }
      })
  }



  return (
    <View style={styles.root}>
      <Header title="Thành viên" />
      <View style={{ flexDirection: "row" }}>
        <View style={{
          width: getScreenWidth() / 6, backgroundColor: "white",
          alignItems: "center",
          height: getDeviceHeight(),
        }}>
          {emptyArray.map((item, index) => (
            <TouchableOpacity
              style={{
                backgroundColor: index + 1 === gen ? "orange" : "white",
                padding: 10
              }}
              onPress={() => {
                setGen(index + 1)
              }}
            >
              <View>
                <Text style={{ textAlign: "center" }}>Đời thứ {index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{
          backgroundColor: "#F2F1D3", height: getDeviceHeight(),
          width: getScreenWidth() * 5 / 6,
          padding: 5
        }}>
          {memberByGenData.data?.data.map((item, index) => (
            <View style={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingVertical: 5,
              marginVertical: 10
            }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MemberDetailRoute", {
                    id: item.mainMember.id,
                    data: item.mainMember
                  })
                }}
                style={{
                  flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                  paddingHorizontal: 10,
                  backgroundColor: "#D2672A"
                }}>
                <Image
                  source={{ uri: item.mainMember.photoURL }}
                  style={{
                    width: 50,
                    height: 50
                  }}
                  resizeMode="contain"
                />
                <View>
                  <Text>{item.mainMember.fullName}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>GT:{item.mainMember.sex === 0 ? "Nam" : "Nữ"}</Text>
                    <Text style={{ marginHorizontal: 20 }}>Đời:{item.mainMember.generation}</Text>
                    <Text>Tuổi: {item && item.mainMember && item.mainMember.birthday ? calculateAge(item.mainMember.birthday) : ''}</Text>

                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true)
                    setIdSelect(item.mainMember.id)
                  }}
                >
                  <Icon icon="Add" size={30} color="orange" />
                </TouchableOpacity>
              </TouchableOpacity>

              {item && item.mateMember && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MemberDetailRoute", {
                      id: item.mateMember.id,
                      data: item.mateMember
                    })
                  }}
                  style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5
                  }}>
                  <Image
                    source={{ uri: item.mateMember.photoURL }}
                    style={{
                      width: 50,
                      height: 50
                    }}
                    resizeMode="contain"
                  />

                  <View>
                    <Text>{item.mateMember.fullName}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text>GT:{item.mateMember.sex === 0 ? "Nam" : "Nữ"}</Text>
                      <Text style={{ marginHorizontal: 20 }}>Đời:{item.mateMember.generation}</Text>
                      <Text>Tuổi:{item.mateMember.birthday !== null ? calculateAge(item.mateMember.birthday) : ""}</Text>

                    </View>
                  </View>
                  <TouchableOpacity>
                    <Icon icon="Add" size={30} color="orange" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}

              {item && item.soons && (
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  {item.soons.map((dataSon) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("MemberDetailRoute", {
                          id: dataSon.id,
                          data: dataSon
                        })
                      }}
                      style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 5
                      }}>
                      <Image
                        source={{ uri: dataSon.photoURL }}
                        style={{
                          width: 50,
                          height: 50
                        }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text>{dataSon.fullName}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Text>GT:{dataSon.sex === 0 ? "Nam" : "Nữ"}</Text>
                          <Text style={{ marginHorizontal: 20 }}>Đời:{dataSon.generation}</Text>
                          <Text>Tuổi:{dataSon.birthday !== null ? calculateAge(dataSon.birthday) : ""}</Text>

                        </View>
                      </View>
                      <TouchableOpacity>
                        <Icon icon="Add" size={30} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              )}


            </View>
          ))}
        </View>
      </View>
      <ModalGlobal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        handleAddSon={handleAddSon}
        handleAddMate={handleAddMate}
      />
    </View>
  );
}

export default Members;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
