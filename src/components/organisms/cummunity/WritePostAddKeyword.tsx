import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { KeywordListTypes, WritePostAddKeywordProps } from '../../../types/types';
import { writePostAddKeywordStyles } from '../../../styles/styles';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';
import KeywordsList from '../KeywordsList';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import NormalText from '../../smallest/NormalText';
import TextButton from '../../molecules/TextButton';

const WritePostAddKeyword = ({ keywordModalHandler, getKeywordHandler }: WritePostAddKeywordProps) => {
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
        const allList = [...trafficKeywords, ...subwayKeywords, ...issueKeywords];
        const checkedList = [...checkTraffic, ...checkSubway, ...checkIssue];
        checkedKeywordsHandler(allList, checkedList);
    }, [checkTraffic, checkIssue, checkSubway]);

    return (
        <View style={writePostAddKeywordStyles.container}>
            <View style={writePostAddKeywordStyles.headerBox}>
                <TouchButton onPress={() => keywordModalHandler('CLOSE')}>
                    <View style={writePostAddKeywordStyles.titleBox}>
                        <Icons type="ionicons" name="close-sharp" size={24} color={Colors.BLACK} />
                        <Spacer width={16.8} />
                        <MediumText text="키워드 설정" size={18} color={Colors.BLACK} />
                    </View>
                </TouchButton>
                <TouchButton onPress={() => {}}>
                    <SemiBoldText text="완료" size={16} color={Colors.TXT_GRAY} />
                </TouchButton>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 42 * screenHeight }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SemiBoldText text="이슈" color={Colors.BLACK} size={16} />
                        <Spacer width={6} />
                        <NormalText text="1개이상 선택" size={13} color="#8F8F8F" />
                    </View>
                    <Spacer height={14} />
                    <KeywordsList
                        type="ISSUE"
                        list={issueKeywords}
                        isCheck={checkIssue}
                        checkKeywordHandler={checkKeywordHandler}
                        checkTextColor="#7949C6"
                        checkBorderColor={Colors.VIOLET}
                        checkBackColor="#F1E9FF"
                    />
                </View>
                <Spacer height={29} />

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SemiBoldText text="교통수단" color={Colors.BLACK} size={16} />
                        <Spacer width={6} />
                        <NormalText text="1개이상 선택" size={13} color="#8F8F8F" />
                    </View>
                    <Spacer height={14} />
                    <KeywordsList
                        type="TRAFFIC"
                        list={trafficKeywords}
                        isCheck={checkTraffic}
                        checkKeywordHandler={checkKeywordHandler}
                        checkTextColor="#7949C6"
                        checkBorderColor={Colors.VIOLET}
                        checkBackColor={Colors.WHITE}
                    />
                    {checkTraffic[2] && (
                        <KeywordsList
                            type="SUBWAY"
                            list={subwayKeywords}
                            isCheck={checkSubway}
                            checkKeywordHandler={checkKeywordHandler}
                            checkTextColor="#7949C6"
                            checkBorderColor={Colors.VIOLET}
                            checkBackColor="#F1E9FF"
                        />
                    )}
                </View>

                <Spacer height={100} />
            </ScrollView>

            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 42 * screenHeight,
                    alignSelf: 'center',
                }}>
                <TextButton
                    onPress={() => {}}
                    text={'다음'}
                    height={48}
                    backgroundColor={checkedKeywords.length > 0 ? Colors.BLACK : Colors.BTN_GRAY}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};

export default WritePostAddKeyword;
