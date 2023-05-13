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
import { editMyKeywordStyles } from '../../../styles/styles';
import { screenHeight } from '../../../utils/changeStyleSize';
import { EditMyKeywordProps, KeywordListTypes } from '../../../types/types';
import { issueKeywordsNotEtc, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const EditMyKeyword = ({ myKeywordList, checkInitTraffic, checkInitSubway, checkInitIssue }: EditMyKeywordProps) => {
    // Initialized check keywords
    const [checkTraffic, setCheckTraffic] = useState<boolean[]>(checkInitTraffic);
    const [checkSubway, setCheckSubway] = useState<boolean[]>(checkInitSubway);
    const [checkIssue, setCheckIssue] = useState<boolean[]>(checkInitIssue);

    useLayoutEffect(() => {
        checkMyKeyword();
    }, []);
    const checkMyKeyword = () => {
        let checkedIndexTraffic: number[] = [];
        let checkedIndexIssue: number[] = [];
        let checkedIndexSubway: number[] = [];
        const freshTraffic = [...checkTraffic];
        const freshIssue = [...checkIssue];
        const freshSubway = [...checkSubway];
        for (const index in myKeywordList) {
            if (10 === myKeywordList[index].id || myKeywordList[index].id === 11) {
                const checkIndex = trafficKeywords.findIndex(item => item.id === myKeywordList[index].id);
                checkedIndexTraffic = [...checkedIndexTraffic, checkIndex];
            } else if (1 <= myKeywordList[index].id && myKeywordList[index].id <= 8) {
                const checkIndex = issueKeywordsNotEtc.findIndex(item => item.id === myKeywordList[index].id);
                checkedIndexIssue = [...checkedIndexIssue, checkIndex];
            } else if (13 <= myKeywordList[index].id && myKeywordList[index].id <= 35) {
                const checkIndex = subwayKeywords.findIndex(item => item.id === myKeywordList[index].id);
                checkedIndexSubway = [...checkedIndexSubway, checkIndex];
            }
        }
        for (const index in checkedIndexTraffic) {
            freshTraffic.splice(checkedIndexTraffic[index], 1, true);
        }
        for (const index in checkedIndexIssue) {
            freshIssue.splice(checkedIndexIssue[index], 1, true);
        }
        for (const index in checkedIndexSubway) {
            freshSubway.splice(checkedIndexSubway[index], 1, true);
        }
        setCheckTraffic(freshTraffic);
        setCheckIssue(freshIssue);
        if (checkedIndexSubway.length === 23) {
            setCheckSubway(Array.from(Array(24), () => true));
        } else {
            setCheckSubway(freshSubway);
        }
    };

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
                console.log('hi');
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
        const subwaytrue = checkSubway.filter(item => item !== false);
        if (subwaytrue.length > 0) {
            setCheckTraffic(prev => {
                prev.splice(2, 1, true);
                return prev;
            });
        }
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
