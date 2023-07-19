import React, { useEffect, useLayoutEffect } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';
import DropShadow from 'react-native-drop-shadow';

import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import MediumText from '../../atoms/MediumText';
import TouchButton from '../../atoms/TouchButton';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import KeywordsList from '../../organisms/KeywordsList';
import useCheckKeyword from '../../../common/hooks/useCheckKeyword';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { userAuthAtom } from '../../../recoil';
import { addLikeKeywordsAPI } from '../../../apis/api';
import { initLikeKeywordTemplateStyles } from '../../../styles/templates/styles';
import { issueKeywordsNotEtc, subwayKeywords, trafficKeywords } from '../../../common/constants/allKeywords';
import { InitLikeKeywordTemplateProps } from '../../../types/templates/types';

const InitLikeKeywordTemplate = ({ navigationHandler }: InitLikeKeywordTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);

    // Custom hook useCheckKeyword
    const {
        checkTraffic,
        checkSubway,
        checkIssue,
        checkedKeywords,
        checkedKeywordsHandler,
        checkingInitialize,
        checkingKeywordHandler,
    } = useCheckKeyword();

    // Send like keywords API
    const { mutate } = useMutation(addLikeKeywordsAPI, {
        onSuccess: () => {
            navigationHandler('OK');
        },
        onError: ({ response }) => {
            //For Debug
            console.log('(ERROR) Send like keywords API', response);
        },
    });

    // Put my keeyword to server
    const onPressLikedKeyword = debounce(() => {
        if (checkedKeywords.length > 0) {
            mutate({
                accessToken,
                data: checkedKeywords,
            });
        }
    }, 300);

    // Initialized check keywords
    useLayoutEffect(() => {
        checkingInitialize();
    }, []);

    // Checked state handling
    useEffect(() => {
        const allList = [...trafficKeywords, ...subwayKeywords, ...issueKeywordsNotEtc];
        const checkedList = [...checkTraffic, ...checkSubway, ...checkIssue];
        checkedKeywordsHandler(allList, checkedList);
    }, [checkTraffic, checkIssue, checkSubway]);

    return (
        <View style={initLikeKeywordTemplateStyles.container}>
            <View style={initLikeKeywordTemplateStyles.headerBox}>
                <MoveBackWithPageTitle
                    oneTitle="관심있는 키워드를 선택하고"
                    twoTitle="맞춤형 커뮤니티를 경험하세요"
                    explainText="관심 키워드는 마이페이지에서 언제든 변경할 수 있어요!"
                    explainSize={13}
                    onPress={() => navigationHandler('BACK')}
                />
                <View style={initLikeKeywordTemplateStyles.skipBox}>
                    <TouchButton onPress={() => navigationHandler('OK')}>
                        <MediumText text="Skip" color={colors.TXT_GRAY} size={14} />
                    </TouchButton>
                </View>

                <LinearGradient colors={['#F9F9F9', '#F9F9F900']} style={initLikeKeywordTemplateStyles.upLinear} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={initLikeKeywordTemplateStyles.scrollBox}>
                <View>
                    <SemiBoldText text="교통수단" color={colors.BLACK} size={18} />
                    <Spacer height={14} />
                    <KeywordsList
                        type="TRAFFIC"
                        list={trafficKeywords}
                        isCheck={checkTraffic}
                        checkKeywordHandler={checkingKeywordHandler}
                        checkTextColor={colors.WHITE}
                        checkBorderColor={undefined}
                        checkBackColor={colors.BLACK}
                        trafficKeywordColor={colors.BLACK}
                    />
                    {checkTraffic[2] && (
                        <KeywordsList
                            type="SUBWAY"
                            list={subwayKeywords}
                            isCheck={checkSubway}
                            checkKeywordHandler={checkingKeywordHandler}
                            checkTextColor={colors.WHITE}
                            checkBorderColor={undefined}
                            checkBackColor={colors.BLACK}
                        />
                    )}
                </View>

                <Spacer height={16} />

                <View>
                    <SemiBoldText text="이슈" color={colors.BLACK} size={18} />
                    <Spacer height={14} />
                    <KeywordsList
                        type="ISSUE"
                        list={issueKeywordsNotEtc}
                        isCheck={checkIssue}
                        checkKeywordHandler={checkingKeywordHandler}
                        checkTextColor={colors.WHITE}
                        checkBorderColor={undefined}
                        checkBackColor={colors.BLACK}
                    />
                </View>
            </ScrollView>

            <View style={initLikeKeywordTemplateStyles.downLinearBox}>
                <LinearGradient colors={['#F9F9F900', '#F9F9F9']} style={initLikeKeywordTemplateStyles.downLinear} />
            </View>

            <View style={initLikeKeywordTemplateStyles.button}>
                <DropShadow
                    style={
                        Platform.OS === 'android' &&
                        checkedKeywords.length > 0 &&
                        initLikeKeywordTemplateStyles.androidShadow
                    }>
                    <TextButton
                        onPress={onPressLikedKeyword}
                        text={checkedKeywords.length > 0 ? '확인' : '키워드를 골라주세요'}
                        height={48}
                        backgroundColor={checkedKeywords.length > 0 ? colors.BLACK : colors.BTN_GRAY}
                        textColor={colors.WHITE}
                        fontSize={17}
                    />
                </DropShadow>
            </View>
        </View>
    );
};
export default InitLikeKeywordTemplate;
