import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import EditMyKeyword from '../../organisms/myProfile/EditMyKeyword';
import { userTokenAtom } from '../../../store/atoms';
import { geyMyLikeKeywordsAPI } from '../../../queries/api';
import { likeKeywordSettingTemplateStyles } from '../../../styles/styles';
import { LikeKeywordSettingTemplateProps, MyLikeKeywordTypes } from '../../../types/types';

const LikeKeywordSettingTemplate = ({
    moveToBackScreenHandler,
    isFromCommunity = false,
}: LikeKeywordSettingTemplateProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);

    const [isEditWindow, setIsEditWindow] = useState<boolean>(isFromCommunity);
    const [myKeywordList, setMyKeywordList] = useState<MyLikeKeywordTypes[]>([]);

    // My like keyword API
    const { refetch: getMyKeywordRefetch } = useQuery('getMyLikeKeyword', () => geyMyLikeKeywordsAPI(accessToken), {
        onSuccess: ({ data }) => {
            setMyKeywordList(data.data);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR), Get my like keyword list API.', error);
        },
    });

    // Like keyword move step handler
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
                    <EditMyKeyword
                        myKeywordList={myKeywordList}
                        isFromCommunity={isFromCommunity}
                        controlEditWindowHandler={controlEditWindowHandler}
                        getMyKeywordRefetch={getMyKeywordRefetch}
                    />
                ) : (
                    <>
                        <View style={likeKeywordSettingTemplateStyles.contentTitleBox}>
                            <SemiBoldText text="내가 고른 키워드" size={16} color={Colors.BLACK} />
                        </View>
                        {myKeywordList.length > 0 ? (
                            <View style={likeKeywordSettingTemplateStyles.myKeywordBox}>
                                {myKeywordList.map(item => (
                                    <View key={item.id} style={likeKeywordSettingTemplateStyles.myKeywordList}>
                                        <NormalText text={item.keywordName} size={16} color="#7949C6" />
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={likeKeywordSettingTemplateStyles.nothingBox}>
                                <Image
                                    source={require('../../../assets/icons/warning.png')}
                                    style={likeKeywordSettingTemplateStyles.nothingIcon}
                                />
                                <Spacer height={20} />
                                <SemiBoldText text="관심 키워드를 골라주세요" size={18} color={Colors.BTN_GRAY} />
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

export default LikeKeywordSettingTemplate;
<></>;
