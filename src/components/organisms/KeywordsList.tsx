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
    trafficKeywordColor,
    checkTextColor,
    checkBorderColor,
    checkBackColor,
}: KeywordsListProps) => {
    const HEAD_KEYWORD = 'HEAD';
    const SUBWAY_KEYWORD = 'SUBWAY';
    const PURPLE = '#7949C6';
    const LIGHT_PURPLE = '#F1E9FF';

    return (
        <ScrollView contentContainerStyle={keywordsListStyles.container}>
            {list.map((item, index) => (
                <View key={item.id} style={keywordsListStyles.itemBox}>
                    <TouchButton
                        onPress={() => {
                            checkKeywordHandler(type, index, item.id);
                        }}
                        borderColor={
                            isCheck[index] ? checkBorderColor : type === HEAD_KEYWORD ? Colors.VIOLET : Colors.TXT_GRAY
                        }
                        borderRadius={30}
                        borderWidth={1.1}
                        paddingHorizontal={14}
                        paddingVertical={8}
                        backgroundColor={
                            item.keywordName === '지하철' && isCheck[index]
                                ? Colors.WHITE
                                : isCheck[index]
                                ? checkBackColor
                                : type === HEAD_KEYWORD
                                ? LIGHT_PURPLE
                                : Colors.WHITE
                        }>
                        <>
                            {type === SUBWAY_KEYWORD && (
                                <NormalText
                                    text={item.keywordName}
                                    color={isCheck[index] ? checkTextColor : Colors.TXT_GRAY}
                                    size={16}
                                />
                            )}
                            {type !== SUBWAY_KEYWORD && (
                                <NormalText
                                    text={item.keywordName}
                                    color={
                                        item.keywordName === '지하철' && isCheck[index]
                                            ? trafficKeywordColor!
                                            : isCheck[index]
                                            ? checkTextColor
                                            : type === HEAD_KEYWORD
                                            ? PURPLE
                                            : Colors.TXT_GRAY
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
