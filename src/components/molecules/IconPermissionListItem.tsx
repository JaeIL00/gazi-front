import React from 'react';
import { Image, View } from 'react-native';

import Icons from '../atoms/Icons';
import colors from '../../common/constants/colors';
import NormalText from '../atoms/NormalText';
import MediumText from '../atoms/MediumText';
import { IconPermissionListItemProps } from '../../types/molecules/types';
import { iconPermissionListItemStyles } from '../../styles/molecules/styles';

const IconPermissionListItem = ({ iconType, iconName, title, explain, image }: IconPermissionListItemProps) => {
    return (
        <View style={iconPermissionListItemStyles.itemBox}>
            <View style={iconPermissionListItemStyles.iconBox}>
                {image && (
                    <Image
                        source={
                            image === 'bell-outline'
                                ? require('../../assets/icons/bell-outline.png')
                                : require('../../assets/icons/gallery.png')
                        }
                        style={iconPermissionListItemStyles.imageSize}
                    />
                )}
                {iconType && iconName && <Icons type={iconType} name={iconName} size={25} color={colors.BLACK} />}
            </View>
            <View style={iconPermissionListItemStyles.textBox}>
                <MediumText text={title} size={16} color={colors.BLACK} />
                <NormalText text={explain} size={12} color={colors.TXT_GRAY} />
            </View>
        </View>
    );
};

export default IconPermissionListItem;
