### Đường dẫn thư mục
    - ưu tiên sử dụng Path Aliases (@src/..) - đã config
    - Hạn chế sử dụng: "../../../component" nếu thư mục không cùng 1 folder

### Tạo component mới
    - Nếu là component dùng chung cả dự án (vd: Button, Input, ...) thì tạo trong thư mục "components"
    - Nếu không dùng chung thì tạo trong thư mục "components" trong thư mục "screen" của màn hình tương ứng
    - Style đặt trong "styles" với các đường dẫn tương tự như dẫn đến component
    - Ví dụ:
        | components
        |   | ButtonGlobal
        |       | index.tsx
        |
        | screen
        |   | Study
        |       | index.tsx
        |       | components
        |           | CourseList
        |               | index.tsx
        |               | CourseItem.tsx
        |
        | styles
        |   | components
        |   |   | ButtonGlobal.tsx
        |   |
        |   | screen
        |       | Study
        |           | index.tsx
        |           | components
        |                       | CourseList
        |                           | index.tsx
        |                           | CourseItem.tsx

### Config
    - Đặt trong "src/config"
    - Config quan trọng: "LAYOUT_CONFIG" để đồng bộ bố cục các màn

### Update thư viện mới
1. https://github.com/mfrachet/rn-placeholder
2. https://github.com/shopify/flash-list
3. https://github.com/mrousavy/react-native-mmkv

### Lưu và lấy dữ liệu cứng vào bộ nhớ máy
    - Dùng thư viện: react-native-mmkv
    - Lưu:
        import {storage} from "src/storage";
        ...
        storage.set("name", "SonPh");
    - Lấy: 
        import {storage} from "src/storage";
        ...
        const username = storage.getString("name");

### Ví dụ các code khi tạo component mới (copy cho nhanh)
1. Component

    import React from 'react';
    import {View} from 'react-native';

    function Login() {

    return (
        <View style={styles.root}>

        </View>
    ); }

2. Style

    import CONFIG from 'src/config';
    import {StyleSheet} from 'react-native';

    const styles = StyleSheet.create({
        root: {
            paddingHorizontal: CONFIG.LAYOUT_CONFIG.PADDING_HORIZONTAL,
        },
    });

    export default styles;
