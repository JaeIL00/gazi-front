import React from 'react';
import { ScrollView, View } from 'react-native';

import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import TouchButton from '../smallest/TouchButton';
import { KeywordsListProps } from '../../types/types';
import { keywordsListStyles } from '../../styles/styles';

const KeywordsList = ({ type, list, isCheck, checkKeywordHandler }: KeywordsListProps) => {
    return (
        <ScrollView contentContainerStyle={keywordsListStyles.container}>
            {list.map((item, index) => (
                <View key={item.id} style={keywordsListStyles.itemBox}>
                    <TouchButton
                        onPress={() => {
                            checkKeywordHandler(type, index, item.id);
                        }}
                        borderColor={isCheck[index] ? Colors.BLACK : Colors.TXT_GRAY}
                        borderRadius={30}
                        borderWidth={1.1}
                        paddingHorizontal={14}
                        paddingVertical={8}
                        backgroundColor={type === 'SUBWAY' && isCheck[index] ? Colors.BLACK : undefined}>
                        <>
                            {type === 'SUBWAY' && (
                                <NormalText
                                    text={item.keywordName}
                                    color={isCheck[index] ? Colors.WHITE : Colors.TXT_GRAY}
                                    size={16}
                                />
                            )}
                            {type !== 'SUBWAY' && (
                                <NormalText
                                    text={item.keywordName}
                                    color={isCheck[index] ? Colors.BLACK : Colors.TXT_GRAY}
                                    size={16}
                                />
                            )}
                        </>
                    </TouchButton>
                </View>
            ))}
        </ScrollView>
    );
};

export default KeywordsList;
