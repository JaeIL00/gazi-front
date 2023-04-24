import React from 'react';
import { Image, View } from 'react-native';

import Icons from '../smallest/Icons';
import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import MediumText from '../smallest/MediumText';
import { IconPermissionListItemProps } from '../../types/types';
import { iconPermissionListItemStyles } from '../../styles/styles';

const IconPermissionListItem = ({ iconType, iconName, title, explain, image }: IconPermissionListItemProps) => {
    return (
        <View style={iconPermissionListItemStyles.itemBox}>
            <View style={iconPermissionListItemStyles.iconBox}>
                {image && (
                    <Image
                        source={
                            image === 'bell'
                                ? require('../../assets/icons/bell.png')
                                : require('../../assets/icons/gallery.png')
                        }
                        style={iconPermissionListItemStyles.imageSize}
                    />
                )}
                {iconType && iconName && <Icons type={iconType} name={iconName} size={25} color={Colors.BLACK} />}
            </View>
            <View style={iconPermissionListItemStyles.textBox}>
                <MediumText text={title} size={16} color={Colors.BLACK} />
                <NormalText text={explain} size={12} color={Colors.TXT_GRAY} />
            </View>
        </View>
    );
};

export default IconPermissionListItem;
