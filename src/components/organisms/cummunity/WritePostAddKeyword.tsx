import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import KeywordsList from '../KeywordsList';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import useCheckKeyword from '../../../utils/hooks/useCheckKeyword';
import { writePostAddKeywordStyles } from '../../../styles/styles';
import { KeywordListTypes, WritePostAddKeywordProps } from '../../../types/types';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const WritePostAddKeyword = ({ keywordModalHandler, getKeywordHandler }: WritePostAddKeywordProps) => {
    const [step, setStep] = useState<number>(1);
    const [headKeyword, setHeadKeyword] = useState<number[]>([]);
    const [chooseIssueList, setChooseIssueList] = useState<KeywordListTypes[]>([]);

    // Custom hook useCheckKeyword
    const {
        checkTraffic,
        checkSubway,
        checkIssue,
        checkHead,
        checkedKeywords,
        checkingInitialize,
        checkingKeywordHandler,
        checkedKeywordsHandler,
        keywordSetStateHandler,
    } = useCheckKeyword();

    // Move step editting
    const stepHandler = () => {
        if (step === 1 && checkedKeywords.length > 0) {
            let newCheckHead: boolean[] = [];
            for (const index in chooseIssueList) {
                newCheckHead = [...newCheckHead, false];
            }
            keywordSetStateHandler('HEAD', newCheckHead);
            setStep(2);
        } else if (step === 2) {
            // save and close
            if (headKeyword.length > 0) {
                const chooseKeywords = [...headKeyword, ...checkedKeywords];
                const lastKeywords = chooseKeywords.filter((item, index) => chooseKeywords.indexOf(item) === index);
                getKeywordHandler(lastKeywords);
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

    // Choose head keyword
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

    // Initialized check keywords
    useLayoutEffect(() => {
        checkingInitialize();
    }, []);

    // Checked state handling
    useEffect(() => {
        const allList = [...trafficKeywords, ...subwayKeywords, ...issueKeywords];
        const checkedList = [...checkTraffic, ...checkSubway, ...checkIssue];
        checkedKeywordsHandler(allList, checkedList);
        refreshIssueKeyword();
    }, [checkTraffic, checkIssue, checkSubway]);

    useEffect(() => {
        if (chooseIssueList.length > 0) {
            saveHeadKeyword();
        }
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
                                checkKeywordHandler={checkingKeywordHandler}
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
                                checkKeywordHandler={checkingKeywordHandler}
                                checkTextColor="#7949C6"
                                checkBorderColor={Colors.VIOLET}
                                checkBackColor="#F1E9FF"
                                trafficKeywordColor="#7949C6"
                            />
                            {checkTraffic[2] && (
                                <KeywordsList
                                    type="SUBWAY"
                                    list={subwayKeywords}
                                    isCheck={checkSubway}
                                    checkKeywordHandler={checkingKeywordHandler}
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
                        checkKeywordHandler={checkingKeywordHandler}
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
