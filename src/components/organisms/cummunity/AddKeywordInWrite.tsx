import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import KeywordsList from '../common/KeywordsList';
import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import useCheckKeyword from '../../../common/hooks/useCheckKeyword';
import { addKeywordInWriteStyles } from '../../../styles/organisms/styles';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../common/constants/allKeywords';
import { KeywordListTypes } from '../../../types/common/types';
import { WritePostAddKeywordProps } from '../../../types/organisms/types';

const AddKeywordInWrite = ({ keywordModalHandler, getKeywordHandler }: WritePostAddKeywordProps) => {
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
            let newCheckHead: boolean[] = Array(chooseIssueList.length).fill(false);
            keywordSetStateHandler('HEAD', newCheckHead);
            setStep(2);
        } else if (step === 2) {
            // save and close
            if (headKeyword.length > 0) {
                const mergedKeywords = [...headKeyword, ...checkedKeywords];
                const lastKeywords = mergedKeywords.filter((item, index) => mergedKeywords.indexOf(item) === index);
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
        <View style={addKeywordInWriteStyles.container}>
            <StatusBar backgroundColor={colors.BACKGROUND_DEFAULT} />
            <HeaderMolecule
                title="키워드 설정"
                isPaddingHorizontal={false}
                backHandler={stepMoveHandler}
                isNextStep={step === 2}
                headerFinish={false}
                finishText=""
                background="undefined"
            />
            <Spacer height={10} />
            {step === 1 && (
                <View>
                    <LinearGradient colors={['#F9F9F9', '#F9F9F900']} style={addKeywordInWriteStyles.upLinear} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Spacer height={16} />
                            <View style={addKeywordInWriteStyles.keywordListBox}>
                                <SemiBoldText text="이슈" color={colors.BLACK} size={16} />
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
                                checkBorderColor={colors.VIOLET}
                                checkBackColor="#F1E9FF"
                            />
                        </View>
                        <Spacer height={29} />

                        <View>
                            <View style={addKeywordInWriteStyles.keywordListBox}>
                                <SemiBoldText text="교통수단" color={colors.BLACK} size={16} />
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
                                checkBorderColor={colors.VIOLET}
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
                                    checkBorderColor={colors.VIOLET}
                                    checkBackColor="#F1E9FF"
                                />
                            )}
                        </View>
                        <Spacer height={200} />
                    </ScrollView>
                </View>
            )}

            {step === 2 && (
                <View>
                    <SemiBoldText text="선택하신 이슈 키워드 중" color={colors.BLACK} size={16} />
                    <SemiBoldText text="사건을 대표하는 키워드를 1개 선택해주세요" color={colors.BLACK} size={16} />
                    <Spacer height={21} />
                    <KeywordsList
                        type="HEAD"
                        list={chooseIssueList}
                        isCheck={checkHead}
                        checkKeywordHandler={checkingKeywordHandler}
                        checkTextColor={colors.WHITE}
                        checkBorderColor={colors.VIOLET}
                        checkBackColor={colors.VIOLET}
                    />
                </View>
            )}

            <View style={addKeywordInWriteStyles.nextBottonBox}>
                <LinearGradient colors={['#F9F9F900', '#F9F9F9']} style={addKeywordInWriteStyles.downLinear} />
                <TextButton
                    onPress={stepHandler}
                    text={step === 1 ? '다음' : '완료'}
                    height={48}
                    backgroundColor={
                        (checkedKeywords.length > 0 && step === 1) || (headKeyword.length > 0 && step === 2)
                            ? colors.BLACK
                            : colors.BTN_GRAY
                    }
                    fontColor={colors.WHITE}
                    fontWeight="semiBold"
                    fontSize={17}
                    borderRadius={5}
                />
            </View>
        </View>
    );
};

export default AddKeywordInWrite;
