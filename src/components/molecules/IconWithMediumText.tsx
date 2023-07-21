import React from 'react';

import Icons from '../atoms/Icons';
import Spacer from '../atoms/Spacer';
import MediumText from '../atoms/MediumText';
import { IconWithMediumTextProps } from '../../types/molecules/types';

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
