import React from 'react';
import { View } from 'react-native';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import { PageTitleWithExplainProps } from '../../types/types';
import BoldText from '../smallest/BoldText';

const PageTitleWithExplain = ({ oneTitle, twoTitle, explainText, explainSize }: PageTitleWithExplainProps) => {
    return (
        <View>
            <View>
                <BoldText text={oneTitle} size={24} color={Colors.BLACK} />
                {twoTitle && <BoldText text={twoTitle} size={24} color={Colors.BLACK} />}
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
