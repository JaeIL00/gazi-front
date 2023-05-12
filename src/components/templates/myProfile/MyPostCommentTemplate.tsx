import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Icons from '../../smallest/Icons';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import Spacer from '../../smallest/Spacer';
import MediumText from '../../smallest/MediumText';
import Colors from '../../../styles/Colors';
import SemiBoldText from '../../smallest/SemiBoldText';
import TouchButton from '../../smallest/TouchButton';
import { myPostCommentTemplateStyles } from '../../../styles/styles';
import { MyPostCommentTemplateProps } from '../../../types/types';

const MyPostCommentTemplate = ({ moveToBackScreenHandler }: MyPostCommentTemplateProps) => {
    const [isComment, setIsComment] = useState<boolean>(false);
    const tabHandler = (state: string) => {
        switch (state) {
            case 'POST':
                setIsComment(false);
                break;
            case 'COMMENT':
                setIsComment(true);
                break;
            default:
                // For Debug
                console.log('(ERROR) Tab control handler.', state);
        }
    };
    return (
        <View>
            <View style={myPostCommentTemplateStyles.headerBox}>
                <TouchButton onPress={moveToBackScreenHandler} hitSlop={20}>
                    <Image
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={myPostCommentTemplateStyles.headerIcon}
                    />
                </TouchButton>
                <Spacer width={21} />
                <MediumText text="내가 작성한 글" size={18} color={Colors.BLACK} />
            </View>

            <View style={myPostCommentTemplateStyles.tabBox}>
                <View
                    style={[
                        myPostCommentTemplateStyles.tabButton,
                        {
                            borderBottomWidth: isComment ? undefined : 1.5 * screenFont,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('POST')}>
                        <SemiBoldText text="작성한 글" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
                <View
                    style={[
                        myPostCommentTemplateStyles.tabButton,
                        {
                            borderBottomWidth: isComment ? 1.5 * screenFont : undefined,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('COMMENT')}>
                        <SemiBoldText text="나의 답글" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
            </View>
        </View>
    );
};

export default MyPostCommentTemplate;
