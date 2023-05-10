import React from 'react';
import { ScrollView, View } from 'react-native';

import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import TouchButton from '../smallest/TouchButton';
import { KeywordsListProps } from '../../types/types';
import { keywordsListStyles } from '../../styles/styles';

const KeywordsList = ({
    type,
    list,
    isCheck,
    checkKeywordHandler,
    checkTextColor,
    checkBorderColor,
    checkBackColor,
}: KeywordsListProps) => {
    return (
        <ScrollView contentContainerStyle={keywordsListStyles.container}>
            {list.map((item, index) => (
                <View key={item.id} style={keywordsListStyles.itemBox}>
                    <TouchButton
                        onPress={() => {
                            checkKeywordHandler(type, index, item.id);
                        }}
                        borderColor={
                            isCheck[index] ? checkBorderColor : type === 'HEAD' ? Colors.VIOLET : Colors.TXT_GRAY
                        }
                        borderRadius={30}
                        borderWidth={1.1}
                        paddingHorizontal={14}
                        paddingVertical={8}
                        backgroundColor={isCheck[index] ? checkBackColor : type === 'HEAD' ? '#F1E9FF' : Colors.WHITE}>
                        <>
                            {type === 'SUBWAY' && (
                                <NormalText
                                    text={item.keywordName}
                                    color={isCheck[index] ? checkTextColor : Colors.TXT_GRAY}
                                    size={16}
                                />
                            )}
                            {type !== 'SUBWAY' && (
                                <NormalText
                                    text={item.keywordName}
                                    color={
                                        isCheck[index] ? checkTextColor : type === 'HEAD' ? '#7949C6' : Colors.TXT_GRAY
                                    }
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
