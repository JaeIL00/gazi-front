import React from 'react';
import { View } from 'react-native';
import PageTitle from '../smallest/PageTitle';
import GrayText from '../smallest/GrayText';
import { PageTitleWithExplainProps } from '../../types/types';
import Spacer from '../smallest/Spacer';

const PageTitleWithExplain = ({ oneTitle, twoTitle, explainText, explainSize }: PageTitleWithExplainProps) => {
    return (
        <View>
            <View>
                <PageTitle title={oneTitle} />
                {twoTitle && <PageTitle title={twoTitle} />}
            </View>
            <Spacer height={10} />
            {explainText && explainSize && <GrayText text={explainText} size={explainSize} />}
        </View>
    );
};

export default PageTitleWithExplain;
