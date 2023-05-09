import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

import TouchButton from '../../smallest/TouchButton';
import { writePhotoStyles } from '../../../styles/styles';
import { WritePhotoProps, uploadImageTypes } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const WritePhoto = ({ getImageHandler, notAllowPermission }: WritePhotoProps) => {
    // Check image library permission
    const checkLocationPermission = async (): Promise<boolean> => {
        try {
            const imagePermmission = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            const isAllow = imagePermmission === RESULTS.GRANTED;
            return isAllow;
        } catch (error) {
            // For Debug
            console.log('(ERROR) Check image library permission');
            return false;
        }
    };

    // Get image in library
    const [imageResponse, setImageResponse] = useState<uploadImageTypes>([
        {
            fileName: '',
            fileSize: null,
            height: null,
            type: '',
            uri: '',
            width: null,
        },
    ]);
    const getImageLibrary = async () => {
        const isAllow = await checkLocationPermission();
        if (isAllow) {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    selectionLimit: 10,
                },
                response => {
                    if (response.assets) {
                        formDataMachine(response.assets);
                        setImageResponse(response.assets);
                    }
                },
            );
        } else {
            notAllowPermission();
        }
    };
    const formDataMachine = (assets: Asset[]) => {
        const formData = new FormData();
        for (const index in assets) {
            const dataAsset = {
                uri: assets[index].uri,
                type: 'multipart/form-data',
                name: `${assets[index].fileName}.jpg`,
            };
            formData.append(`imageFile${index}`, dataAsset);
        }
        getImageHandler(formData.getParts());
    };

    return (
        <View style={writePhotoStyles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchButton
                    onPress={getImageLibrary}
                    width={71}
                    height={(71 / screenHeight) * screenWidth}
                    borderRadius={10.9 * screenFont}
                    borderColor="#E3E3E3"
                    borderWidth={1 * screenFont}>
                    <Image source={require('../../../assets/icons/camera.png')} style={writePhotoStyles.cameraIcon} />
                </TouchButton>

                {Array.from({ length: 10 }).map((item, index) => (
                    <View style={writePhotoStyles.previewBox}>
                        {imageResponse.length > index && (
                            <Image
                                key={index}
                                source={{
                                    uri: imageResponse[index].uri,
                                }}
                                style={writePhotoStyles.imageSize}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
export default WritePhoto;
