import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import SemiBoldText from '../../smallest/SemiBoldText';
import KeywordsList from '../../organisms/KeywordsList';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const InitLikeKeywordTemplate = () => {
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
                console.log(freshTraffic);
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
        }
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <MoveBackWithPageTitle
                oneTitle="관심있는 키워드를"
                twoTitle="세대 이상 골라주세요"
                explainText="선택한 키워드가 포함된 스레드가 상단에 표시됩니다."
                explainSize={13}
                onPress={() => {}}
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
    );
};
export default InitLikeKeywordTemplate;
