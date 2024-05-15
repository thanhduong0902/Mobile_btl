import { ReactElement, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useMutation, useQuery } from "react-query";
import ApiFamilyTree from "src/api/FamilyTree/ApiFamilyTree";
import { getScreenWidth } from "src/utils/layout/layout";
import ImagePicker from "react-native-image-crop-picker"
import { showSuccess } from "src/utils/notification";

interface IAlbumDetail {
    data: any
}

export default function AlbumDetail({ data }: IAlbumDetail): ReactElement {
    const [imageProfiles, setImageProfiles] = useState([]); // State để lưu trữ danh sách ảnh đã chọn

    const imageData = useQuery({
        queryKey: [`imageData${data.id}`],
        queryFn: () => ApiFamilyTree.getImageAlbum(data.id)
    })
    const addImageAlbumMutation = useMutation(
        {
            mutationFn: (data: any) => ApiFamilyTree.addImageAlbum(data)
        }
    )
    const handleAddImage = (selectedImage) => {

        addImageAlbumMutation.mutate({ idAlbum: data.id, body: selectedImage }, {
            onSuccess: (response) => {
                imageData.refetch()
                showSuccess("OK")
            }
        })
    }

    const chooseImages = (): void => {
        ImagePicker.openPicker({
            multiple: true, // Cho phép chọn nhiều ảnh
            width: 300,
            height: 400,
            cropping: true
        }).then(images => {
            // Lặp qua mỗi ảnh đã chọn và thêm vào mảng
            const selectedImages = images.map(image => ({
                url: image.path
            }));
            // Cập nhật state với mảng ảnh đã chọn
            handleAddImage(selectedImages)
        });
    };
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{
                width: getScreenWidth(),
                backgroundColor: "#D2672A",
                padding: 10
            }}>
                {data.name}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {imageData.data?.data.map((item, index) => (
                    <Image
                        source={{ uri: item.imageUrl }}
                        key={index}
                        style={{
                            width: 80,
                            height: 80,
                        }}
                        resizeMode="cover"
                    />
                ))}
                <TouchableOpacity
                    onPress={chooseImages}
                >
                    <Image
                        source={require("../../assets/image/defaulAdd.jpeg")}
                        style={{
                            width: 80,
                            height: 80,
                        }}
                        resizeMode="cover"

                    />
                </TouchableOpacity>

            </View>
        </View>
    )

}