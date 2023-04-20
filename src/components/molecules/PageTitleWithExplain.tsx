import React from 'react';
import { View } from 'react-native';
import PageTitle from '../smallest/PageTitle';
import GrayText from '../smallest/GrayText';
import { PageTitleWithExplainProps } from '../../types/types';
import Space from '../smallest/Space';

const PageTitleWithExplain = ({ oneTitle, twoTitle, explainText, explainSize }: PageTitleWithExplainProps) => {
    return (
        <View>
            <View>
                <PageTitle title={oneTitle} />
                {twoTitle && <PageTitle title={twoTitle} />}
            </View>
            <Space height={10} />
            {explainText && explainSize && <GrayText text={explainText} size={explainSize} />}
        </View>
    );
};

export default PageTitleWithExplain;
