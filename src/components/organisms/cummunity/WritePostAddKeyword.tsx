import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import KeywordsList from '../KeywordsList';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import { writePostAddKeywordStyles } from '../../../styles/styles';
import { KeywordListTypes, WritePostAddKeywordProps } from '../../../types/types';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const WritePostAddKeyword = ({ keywordModalHandler, getKeywordHandler }: WritePostAddKeywordProps) => {
    // Choose keyword step. all keyword and head keyword
    const [step, setStep] = useState(1);
    const stepHandler = () => {
        if (step === 1) {
            let newCheckHead: boolean[] = [];
            for (const index in chooseIssueList) {
                newCheckHead = [...newCheckHead, false];
            }
            setCheckHead(newCheckHead);
            getKeywordHandler('LIST', checkedKeywords);
            setStep(2);
        } else if (step === 2) {
            // save and close
            if (headKeyword.length > 0) {
                getKeywordHandler('HEAD', headKeyword);
                keywordModalHandler('CLOSE');
            }
        }
    };
    const stepMoveHandler = (state: string) => {
        switch (state) {
            case 'CLOSE':
                keywordModalHandler('CLOSE');
                break;
            case 'NEXT':
                setStep(1);
                break;
            default:
                // For Debug
                console.log('(ERROR) Choose keyword step move function.', state);
        }
    };

    // Initialized check keywords
    const [checkTraffic, setCheckTraffic] = useState<boolean[]>([]);
    const [checkSubway, setCheckSubway] = useState<boolean[]>([]);
    const [checkIssue, setCheckIssue] = useState<boolean[]>([]);
    const [checkHead, setCheckHead] = useState<boolean[]>([]);
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
            case 'HEAD':
                const copyHead = [...checkHead];
                const freshHead = copyHead.map(item => false);
                freshHead.splice(index, 1, true);
                setCheckHead(freshHead);
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
        const allList = [...trafficKeywords, ...subwayKeywords, ...issueKeywords];
        const checkedList = [...checkTraffic, ...checkSubway, ...checkIssue];
        checkedKeywordsHandler(allList, checkedList);
        refreshIssueKeyword();
    }, [checkTraffic, checkIssue, checkSubway]);

    // Choose head keyword
    const [chooseIssueList, setChooseIssueList] = useState<KeywordListTypes[]>([]);
    const [headKeyword, setHeadKeyword] = useState<number[]>([]);
    const refreshIssueKeyword = () => {
        const refresh = issueKeywords.map((item, index) => {
            if (checkIssue[index]) {
                return item;
            }
        });
        const cleanType = refresh.filter(item => item !== undefined) as KeywordListTypes[];
        setChooseIssueList(cleanType);
    };
    const saveHeadKeyword = () => {
        const getId = chooseIssueList.map((item, index) => {
            if (checkHead[index]) {
                return item.id;
            }
        });
        const cleanType = getId.filter(item => item !== undefined) as number[];
        setHeadKeyword(cleanType);
    };
    useEffect(() => {
        saveHeadKeyword();
    }, [checkHead]);

    return (
        <View style={writePostAddKeywordStyles.container}>
            <HeaderMolecule
                title="키워드 설정"
                isPaddingHorizontal={false}
                backHandler={stepMoveHandler}
                isNextStep={step === 2}
                headerFinish={false}
                finishText=""
                background="undefined"
            />
            <Spacer height={42} />
            {step === 1 && (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <View style={writePostAddKeywordStyles.keywordListBox}>
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
                            <View style={writePostAddKeywordStyles.keywordListBox}>
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
                </>
            )}

            {step === 2 && (
                <View>
                    <SemiBoldText text="선택하신 이슈 키워드 중" color={Colors.BLACK} size={16} />
                    <SemiBoldText text="사건을 대표하는 키워드를 1개 선택해주세요" color={Colors.BLACK} size={16} />
                    <Spacer height={21} />
                    <KeywordsList
                        type="HEAD"
                        list={chooseIssueList}
                        isCheck={checkHead}
                        checkKeywordHandler={checkKeywordHandler}
                        checkTextColor={Colors.WHITE}
                        checkBorderColor={Colors.VIOLET}
                        checkBackColor={Colors.VIOLET}
                    />
                </View>
            )}

            <View style={writePostAddKeywordStyles.nextBottonBox}>
                <TextButton
                    onPress={stepHandler}
                    text={step === 1 ? '다음' : '완료'}
                    height={48}
                    backgroundColor={
                        (checkedKeywords.length > 0 && step === 1) || (headKeyword.length > 0 && step === 2)
                            ? Colors.BLACK
                            : Colors.BTN_GRAY
                    }
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};

export default WritePostAddKeyword;
