import React, { RefObject, useLayoutEffect, useRef, useState } from 'react';
import { Platform, ScrollView, View, useWindowDimensions } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import FastImage from 'react-native-fast-image';

import Colors from '../../styles/Colors';
import Icons from '../../components/smallest/Icons';
import Spacer from '../../components/smallest/Spacer';
import NormalText from '../../components/smallest/NormalText';
import MediumText from '../../components/smallest/MediumText';
import TouchButton from '../../components/smallest/TouchButton';
import SemiBoldText from '../../components/smallest/SemiBoldText';
import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import { imageViewScreenStyles } from '../../styles/styles';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const ImageViewScreen = () => {
    const rootNavigation = useRootNavigation();
    const route = useRootRoute<'ImageView'>();
    const viewData = route.params;

    // Image size
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    // Image view start index
    const imageRef = useRef() as RefObject<ScrollView>;
    const [rerender, setRerender] = useState(0);

    useLayoutEffect(() => {
        if (imageRef.current) {
            imageRef.current.scrollTo({ x: windowWidth * viewData.imageIndex, animated: false });
            setRerender(1);
        }
    }, [imageRef]);

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <>
                {Platform.OS === 'android' && (
                    <DropShadow style={imageViewScreenStyles.backButtonShadow}>
                        <View style={imageViewScreenStyles.backButtonBox}>
                            <TouchButton onPress={() => rootNavigation.goBack()}>
                                <Icons type="ionicons" name="close" size={24} color={Colors.WHITE} />
                            </TouchButton>
                        </View>
                    </DropShadow>
                )}

                <ScrollView
                    ref={imageRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}>
                    {viewData.fileList.map(item => (
                        <FastImage
                            key={item.fileName}
                            source={{ uri: item.fileUrl }}
                            style={{ width: windowWidth, height: windowHeight }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    ))}
                </ScrollView>

                <View style={imageViewScreenStyles.bottomTitleBox}>
                    <View>
                        <SemiBoldText text={viewData.postTitle} size={20} color={Colors.WHITE} />
                        <Spacer height={4} />
                        <MediumText text={viewData.nickName} size={14} color={Colors.TXT_GRAY} />
                    </View>

                    <View style={imageViewScreenStyles.bottomInfoBox}>
                        <View style={imageViewScreenStyles.iconBox}>
                            <FastImage
                                source={require('../../assets/icons/location-pin-outline-gray.png')}
                                style={imageViewScreenStyles.iconSize}
                            />
                            <Spacer width={2.76} />
                            <NormalText text={viewData.distance} size={13} color={Colors.TXT_GRAY} />
                        </View>
                        <View style={imageViewScreenStyles.iconBox}>
                            <FastImage
                                source={require('../../assets/icons/clock.png')}
                                style={imageViewScreenStyles.iconSize}
                            />
                            <Spacer width={2.76} />
                            <NormalText text={viewData.time} size={13} color={Colors.TXT_GRAY} />
                        </View>
                        <View style={imageViewScreenStyles.iconBox}>
                            <FastImage
                                source={require('../../assets/icons/message-square.png')}
                                style={imageViewScreenStyles.iconSize}
                            />
                            <Spacer width={2.76} />
                            <NormalText text={`${viewData.postCount}posts`} size={13} color={Colors.TXT_GRAY} />
                        </View>
                    </View>
                </View>
            </>
        </ScreenWrapper>
    );
};

export default ImageViewScreen;
