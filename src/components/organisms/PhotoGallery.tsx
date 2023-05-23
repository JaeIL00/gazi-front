import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { AssetType, CameraRoll, GroupTypes, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import FastImage from 'react-native-fast-image';
import { launchCamera } from 'react-native-image-picker';

import Icons from '../smallest/Icons';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import MediumText from '../smallest/MediumText';
import TouchButton from '../smallest/TouchButton';
import { GalleryAlbumListTypes, PhotoGalleryProps, uploadImageFileTypes } from '../../types/types';
import { photoGalleryStyles } from '../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';
import SemiBoldText from '../smallest/SemiBoldText';

const PhotoGallery = ({ closeGalleryHandling, getImageHandler }: PhotoGalleryProps) => {
    const [checkIndex, setCheckIndex] = useState<number[]>([]);
    const [galleryCursor, setGalleryCursor] = useState<string>();
    const [currentAlbum, setCurrentAlbum] = useState<string>('최근 항목');
    const [albumListWindow, setAlbumListWindow] = useState<boolean>(false);
    const [albumList, setAlbumList] = useState<GalleryAlbumListTypes[]>([]);
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

    // Get gallery album
    const getGalleryAlbum = async () => {
        try {
            let allCount: number = 0;
            let freshAlbumList: GalleryAlbumListTypes[] = [];
            const albumList = await CameraRoll.getAlbums({
                assetType: 'Photos',
            });
            const { edges } = await CameraRoll.getPhotos({
                first: 1,
                assetType: 'Photos',
                groupTypes: 'Album',
            });
            albumList.forEach(item => (allCount += item.count));
            freshAlbumList = [
                ...freshAlbumList,
                {
                    title: '최근 항목',
                    count: allCount,
                    thumbnail: edges[0].node.image.uri,
                },
            ];

            for (const index in albumList) {
                const { edges } = await CameraRoll.getPhotos({
                    first: 1,
                    assetType: 'Photos',
                    groupTypes: 'Album',
                    groupName: albumList[index].title,
                });
                freshAlbumList = [
                    ...freshAlbumList,
                    {
                        title: albumList[index].title,
                        count: albumList[index].count,
                        thumbnail: edges[0].node.image.uri,
                    },
                ];
            }
            setAlbumList(freshAlbumList);
        } catch (error) {
            // For Debug
            console.log('(ERROR) Get album in gallery', error);
        }
    };
    // Get gallery photo
    const getGalleryPhotos = async (title: string) => {
        let options: {
            first: number;
            assetType: AssetType;
            after: string | undefined;
            groupTypes: GroupTypes;
            groupName?: string;
        } = {
            first: 50,
            assetType: 'Photos',
            after: galleryCursor,
            groupTypes: 'Album',
        };
        try {
            if (title !== '최근 항목') {
                options = {
                    first: 50,
                    assetType: 'Photos',
                    after: galleryCursor,
                    groupTypes: 'Album',
                    groupName: title,
                };
            }
            const { edges, page_info } = await CameraRoll.getPhotos(options);
            if (page_info.has_next_page === false) {
                setGalleryCursor('');
                setGalleryList([]);
            } else {
                setGalleryCursor(page_info.end_cursor);
            }
            setGalleryList(prev => [...prev, ...edges]);
        } catch (error) {
            // For Debug
            console.log('(ERROR) Get photo in gallery', error);
        }
    };

    // Camera button
    const onPressListBox = async (pressedItem: PhotoIdentifier, index: number) => {
        const fileName = pressedItem.node.image.uri.split('/').pop() as string;
        const prevCheck = checkIndex.find(chIndex => chIndex === index);
        if (index === 0) {
            // Needs check camera permission
            await launchCamera({
                mediaType: 'photo',
            });
            return;
        }
        if (prevCheck) {
            setCheckIndex(checkIndex.filter(chIndex => chIndex !== index));
            getImageHandler(
                {
                    uri: pressedItem.node.image.uri,
                    fileName,
                    type: pressedItem.node.type,
                },
                'DEL',
            );
        } else {
            if (checkIndex.length <= 9) {
                setCheckIndex([...checkIndex, index]);
                getImageHandler(
                    {
                        uri: pressedItem.node.image.uri,
                        fileName,
                        type: pressedItem.node.type,
                    },
                    'ADD',
                );
            }
        }
    };

    const onPressChangeAlbum = async (title: string) => {
        setCurrentAlbum(title);
        setAlbumListWindow(false);
        getGalleryPhotos(title);
    };

    // Gallery flat list
    const renderItem = useCallback(
        ({ item, index }: { item: PhotoIdentifier; index: number }) => {
            checkIndex.indexOf(index);
            return (
                <View
                    key={item.node.timestamp}
                    style={[
                        photoGalleryStyles.imageContainer,
                        {
                            marginRight: (index + 1) % 3 === 0 ? undefined : 3 * screenHeight,
                            backgroundColor: index === 0 ? '#E8E8E8' : '#D9D9D9',
                        },
                    ]}>
                    <TouchButton onPress={() => onPressListBox(item, index)} height="100%">
                        {index === 0 ? (
                            <FastImage
                                source={require('../../assets/icons/camera-fill.png')}
                                style={photoGalleryStyles.cameraIcon}
                            />
                        ) : (
                            <View style={photoGalleryStyles.imageBox}>
                                <FastImage source={{ uri: item.node.image.uri }} style={photoGalleryStyles.imageSize} />
                                <View
                                    style={[
                                        photoGalleryStyles.imageBlurBox,
                                        {
                                            backgroundColor:
                                                checkIndex.indexOf(index) !== -1 ? '#FFFFFF59' : 'transparent',
                                        },
                                    ]}
                                />
                                <View
                                    style={[
                                        photoGalleryStyles.imageCheckBox,
                                        {
                                            backgroundColor:
                                                checkIndex.indexOf(index) !== -1 ? Colors.VIOLET : '#D9D9D94D',
                                            borderWidth:
                                                checkIndex.indexOf(index) !== -1 ? undefined : 1.5 * screenFont,
                                        },
                                    ]}>
                                    {checkIndex.indexOf(index) !== -1 && (
                                        <Icons type="octicons" name="check" size={16} color={Colors.WHITE} />
                                    )}
                                </View>
                            </View>
                        )}
                    </TouchButton>
                </View>
            );
        },
        [checkIndex],
    );
    const ItemSeparatorComponent = useCallback(() => <Spacer height={3} />, []);

    // Initialized photo list
    useLayoutEffect(() => {
        getGalleryPhotos('최근 항목');
        getGalleryAlbum();
    }, []);

    return (
        <View style={photoGalleryStyles.container}>
            <View
                style={[
                    photoGalleryStyles.headerBox,
                    {
                        borderColor: '#EBEBEB',
                        borderBottomWidth: albumListWindow ? 1 * screenFont : undefined,
                    },
                ]}>
                <TouchButton onPress={closeGalleryHandling}>
                    <Icons type="ionicons" name="close" size={24} color={Colors.BLACK} />
                </TouchButton>
                <TouchButton onPress={() => setAlbumListWindow(!albumListWindow)}>
                    <View style={photoGalleryStyles.albumButtonBox}>
                        <MediumText text={currentAlbum} size={18} color="#000000" />
                        <Spacer width={5} />
                        <FastImage
                            source={require('../../assets/icons/triangle-down.png')}
                            style={[
                                photoGalleryStyles.albumButtonIcon,
                                {
                                    transform: albumListWindow ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }],
                                    marginTop: 3 * screenHeight,
                                },
                            ]}
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
                onEndReachedThreshold={0.7}
                onEndReached={() => {
                    getGalleryPhotos(currentAlbum);
                }}
            />
            {albumListWindow && (
                <View style={{ position: 'relative' }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ backgroundColor: Colors.WHITE }}
                        contentContainerStyle={{ paddingBottom: 80 * screenHeight }}>
                        {albumList.map(item => (
                            <TouchableOpacity
                                key={item.title}
                                onPress={() => onPressChangeAlbum(item.title)}
                                activeOpacity={1}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10 * screenHeight,
                                    paddingLeft: 16 * screenWidth,
                                    borderBottomWidth: 1 * screenFont,
                                    borderColor: '#EBEBEB',
                                }}>
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={{ width: 60 * screenWidth, height: 60 * screenWidth }}
                                />
                                <View style={{ paddingLeft: 10 * screenWidth }}>
                                    <SemiBoldText text={item.title} size={16} color={Colors.BLACK} />
                                    <Spacer height={1} />
                                    <MediumText text={item.count + ''} size={11} color={Colors.TXT_GRAY} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default PhotoGallery;
