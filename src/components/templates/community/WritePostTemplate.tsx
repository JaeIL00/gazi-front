import React from 'react';
import { ScrollView, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { WritePostTemplateProps } from '../../../types/types';
import { writePostTemplateStyles } from '../../../styles/styles';
import { screenWidth } from '../../../utils/changeStyleSize';
import SearchLocation from '../../organisms/SearchLocation';

const WritePostTemplate = ({ moveToScreen }: WritePostTemplateProps) => {
    return (
        <View style={writePostTemplateStyles.container}>
            <View style={writePostTemplateStyles.headerBox}>
                <View style={writePostTemplateStyles.headerNavigateBox}>
                    <TouchButton onPress={() => moveToScreen('BACK')}>
                        <Icons type="ionicons" name="close-sharp" size={20} color={Colors.BLACK} />
                    </TouchButton>
                    <TouchButton onPress={() => moveToScreen('GO')}>
                        <SemiBoldText text="다음" size={16} color={Colors.TXT_GRAY} />
                    </TouchButton>
                </View>

                <View style={writePostTemplateStyles.settingBox}>
                    <TouchButton onPress={() => {}}>
                        <View style={writePostTemplateStyles.settingButton}>
                            <MediumText text="위치설정" size={13} color={Colors.BLACK} />
                            <Spacer width={4} />
                            <Icons type="entypo" name="triangle-down" size={14} color={Colors.BLACK} />
                        </View>
                    </TouchButton>
                    <Spacer width={13} />
                    <TouchButton onPress={() => {}}>
                        <View style={writePostTemplateStyles.settingBox}>
                            <MediumText text="키워드설정" size={13} color={Colors.BLACK} />
                            <Spacer width={4} />
                            <Icons type="entypo" name="triangle-down" size={14} color={Colors.BLACK} />
                        </View>
                    </TouchButton>
                </View>
            </View>

            {true && (
                <View style={writePostTemplateStyles.searchContainer}>
                    <SearchLocation />
                </View>
            )}
        </View>
    );
};

export default WritePostTemplate;
