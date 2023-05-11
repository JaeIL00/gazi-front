import React from 'react';
import { Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import Icons from '../../smallest/Icons';
import Colors from '../../../styles/Colors';
import TouchButton from '../../smallest/TouchButton';
import { ThreadItemTemplateProps } from '../../../types/types';
import { threadItemTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const ThreadItemTemplate = ({ post, movetoCommunityScreen }: ThreadItemTemplateProps) => {
    return (
        <View>
            <View style={threadItemTemplateStyles.backButtonBox}>
                {Platform.OS === 'android' && (
                    <DropShadow style={threadItemTemplateStyles.backButtonShadow}>
                        <TouchButton
                            onPress={movetoCommunityScreen}
                            backgroundColor="#FFFFFF80"
                            width={36}
                            height={(36 / screenHeight) * screenWidth}
                            borderRadius={36}>
                            <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={22} />
                        </TouchButton>
                    </DropShadow>
                )}
            </View>

            <View style={threadItemTemplateStyles.mapCrop}></View>
        </View>
    );
};

export default ThreadItemTemplate;
