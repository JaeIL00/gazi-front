import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { userTokenAtom } from '../../../store/atoms';
import { likeKeywordsAPI } from '../../../queries/api';
import { initLikeKeywordTemplateStyles } from '../../../styles/styles';
import { InitLikeKeywordTemplateProps, KeywordListTypes } from '../../../types/types';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const InitLikeKeywordTemplate = ({ moveToScreen }: InitLikeKeywordTemplateProps) => {
    // Initialized check keywords
    const [checkTraffic, setCheckTraffic] = useState<boolean[]>([]);
    const [checkSubway, setCheckSubway] = useState<boolean[]>([]);
    const [checkIssue, setCheckIssue] = useState<boolean[]>([]);
    const checkingInitialize = () => {
        let newCheckTraffic: boolean[] = [];
        for (const index in trafficKeywords) {
            newCheckTraffic = [...newCheckTraffic, false];
        }
        let newCheckSubway: boolean[] = [];
        for (const index in subwayKeywords) {
            newCheckSubway = [...newCheckSubway, false];
        }
        let newCheckIssue: boolean[] = [];
        for (const index in issueKeywords) {
            newCheckIssue = [...newCheckIssue, false];
        }
        setCheckTraffic(newCheckTraffic);
        setCheckSubway(newCheckSubway);
        setCheckIssue(newCheckIssue);
    };
    useLayoutEffect(() => {
        checkingInitialize();
    }, []);

    // check Keyword Handling
    const checkKeywordHandler = (list: string, index: number, id: number) => {
        switch (list) {
            case 'TRAFFIC':
                const freshTraffic = [...checkTraffic];
                freshTraffic.splice(index, 1, !freshTraffic[index]);
                setCheckTraffic(freshTraffic);
                break;
            case 'SUBWAY':
                if (id === 9998) {
                    const freshSubway = [...checkSubway];
                    const checkAll = freshSubway.map(() => !freshSubway[0]);
                    setCheckSubway(checkAll);
                } else {
                    const freshSubway = [...checkSubway];
                    freshSubway.splice(0, 1, false);
                    freshSubway.splice(index, 1, !freshSubway[index]);
                    setCheckSubway(freshSubway);
                }
                break;
            case 'ISSUE':
                const freshIssue = [...checkIssue];
                freshIssue.splice(index, 1, !freshIssue[index]);
                setCheckIssue(freshIssue);
                break;
            default:
                // For Debug
                console.log('(ERROR) check Keyword Handling. listname:', list);
                return;
        }
    };

    // Checked state handling
    const [checkedKeywords, setCheckedKeywords] = useState<number[]>([]);
    const checkedKeywordsHandler = (list: KeywordListTypes, isChecked: boolean[]) => {
        const getId = list.map((item, index) => {
            if (item.id !== 9999 && item.id !== 9998 && isChecked[index]) {
                return item.id;
            }
        });
        const cleanType = getId.filter(item => item !== undefined) as number[];
        setCheckedKeywords(cleanType);
    };
    useEffect(() => {
        const asd = [...trafficKeywords, ...subwayKeywords, ...issueKeywords];
        const df = [...checkTraffic, ...checkSubway, ...checkIssue];
        checkedKeywordsHandler(asd, df);
    }, [checkTraffic, checkIssue, checkSubway]);

    // Send like keywords API
    const userTk = useRecoilValue(userTokenAtom);
    const { mutate } = useMutation(likeKeywordsAPI, {
        onSuccess: () => {
            moveToScreen('OK');
        },
        onError: ({ response }) => {
            //For Debug
            console.log('(ERROR) Send like keywords API', response);
        },
    });
    const onPressLikedKeyword = debounce(() => {
        if (checkedKeywords.length > 0) {
            mutate({
                token: userTk.accessToken,
                data: checkedKeywords,
            });
        }
    }, 300);

    return (
        <View style={initLikeKeywordTemplateStyles.container}>
            <View style={initLikeKeywordTemplateStyles.headerBox}>
                <MoveBackWithPageTitle
                    oneTitle="관심있는 키워드를 선택하고"
                    twoTitle="맞춤형 커뮤니티를 경험하세요"
                    explainText="관심 키워드는 마이페이지에서 언제든 변경할 수 있어요!"
                    explainSize={13}
                    onPress={() => moveToScreen('BACK')}
                />
                <View style={initLikeKeywordTemplateStyles.skipBox}>
                    <TouchButton onPress={() => moveToScreen('OK')}>
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
                        checkKeywordHandler={checkKeywordHandler}
                    />
                    {checkTraffic[2] && (
                        <KeywordsList
                            type="SUBWAY"
                            list={subwayKeywords}
                            isCheck={checkSubway}
                            checkKeywordHandler={checkKeywordHandler}
                        />
                    )}
                </View>

                <Spacer height={16} />

                <View>
                    <SemiBoldText text="이슈" color={Colors.BLACK} size={18} />
                    <Spacer height={14} />
                    <KeywordsList
                        type="ISSUE"
                        list={issueKeywords}
                        isCheck={checkIssue}
                        checkKeywordHandler={checkKeywordHandler}
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
