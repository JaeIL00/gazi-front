import React, { useState } from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import FastImage from 'react-native-fast-image';

import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import MediumText from '../../atoms/MediumText';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import EditMyKeyword from '../../organisms/myPage/EditMyKeyword';
import { userAuthAtom } from '../../../recoil';
import { getMyLikeKeywordsAPI } from '../../../apis/api';
import { likeKeywordSettingTemplateStyles } from '../../../styles/templates/styles';
import { LikeKeywordSettingTemplateProps } from '../../../types/templates/types';
import { MyLikeKeywordTypes } from '../../../types/common/types';
import TextButton from '../../molecules/TextButton';
import ImageButton from '../../molecules/ImageButton';

const LikeKeywordSettingTemplate = ({
    moveToBackScreenHandler,
    isShortcut = false,
}: LikeKeywordSettingTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);

    const [isEditMode, setIsEditMode] = useState<boolean>(isShortcut);
    const [myKeywordList, setMyKeywordList] = useState<MyLikeKeywordTypes[]>([]);

    // My like keyword API
    const { refetch: getMyKeywordRefetch } = useQuery('getMyLikeKeyword', () => getMyLikeKeywordsAPI(accessToken), {
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
                setIsEditMode(true);
                break;
            case 'BACK':
                setIsEditMode(false);
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
                    <ImageButton
                        onPress={moveToBackScreenHandler}
                        hitSlop={20}
                        imageSource={require('../../../assets/icons/to-left-black.png')}
                        imageWidth={9}
                        imageHeight={16}
                        isCaching={true}
                    />
                    <Spacer width={21} />
                    <MediumText text={isEditMode ? '관심 키워드 편집' : '관심 키워드'} size={18} color={colors.BLACK} />
                </View>

                <TextButton
                    onPress={() => (isEditMode ? controlEditWindowHandler('BACK') : controlEditWindowHandler('GO'))}
                    hitSlop={20}
                    text={isEditMode ? '취소' : '편집'}
                    fontSize={16}
                    fontColor={colors.TXT_GRAY}
                    fontWeight="semiBold"
                />
            </View>

            <View style={likeKeywordSettingTemplateStyles.contentBox}>
                {isEditMode ? (
                    <EditMyKeyword
                        myKeywordList={myKeywordList}
                        isShortcut={isShortcut}
                        controlEditWindowHandler={controlEditWindowHandler}
                        getMyKeywordRefetch={getMyKeywordRefetch}
                    />
                ) : (
                    <>
                        <View style={likeKeywordSettingTemplateStyles.contentTitleBox}>
                            <SemiBoldText text="내가 고른 키워드" size={16} color={colors.BLACK} />
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
                                <FastImage
                                    source={require('../../../assets/icons/warning.png')}
                                    style={likeKeywordSettingTemplateStyles.nothingIcon}
                                />
                                <Spacer height={20} />
                                <SemiBoldText text="관심 키워드를 골라주세요" size={18} color={colors.BTN_GRAY} />
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
