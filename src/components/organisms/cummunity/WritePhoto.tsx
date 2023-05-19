import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

import TouchButton from '../../smallest/TouchButton';
import { writePhotoStyles } from '../../../styles/styles';
import { WritePhotoProps, UploadImageTypes } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import FastImage from 'react-native-fast-image';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import Colors from '../../../styles/Colors';
import Spacer from '../../smallest/Spacer';
import PhotoGallery from '../PhotoGallery';

const WritePhoto = ({ getImageHandler, notAllowPermission }: WritePhotoProps) => {
    const [isAllowPermission, setIsAllowPermission] = useState<boolean>(false);
    const [imageResponse, setImageResponse] = useState<UploadImageTypes>([
        {
            fileName: '',
            fileSize: null,
            height: null,
            type: '',
            uri: '',
            width: null,
        },
    ]);

    return (
        <>
            <View style={writePhotoStyles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* <TouchButton
                    onPress={getImageLibrary}
                    width={71}
                    height={(71 / screenHeight) * screenWidth}
                    borderRadius={10.9 * screenFont}
                    borderColor="#E3E3E3"
                    borderWidth={1 * screenFont}>
                    <Image source={require('../../../assets/icons/camera.png')} style={writePhotoStyles.cameraIcon} />
                </TouchButton> */}

                    {imageResponse[0].uri &&
                        Array.from({ length: 10 }).map((item, index) => (
                            <View key={index} style={writePhotoStyles.previewBox}>
                                {imageResponse[0].uri && imageResponse.length > index && (
                                    <Image
                                        key={index + 10}
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
        </>
    );
};
export default WritePhoto;
