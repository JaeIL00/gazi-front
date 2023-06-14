import React, { useEffect, useLayoutEffect } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';
import DropShadow from 'react-native-drop-shadow';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import KeywordsList from '../../organisms/KeywordsList';
import useCheckKeyword from '../../../utils/hooks/useCheckKeyword';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { userTokenAtom } from '../../../store/atoms';
import { addLikeKeywordsAPI } from '../../../queries/api';
import { InitLikeKeywordTemplateProps } from '../../../types/types';
import { initLikeKeywordTemplateStyles } from '../../../styles/styles';
import { issueKeywordsNotEtc, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const InitLikeKeywordTemplate = ({ navigationHandler }: InitLikeKeywordTemplateProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);

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
                        <MediumText text="Skip" color={Colors.TXT_GRAY} size={14} />
                    </TouchButton>
                </View>

                <LinearGradient colors={['#F9F9F9', '#F9F9F900']} style={initLikeKeywordTemplateStyles.upLinear} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={initLikeKeywordTemplateStyles.scrollBox}>
                <View>
                    <SemiBoldText text="교통수단" color={Colors.BLACK} size={18} />
                    <Spacer height={14} />
                    <KeywordsList
                        type="TRAFFIC"
                        list={trafficKeywords}
                        isCheck={checkTraffic}
                        checkKeywordHandler={checkingKeywordHandler}
                        checkTextColor={Colors.WHITE}
                        checkBorderColor={undefined}
                        checkBackColor={Colors.BLACK}
                        trafficKeywordColor={Colors.BLACK}
                    />
                    {checkTraffic[2] && (
                        <KeywordsList
                            type="SUBWAY"
                            list={subwayKeywords}
                            isCheck={checkSubway}
                            checkKeywordHandler={checkingKeywordHandler}
                            checkTextColor={Colors.WHITE}
                            checkBorderColor={undefined}
                            checkBackColor={Colors.BLACK}
                        />
                    )}
                </View>

                <Spacer height={16} />

                <View>
                    <SemiBoldText text="이슈" color={Colors.BLACK} size={18} />
                    <Spacer height={14} />
                    <KeywordsList
                        type="ISSUE"
                        list={issueKeywordsNotEtc}
                        isCheck={checkIssue}
                        checkKeywordHandler={checkingKeywordHandler}
                        checkTextColor={Colors.WHITE}
                        checkBorderColor={undefined}
                        checkBackColor={Colors.BLACK}
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
                        backgroundColor={checkedKeywords.length > 0 ? Colors.BLACK : Colors.BTN_GRAY}
                        textColor={Colors.WHITE}
                        fontSize={17}
                    />
                </DropShadow>
            </View>
        </View>
    );
};
export default InitLikeKeywordTemplate;
