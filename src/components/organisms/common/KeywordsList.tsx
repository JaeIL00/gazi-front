import React from 'react';
import { ScrollView, View } from 'react-native';

import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import { keywordsListStyles } from '../../../styles/organisms/styles';
import { KeywordsListProps } from '../../../types/organisms/types';

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
                            isCheck[index] ? checkBorderColor : type === HEAD_KEYWORD ? colors.VIOLET : colors.TXT_GRAY
                        }
                        borderRadius={30}
                        borderWidth={1.1}
                        paddingHorizontal={14}
                        paddingVertical={8}
                        backgroundColor={
                            item.keywordName === '지하철' && isCheck[index]
                                ? colors.WHITE
                                : isCheck[index]
                                ? checkBackColor
                                : type === HEAD_KEYWORD
                                ? LIGHT_PURPLE
                                : colors.WHITE
                        }>
                        <>
                            {type === SUBWAY_KEYWORD && (
                                <NormalText
                                    text={item.keywordName}
                                    color={isCheck[index] ? checkTextColor : colors.TXT_GRAY}
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
                                            : colors.TXT_GRAY
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
