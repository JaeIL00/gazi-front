import React from 'react';
import { View } from 'react-native';

import Spacer from '../atoms/Spacer';
import colors from '../../common/constants/colors';
import NormalText from '../atoms/NormalText';
import { PageTitleWithExplainProps } from '../../types/molecules/types';
import BoldText from '../atoms/BoldText';

const PageTitleWithExplain = ({ oneTitle, twoTitle, explainText, explainSize }: PageTitleWithExplainProps) => {
    return (
        <View>
            <View>
                <BoldText text={oneTitle} size={24} color={colors.BLACK} />
                {twoTitle && <BoldText text={twoTitle} size={24} color={colors.BLACK} />}
            </View>

            {explainText && explainSize && (
                <>
                    <Spacer height={10} />
                    <NormalText text={explainText} size={explainSize} color={colors.TXT_GRAY} />
                </>
            )}
        </View>
    );
};

export default PageTitleWithExplain;
