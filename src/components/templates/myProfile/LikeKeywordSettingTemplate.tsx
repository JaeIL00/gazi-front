import React, { useState } from 'react';
import { Image, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import EditMyKeyword from '../../organisms/myProfile/EditMyKeyword';
import { LikeKeywordSettingTemplateProps } from '../../../types/types';
import { likeKeywordSettingTemplateStyles } from '../../../styles/styles';

const LikeKeywordSettingTemplate = ({ moveToBackScreenHandler }: LikeKeywordSettingTemplateProps) => {
    const [isEditWindow, setIsEditWindow] = useState<boolean>(true);
    const controlEditWindowHandler = (state: string) => {
        switch (state) {
            case 'GO':
                setIsEditWindow(true);
                break;
            case 'BACK':
                setIsEditWindow(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Edit keyword window handler.', state);
        }
    };

    return (
        <View style={likeKeywordSettingTemplateStyles.container}>
            <View style={likeKeywordSettingTemplateStyles.headerBox}>
                <View style={likeKeywordSettingTemplateStyles.headerTextBox}>
                    <TouchButton onPress={moveToBackScreenHandler} hitSlop={20}>
                        <Image
                            source={require('../../../assets/icons/to-left-black.png')}
                            style={likeKeywordSettingTemplateStyles.headerIcon}
                        />
                    </TouchButton>
                    <Spacer width={21} />
                    <MediumText
                        text={isEditWindow ? '관심 키워드 편집' : '관심 키워드'}
                        size={18}
                        color={Colors.BLACK}
                    />
                </View>

                <TouchButton
                    onPress={() => (isEditWindow ? controlEditWindowHandler('BACK') : controlEditWindowHandler('GO'))}
                    hitSlop={20}>
                    <SemiBoldText text={isEditWindow ? '취소' : '편집'} size={16} color={Colors.TXT_GRAY} />
                </TouchButton>
            </View>

            <View style={likeKeywordSettingTemplateStyles.contentBox}>
                {isEditWindow ? (
                    <EditMyKeyword />
                ) : (
                    <>
                        <View style={likeKeywordSettingTemplateStyles.contentTitleBox}>
                            <SemiBoldText text="내가 고른 키워드" size={16} color={Colors.BLACK} />
                        </View>
                        <View style={likeKeywordSettingTemplateStyles.nothingBox}>
                            <Image
                                source={require('../../../assets/icons/warning.png')}
                                style={likeKeywordSettingTemplateStyles.nothingIcon}
                            />
                            <Spacer height={20} />
                            <SemiBoldText text="관심 키워드를 골라주세요" size={18} color={Colors.BTN_GRAY} />
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

export default LikeKeywordSettingTemplate;
