import React from 'react';
import { View } from 'react-native';
import BoldText from '../../smallest/BoldText';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';

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
        </View>
    );
};
export default InitLikeKeywordTemplate;
