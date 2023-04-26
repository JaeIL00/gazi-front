import React from 'react';
import { View } from 'react-native';

import Colors from '../../../styles/Colors';
import TextButton from '../../molecules/TextButton';
import { CompletedJoinTemplateProps } from '../../../types/types';
import { completedJoinTemplateStyles } from '../../../styles/styles';

const CompletedJoinTemplate = ({ onPressNextStep }: CompletedJoinTemplateProps) => {
    return (
        <View style={completedJoinTemplateStyles.container}>
            <View style={{ height: 300, backgroundColor: '#333' }}></View>
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
