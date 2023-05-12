import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { communityTemplateStyles } from '../../../styles/styles';
import SemiBoldText from '../../smallest/SemiBoldText';
import TouchButton from '../../smallest/TouchButton';
import MediumText from '../../smallest/MediumText';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import { screenFont } from '../../../utils/changeStyleSize';

const CommunityTemplate = () => {
    const [isLikePostTab, setIsLikePostTab] = useState<boolean>(false);
    const tabHandler = (state: string) => {
        switch (state) {
            case 'ALL':
                setIsLikePostTab(false);
                break;
            case 'LIKE':
                setIsLikePostTab(true);
                break;
            default:
                // For Debug
                console.log('(ERROR) Tab control handler.', state);
        }
    };
    return (
        <View>
            <View style={communityTemplateStyles.headerBox}>
                <SemiBoldText text="커뮤니티" size={20} color="#000000" />
            </View>

            <View style={communityTemplateStyles.tabBox}>
                <View
                    style={[
                        communityTemplateStyles.tabButton,
                        {
                            borderBottomWidth: isLikePostTab ? undefined : 1.5 * screenFont,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('ALL')}>
                        <SemiBoldText text="전체 게시판" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
                <View
                    style={[
                        communityTemplateStyles.tabButton,
                        {
                            borderBottomWidth: isLikePostTab ? 1.5 * screenFont : undefined,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('LIKE')}>
                        <SemiBoldText text="관심 게시판" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
            </View>
        </View>
    );
};

export default CommunityTemplate;
