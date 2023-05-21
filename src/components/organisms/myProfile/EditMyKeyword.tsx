import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import KeywordsList from '../KeywordsList';
import Colors from '../../../styles/Colors';
import BoldText from '../../smallest/BoldText';
import TextButton from '../../molecules/TextButton';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import useCheckKeyword from '../../../utils/hooks/useCheckKeyword';
import { userTokenAtom } from '../../../store/atoms';
import { EditMyKeywordProps } from '../../../types/types';
import { editMyKeywordStyles } from '../../../styles/styles';
import { screenHeight } from '../../../utils/changeStyleSize';
import { editMyLikeKeywordsAPI } from '../../../queries/api';
import { issueKeywordsNotEtc, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';

const EditMyKeyword = ({
    myKeywordList,
    checkInitTraffic,
    checkInitSubway,
    checkInitIssue,
    controlEditWindowHandler,
    getMyKeywordRefetch,
}: EditMyKeywordProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);

    // Initialized check keywords
    const [checkIssue, setCheckIssue] = useState<boolean[]>(checkInitIssue);
    const [checkSubway, setCheckSubway] = useState<boolean[]>(checkInitSubway);
    const [checkTraffic, setCheckTraffic] = useState<boolean[]>(checkInitTraffic);

    // Custom hook useCheckKeyword
    const { checkedKeywords, checkedKeywordsHandler } = useCheckKeyword();

    // Edit keyword API
    const { mutate, isLoading } = useMutation(editMyLikeKeywordsAPI, {
        onSuccess: () => {
            successEdit();
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) Edit keyword API.', response);
        },
    });
    // Init checked
    const checkMyKeyword = () => {
        let checkedIndexTraffic: number[] = [];
        let checkedIndexIssue: number[] = [];
        let checkedIndexSubway: number[] = [];
        const freshTraffic = [...checkTraffic];
        const freshIssue = [...checkIssue];
        const freshSubway = [...checkSubway];
        for (const index in myKeywordList) {
            if (myKeywordList[index].id === 10 || myKeywordList[index].id === 11) {
                const checkIndex = trafficKeywords.findIndex(item => item.id === myKeywordList[index].id);
                checkedIndexTraffic = [...checkedIndexTraffic, checkIndex];
            } else if (myKeywordList[index].id >= 1 && myKeywordList[index].id <= 8) {
                const checkIndex = issueKeywordsNotEtc.findIndex(item => item.id === myKeywordList[index].id);
                checkedIndexIssue = [...checkedIndexIssue, checkIndex];
            } else if (myKeywordList[index].id >= 13 && myKeywordList[index].id <= 35) {
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

    // Reset check of keyword
    const resetCheckedHandler = () => {
        setCheckTraffic(Array.from(Array(3), () => false));
        setCheckSubway(Array.from(Array(24), () => false));
        setCheckIssue(Array.from(Array(28), () => false));
    };

    // My keyword API success
    const successEdit = async () => {
        await getMyKeywordRefetch();
        controlEditWindowHandler('BACK');
    };
    const putNewKeywordList = () => {
        let addKeywords: number[] = [];
        let deleteKeywords: number[] = [];
        const freshmyKeywordList = myKeywordList.map(item => item.id);
        for (const index in checkedKeywords) {
            const isSame = freshmyKeywordList.includes(checkedKeywords[index]);
            if (!isSame) {
                addKeywords = [...addKeywords, checkedKeywords[index]];
            }
        }
        for (const index in freshmyKeywordList) {
            const isSame = checkedKeywords.includes(freshmyKeywordList[index]);
            if (!isSame) {
                deleteKeywords = [...deleteKeywords, freshmyKeywordList[index]];
            }
        }
        mutate({
            accessToken,
            addKeywordIdList: addKeywords,
            deleteKeywordIdList: deleteKeywords,
        });
    };

    // Init checking
    useLayoutEffect(() => {
        checkMyKeyword();
    }, [myKeywordList]);

    // Check keyword
    useEffect(() => {
        // Traffic subway keword check
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
                            checkBackColor="#F1E9FF"
                            trafficKeywordColor="#7949C6"
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
                <TouchButton onPress={resetCheckedHandler} paddingHorizontal={7}>
                    <View style={editMyKeywordStyles.resetText}>
                        <Icons type="feather" name="refresh-cw" size={17} color={Colors.TXT_GRAY} />
                        <Spacer width={3} />
                        <View style={editMyKeywordStyles.borderLine}>
                            <BoldText text="선택초기화" size={13} color={Colors.TXT_GRAY} />
                        </View>
                    </View>
                </TouchButton>
                <TextButton
                    onPress={putNewKeywordList}
                    text="선택완료"
                    fontSize={17}
                    textColor={Colors.WHITE}
                    backgroundColor={Colors.BLACK}
                    paddingHorizontal={83.5}
                    paddingVertical={11}
                    alignSelf="stretch"
                />
            </View>
            {isLoading && <ActivityIndicator size="large" />}
        </>
    );
};

export default EditMyKeyword;
