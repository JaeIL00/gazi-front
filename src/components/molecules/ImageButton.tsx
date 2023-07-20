import React from 'react';

import TouchButton from '../atoms/TouchButton';
import { ImageButtonProps } from '../../types/molecules/types';
import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';
import { imageButtonStyles } from '../../styles/molecules/styles';

const ImageButton = ({
    onPress,
    width,
    height,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    borderColor,
    borderWidth,
    borderRadius,
    flex,
    alignSelf,
    isCaching,
    imageWidth,
    imageHeight,
    imageBorderRadius,
    imageSource,
}: ImageButtonProps) => {
    return (
        <TouchButton
            onPress={onPress}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            flex={flex}
            alignSelf={alignSelf}>
            <>
                {isCaching ? (
                    <FastImage
                        source={imageSource}
                        style={imageButtonStyles(imageWidth, imageHeight, imageBorderRadius).image}
                    />
                ) : (
                    <Image
                        source={imageSource}
                        style={imageButtonStyles(imageWidth, imageHeight, imageBorderRadius).image}
                    />
                )}
            </>
        </TouchButton>
    );
};

export default ImageButton;
