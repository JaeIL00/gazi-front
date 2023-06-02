import React from 'react';
import { Image, View } from 'react-native';

import Colors from '../../../styles/Colors';
import TextButton from '../../molecules/TextButton';
import { CompletedJoinTemplateProps } from '../../../types/types';
import { completedJoinTemplateStyles } from '../../../styles/styles';

const CompletedJoinTemplate = ({ onPressNextStep }: CompletedJoinTemplateProps) => {
    return (
        <View style={completedJoinTemplateStyles.container}>
            <View style={completedJoinTemplateStyles.imageBox}>
                <Image
                    source={require('../../../assets/join-member-complete-image.png')}
                    style={completedJoinTemplateStyles.imageSize}
                />
            </View>
            <View style={completedJoinTemplateStyles.button}>
                <TextButton
                    onPress={onPressNextStep}
                    text="확인"
                    height={48}
                    backgroundColor={Colors.BLACK}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};
export default CompletedJoinTemplate;
