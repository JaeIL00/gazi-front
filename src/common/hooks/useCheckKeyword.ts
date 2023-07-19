import { useCallback, useState } from 'react';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../common/constants/allKeywords';
import { KeywordListTypes } from '../../types/common/types';

const useCheckKeyword = () => {
    // Initialized check keywords
    const [checkHead, setCheckHead] = useState<boolean[]>([]);
    const [checkIssue, setCheckIssue] = useState<boolean[]>([]);
    const [checkSubway, setCheckSubway] = useState<boolean[]>([]);
    const [checkTraffic, setCheckTraffic] = useState<boolean[]>([]);
    const [checkedKeywords, setCheckedKeywords] = useState<number[]>([]);

    const checkingInitialize = useCallback(() => {
        let newCheckIssue: boolean[] = Array(issueKeywords.length).fill(false);
        let newCheckSubway: boolean[] = Array(subwayKeywords.length).fill(false);
        let newCheckTraffic: boolean[] = Array(trafficKeywords.length).fill(false);
        setCheckIssue(newCheckIssue);
        setCheckSubway(newCheckSubway);
        setCheckTraffic(newCheckTraffic);
    }, [setCheckIssue, setCheckSubway, setCheckTraffic]);

    // check Keyword Handling
    const checkingKeywordHandler = (list: string, index: number, id: number) => {
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
                const freshHead = copyHead.map(() => false);
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
    const checkedKeywordsHandler = useCallback(
        (list: KeywordListTypes[], isChecked: boolean[]) => {
            const getId = list.map((item, index) => {
                if (item.id !== 9999 && item.id !== 9998 && isChecked[index]) {
                    return item.id;
                }
            });
            const cleanType = getId.filter(item => item !== undefined) as number[];
            setCheckedKeywords(cleanType);
        },
        [setCheckedKeywords],
    );

    // Keyword setState handler
    const keywordSetStateHandler = useCallback(
        (keyword: string, checkedList: boolean[]) => {
            switch (keyword) {
                case 'TRAFFIC':
                    setCheckTraffic(checkedList);
                    break;
                case 'SUBWAY':
                    setCheckSubway(checkedList);
                    break;
                case 'ISSUE':
                    setCheckIssue(checkedList);
                    break;
                case 'HEAD':
                    setCheckHead(checkedList);
                    break;
                default:
                    // For Debug
                    console.log('(ERROR) check Keyword Handling. listname:', keyword, checkedList);
                    return;
            }
        },
        [setCheckTraffic, setCheckSubway, setCheckIssue, setCheckHead],
    );

    return {
        checkHead,
        checkIssue,
        checkSubway,
        checkTraffic,
        checkedKeywords,
        checkingInitialize,
        checkingKeywordHandler,
        keywordSetStateHandler,
        checkedKeywordsHandler,
    };
};

export default useCheckKeyword;
