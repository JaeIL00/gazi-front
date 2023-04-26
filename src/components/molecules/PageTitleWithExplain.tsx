import React from 'react';
import { View } from 'react-native';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import PageTitle from '../smallest/PageTitle';
import NormalText from '../smallest/NormalText';
import { PageTitleWithExplainProps } from '../../types/types';

const PageTitleWithExplain = ({ oneTitle, twoTitle, explainText, explainSize }: PageTitleWithExplainProps) => {
    return (
        <View>
            <View>
                <PageTitle title={oneTitle} />
                {twoTitle && <PageTitle title={twoTitle} />}
            </View>

            {explainText && explainSize && (
                <>
                    <Spacer height={10} />
                    <NormalText text={explainText} size={explainSize} color={Colors.TXT_GRAY} />
                </>
            )}
        </View>
    );
};

export default PageTitleWithExplain;
