import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import KeywordsList from '../KeywordsList';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TouchButton from '../../smallest/TouchButton';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { KeywordListTypes } from '../../../types/types';
import { editMyKeywordStyles } from '../../../styles/styles';
import { issueKeywordsNotEtc, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';
import { screenHeight } from '../../../utils/changeStyleSize';

const EditMyKeyword = () => {
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
        for (const index in issueKeywordsNotEtc) {
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
    const checkedKeywordsHandler = (list: KeywordListTypes[], isChecked: boolean[]) => {
        const getId = list.map((item, index) => {
            if (item.id !== 9999 && item.id !== 9998 && isChecked[index]) {
                return item.id;
            }
        });
        const cleanType = getId.filter(item => item !== undefined) as number[];
        setCheckedKeywords(cleanType);
    };
    useEffect(() => {
        const allList = [...trafficKeywords, ...subwayKeywords, ...issueKeywordsNotEtc];
        const checkedList = [...checkTraffic, ...checkSubway, ...checkIssue];
        checkedKeywordsHandler(allList, checkedList);
    }, [checkTraffic, checkIssue, checkSubway]);

    return (
        <>
            <View style={{ paddingBottom: 90 * screenHeight }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={editMyKeywordStyles.keywordListBox}>
                            <SemiBoldText text="이슈" color={Colors.BLACK} size={16} />
                        </View>
                        <Spacer height={14} />
                        <KeywordsList
                            type="ISSUE"
                            list={issueKeywordsNotEtc}
                            isCheck={checkIssue}
                            checkKeywordHandler={checkKeywordHandler}
                            checkTextColor="#7949C6"
                            checkBorderColor={Colors.VIOLET}
                            checkBackColor="#F1E9FF"
                        />
                    </View>

                    <Spacer height={29} />

                    <View>
                        <View style={editMyKeywordStyles.keywordListBox}>
                            <SemiBoldText text="교통수단" color={Colors.BLACK} size={16} />
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
            </View>

            <View style={editMyKeywordStyles.bottomBox}>
                <TouchButton onPress={() => {}} paddingHorizontal={7}>
                    <View style={editMyKeywordStyles.resetText}>
                        <Icons type="feather" name="refresh-cw" size={17} color={Colors.TXT_GRAY} />
                        <Spacer width={3} />
                        <View style={editMyKeywordStyles.borderLine}>
                            <BoldText text="선택초기화" size={13} color={Colors.TXT_GRAY} />
                        </View>
                    </View>
                </TouchButton>
                <TextButton
                    onPress={() => {}}
                    text="선택완료"
                    fontSize={17}
                    textColor={Colors.WHITE}
                    backgroundColor={Colors.BLACK}
                    paddingHorizontal={83.5}
                    paddingVertical={11}
                    alignSelf="stretch"
                />
            </View>
        </>
    );
};

export default EditMyKeyword;
