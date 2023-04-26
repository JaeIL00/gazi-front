import React from 'react';
import { ScrollView, View } from 'react-native';

import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import { KeywordsListProps } from '../../types/types';
import { keywordsListStyles } from '../../styles/styles';

const KeywordsList = ({ list }: KeywordsListProps) => {
    return (
        <ScrollView contentContainerStyle={keywordsListStyles.container}>
            {list.map(item => (
                <View key={item.id} style={keywordsListStyles.itemBox}>
                    <NormalText text={item.keywordName} color={Colors.TXT_GRAY} size={16} />
                </View>
            ))}
        </ScrollView>
    );
};

export default KeywordsList;
