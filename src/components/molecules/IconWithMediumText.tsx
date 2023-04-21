import React from 'react';
import Icons from '../smallest/Icons';
import MediumText from '../smallest/MediumText';
import Spacer from '../smallest/Spacer';
import { IconWithMediumTextProps } from '../../types/types';

const IconWithMediumText = ({ type, name, iconColor, text, textColor }: IconWithMediumTextProps) => {
    return (
        <>
            <Icons type={type} name={name} size={14} color={iconColor} />
            <Spacer width={4} />
            <MediumText text={text} size={12} color={textColor} />
        </>
    );
};

export default IconWithMediumText;
