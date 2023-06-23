import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { keywordAlarmTemplateStyles } from '../../../styles/styles';
import { KeywordAlarmTemplateProps } from '../../../types/types';
import { useQuery } from 'react-query';
import { getMyLikeKeywordsAPI } from '../../../queries/api';
import { useRecoilValue } from 'recoil';
import { userAuthAtom } from '../../../store/atoms';
import { useIsFocused } from '@react-navigation/native';

const KeywordAlarmTemplate = ({ navigationHandler }: KeywordAlarmTemplateProps) => {
    const isFocus = useIsFocused();

    const { accessToken } = useRecoilValue(userAuthAtom);

    const [keywordsLength, setKeywordsLength] = useState(0);

    // Get my liked keywords
    const { refetch: myKeywordsRefetch } = useQuery('getMyLikeKeyword', () => getMyLikeKeywordsAPI(accessToken), {
        enabled: false,
        onSuccess: ({ data }) => {
            setKeywordsLength(data.data.length);
        },
        onError: () => {},
    });

    useLayoutEffect(() => {
        if (isFocus) {
            myKeywordsRefetch();
        }
    }, [isFocus]);
    return (
        <View>
            <View style={keywordAlarmTemplateStyles.headerBox}>
                <MediumText text={`알림 받는 키워드 ${keywordsLength}개`} size={14} color={Colors.BLACK} />
                <TouchButton
                    onPress={navigationHandler}
                    paddingHorizontal={16}
                    paddingVertical={8}
                    backgroundColor="#F2F2F2">
                    <SemiBoldText text="설정" size={13} color={Colors.BLACK} />
                </TouchButton>
            </View>
        </View>
    );
};

export default KeywordAlarmTemplate;
