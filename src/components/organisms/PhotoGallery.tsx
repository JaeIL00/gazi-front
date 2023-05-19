import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import FastImage from 'react-native-fast-image';
import { launchCamera } from 'react-native-image-picker';

import Icons from '../smallest/Icons';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import MediumText from '../smallest/MediumText';
import TouchButton from '../smallest/TouchButton';
import { photoGalleryStyles } from '../../styles/styles';
import { screenHeight } from '../../utils/changeStyleSize';
import { PhotoGalleryProps } from '../../types/types';

const PhotoGallery = ({ closeGalleryHandling }: PhotoGalleryProps) => {
    const [galleryCursor, setGalleryCursor] = useState<string>();
    const [galleryList, setGalleryList] = useState<PhotoIdentifier[]>([
        {
            node: {
                type: '',
                group_name: '',
                image: {
                    filename: '',
                    filepath: '',
                    extension: '',
                    uri: '',
                    height: 0,
                    width: 0,
                    fileSize: 0,
                    playableDuration: 0,
                    orientation: 0,
                },
                timestamp: 0,
                location: {},
            },
        },
    ]);

    // Get gallery photo
    const getGalleryPhotos = async () => {
        try {
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: 100,
                assetType: 'Photos',
                after: galleryCursor,
                groupTypes: 'Album',
                // groupName: 'KakaoTalk',
            });
            if (page_info.has_next_page === false) {
                setGalleryCursor('');
            } else {
                setGalleryCursor(page_info.end_cursor);
            }
            setGalleryList([...galleryList, ...edges]);
        } catch (error) {
            console.log('(ERROR) Get photo in gallery', error);
        }
    };

    // Camera button
    const onPressListBox = async (index: number) => {
        if (index === 0) {
            // Needs check camera permission
            await launchCamera({
                mediaType: 'photo',
            });
        } else {
        }
    };

    // Gallery flat list
    const renderItem = useCallback(({ item, index }: { item: PhotoIdentifier; index: number }) => {
        return (
            <View
                key={item.node.timestamp}
                style={[
                    photoGalleryStyles.imageBox,
                    {
                        marginRight: (index + 1) % 3 === 0 ? undefined : 3 * screenHeight,
                        backgroundColor: index === 0 ? '#E8E8E8' : '#D9D9D9',
                    },
                ]}>
                <TouchButton onPress={() => onPressListBox(index)} height="100%">
                    {index === 0 ? (
                        <FastImage
                            source={require('../../assets/icons/camera-fill.png')}
                            style={photoGalleryStyles.cameraIcon}
                        />
                    ) : (
                        <FastImage source={{ uri: item.node.image.uri }} style={photoGalleryStyles.imageSize} />
                    )}
                </TouchButton>
            </View>
        );
    }, []);
    const ItemSeparatorComponent = useCallback(() => <Spacer height={3} />, []);

    // Initialized photo list
    useLayoutEffect(() => {
        getGalleryPhotos();
    }, []);

    return (
        <View style={photoGalleryStyles.container}>
            <View style={photoGalleryStyles.headerBox}>
                <TouchButton onPress={closeGalleryHandling}>
                    <Icons type="ionicons" name="close" size={24} color={Colors.BLACK} />
                </TouchButton>
                <TouchButton onPress={() => {}}>
                    <View style={photoGalleryStyles.albumButtonBox}>
                        <MediumText text="최근 항목" size={18} color="#000000" />
                        <Spacer width={5} />
                        <FastImage
                            source={require('../../assets/icons/triangle-down.png')}
                            style={photoGalleryStyles.albumButtonIcon}
                        />
                    </View>
                </TouchButton>
                <Spacer width={24} />
            </View>

            <FlatList
                data={galleryList}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                numColumns={3}
                onEndReachedThreshold={4}
                onEndReached={() => {
                    getGalleryPhotos();
                }}
            />
        </View>
    );
};

export default PhotoGallery;
