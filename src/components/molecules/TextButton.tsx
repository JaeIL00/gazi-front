import React from 'react';

import TouchButton from '../atoms/TouchButton';
import SemiBoldText from '../atoms/SemiBoldText';
import { TextButtonProps } from '../../types/molecules/types';
import MediumText from '../atoms/MediumText';
import BoldText from '../atoms/BoldText';

const TextButton = ({
    onPress,
    text,
    width,
    height,
    backgroundColor,
    fontSize,
    fontColor,
    fontWeight,
    paddingHorizontal,
    paddingVertical,
    borderColor,
    borderWidth,
    borderRadius,
    flex,
    alignSelf,
    alignItems,
}: TextButtonProps) => {
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
            alignSelf={alignSelf}
            alignItems={alignItems}>
            <>
                {fontWeight === 'bold' && <BoldText color={fontColor} size={fontSize} text={text} />}
                {fontWeight === 'semiBold' && <SemiBoldText color={fontColor} size={fontSize} text={text} />}
                {fontWeight === 'medium' && <MediumText color={fontColor} size={fontSize} text={text} />}
                {fontWeight === 'normal' && <MediumText color={fontColor} size={fontSize} text={text} />}
            </>
        </TouchButton>
    );
};

export default TextButton;
