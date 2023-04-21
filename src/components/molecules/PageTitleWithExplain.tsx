import React from 'react';
import { View } from 'react-native';
import PageTitle from '../smallest/PageTitle';
import { PageTitleWithExplainProps } from '../../types/types';
import Spacer from '../smallest/Spacer';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NormalText from '../smallest/NormalText';

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
