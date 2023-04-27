import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import KeywordsList from '../../organisms/KeywordsList';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { userToken } from '../../../store/atoms';
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
    const checkKeywordHandler = (list: string, index: number) => {
        switch (list) {
            case 'TRAFFIC':
                const freshTraffic = [...checkTraffic];
                freshTraffic.splice(index, 1, !freshTraffic[index]);
                setCheckTraffic(freshTraffic);
                break;
            case 'SUBWAY':
                const freshSubway = [...checkSubway];
                freshSubway.splice(index, 1, !freshSubway[index]);
                setCheckSubway(freshSubway);
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
    const userTk = useRecoilValue(userToken);
    const { mutate } = useMutation(likeKeywordsAPI, {
        onSuccess: () => {
            moveToScreen('OK');
        },
        onError: ({ response }) => {
            //For Debug
            console.log('(ERROR) Send like keywords API', response);
        },
    });
    const onPressLikedKeyword = () => {
        if (checkedKeywords.length > 0) {
            mutate({
                token: userTk.accessToken,
                data: checkedKeywords,
            });
        }
    };

    return (
        <View style={initLikeKeywordTemplateStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MoveBackWithPageTitle
                    oneTitle="관심있는 키워드를 선택하고"
                    twoTitle="맞춤형 커뮤니티를 경험하세요"
                    explainText="관심 키워드는 마이페이지에서 언제든 변경할 수 있어요!"
                    explainSize={13}
                    onPress={() => moveToScreen('BACK')}
                />

                <Spacer height={35} />

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

            <View style={initLikeKeywordTemplateStyles.button}>
                <TextButton
                    onPress={onPressLikedKeyword}
                    text={checkedKeywords.length > 0 ? '확인' : '키워드를 골라주세요'}
                    height={48}
                    backgroundColor={checkedKeywords.length > 0 ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
                <LinearGradient
                    colors={['#F9F9F900', '#F9F9F9']}
                    style={initLikeKeywordTemplateStyles.linear}
                    locations={[0, 0.6]}
                />
            </View>
        </View>
    );
};
export default InitLikeKeywordTemplate;
