import React, { RefObject, useLayoutEffect, useRef, useState } from 'react';
import { Platform, ScrollView, View, useWindowDimensions } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import FastImage from 'react-native-fast-image';

import colors from '../../../common/constants/colors';
import Icons from '../../atoms/Icons';
import Spacer from '../../atoms/Spacer';
import NormalText from '../../atoms/NormalText';
import MediumText from '../../atoms/MediumText';
import TouchButton from '../../atoms/TouchButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import ScreenWrapper from '../../organisms/common/ScreenWrapper';
import { imageViewScreenStyles } from '../../../styles/common/styles';
import { useRootNavigation, useRootRoute } from '../../../navigations/RootStackNavigation';
import IconButton from '../../molecules/IconButton';

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
                        <IconButton
                            onPress={() => rootNavigation.goBack()}
                            width={36}
                            height={36}
                            backgroundColor="#171717CC"
                            borderRadius={36}
                            iconType="ionicons"
                            iconName="close"
                            iconSize={24}
                            iconColor={colors.WHITE}
                        />
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
                        <SemiBoldText text={viewData.postTitle} size={20} color={colors.WHITE} />
                        <Spacer height={4} />
                        <MediumText text={viewData.nickName} size={14} color={colors.TXT_GRAY} />
                    </View>

                    <View style={imageViewScreenStyles.bottomInfoBox}>
                        <View style={imageViewScreenStyles.iconBox}>
                            <FastImage
                                source={require('../../../assets/icons/location-pin-outline-gray.png')}
                                style={imageViewScreenStyles.iconSize}
                            />
                            <Spacer width={2.76} />
                            <NormalText text={viewData.distance} size={13} color={colors.TXT_GRAY} />
                        </View>
                        <View style={imageViewScreenStyles.iconBox}>
                            <FastImage
                                source={require('../../../assets/icons/clock.png')}
                                style={imageViewScreenStyles.iconSize}
                            />
                            <Spacer width={2.76} />
                            <NormalText text={viewData.time} size={13} color={colors.TXT_GRAY} />
                        </View>
                        <View style={imageViewScreenStyles.iconBox}>
                            <FastImage
                                source={require('../../../assets/icons/message-square.png')}
                                style={imageViewScreenStyles.iconSize}
                            />
                            <Spacer width={2.76} />
                            <NormalText text={`${viewData.postCount}posts`} size={13} color={colors.TXT_GRAY} />
                        </View>
                    </View>
                </View>
            </>
        </ScreenWrapper>
    );
};

export default ImageViewScreen;
