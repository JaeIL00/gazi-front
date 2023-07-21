import React from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import TextButton from '../../molecules/TextButton';
import colors from '../../../constants/colors';
import { howGetPhotoSelectModalStyles } from '../../../styles/organisms/styles';
import { HowGetPhotoSelectModalProps } from '../../../types/organisms/types';

const HowGetPhotoSelectModal = ({ getImageHandler, closePhotoSelectModalHandler }: HowGetPhotoSelectModalProps) => {
    const cameraPhotoHandler = () => {
        ImagePicker.openCamera({
            cropping: true,
            mediaType: 'photo',
        }).then(image => {
            getImageHandler([
                {
                    uri: image.path,
                    fileName: image.modificationDate + '',
                    type: image.mime,
                },
            ]);
            closePhotoSelectModalHandler();
        });
    };

    const galleryHandler = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        }).then(images => {
            const freshImages = images.map(image => {
                return {
                    uri: image.path,
                    fileName: image.modificationDate + '',
                    type: image.mime,
                };
            });
            getImageHandler(freshImages);
            closePhotoSelectModalHandler();
        });
    };

    return (
        <View style={howGetPhotoSelectModalStyles.container}>
            <TextButton
                onPress={cameraPhotoHandler}
                text="카메라"
                fontColor={colors.BLACK}
                fontSize={16}
                fontWeight="semiBold"
                borderWidth={1}
                paddingHorizontal={16}
                height={60}
                borderRadius={5}
                borderColor={colors.BTN_GRAY}
            />
            <TextButton
                onPress={galleryHandler}
                text="파일"
                fontColor={colors.BLACK}
                fontSize={16}
                fontWeight="semiBold"
                borderWidth={1}
                paddingHorizontal={16}
                height={60}
                borderRadius={5}
                borderColor={colors.BTN_GRAY}
            />
        </View>
    );
};

export default HowGetPhotoSelectModal;
