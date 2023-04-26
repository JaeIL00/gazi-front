import React from 'react';
import { ScrollView, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import SemiBoldText from '../../smallest/SemiBoldText';
import KeywordsList from '../../organisms/KeywordsList';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import { issueKeywords, trafficKeywords } from '../../../utils/allKeywords';

const InitLikeKeywordTemplate = () => {
    return (
        <View>
            <MoveBackWithPageTitle
                oneTitle="관심있는 키워드를"
                twoTitle="세대 이상 골라주세요"
                explainText="선택한 키워드가 포함된 스레드가 상단에 표시됩니다."
                explainSize={13}
                onPress={() => {}}
            />

            <Spacer height={35} />

            <SemiBoldText text="교통수단" color={Colors.BLACK} size={18} />
            <KeywordsList list={trafficKeywords} />
            <SemiBoldText text="이슈" color={Colors.BLACK} size={18} />
            <KeywordsList list={issueKeywords} />
        </View>
    );
};
export default InitLikeKeywordTemplate;
