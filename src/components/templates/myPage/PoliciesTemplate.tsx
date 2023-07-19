import React, { useState } from 'react';
import { Modal, View } from 'react-native';

import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import MediumText from '../../atoms/MediumText';
import TouchButton from '../../atoms/TouchButton';
import WebViewComponent from '../../organisms/WebViewComponent';
import { PoliciesTemplateStyles } from '../../../styles/templates/styles';
import FastImage from 'react-native-fast-image';
import { PoliciesTemplateProps } from '../../../types/templates/types';

const PoliciesTemplate = ({ moveToBackScreenHandler }: PoliciesTemplateProps) => {
    const [uri, seturi] = useState<string>('');
    const webViewHandler = (state: string) => {
        switch (state) {
            case 'SERVICE':
                seturi('https://gilded-turn-6c9.notion.site/ver-1-10f4eab4c1c842cab3539cdd013dc0c7');
                break;
            case 'PRIVATE':
                seturi('https://gilded-turn-6c9.notion.site/ver-1-6992d062c19a466aaf4e37db4df2498b');
                break;
            case 'LOACTION':
                seturi('https://gilded-turn-6c9.notion.site/ver-1-9eabbc4300464d07adc940a1c7c33840');
                break;
            default:
                // For Debug
                console.log('(ERROR) WebView Handler.', state);
        }
    };
    return (
        <View style={PoliciesTemplateStyles.container}>
            <View style={PoliciesTemplateStyles.headerBox}>
                <TouchButton onPress={moveToBackScreenHandler} hitSlop={20}>
                    <FastImage
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={PoliciesTemplateStyles.headerIcon}
                    />
                </TouchButton>
                <Spacer width={21} />
                <MediumText text="약관 및 정책" size={18} color={colors.BLACK} />
            </View>
            <View style={PoliciesTemplateStyles.tabBox}>
                <TouchButton onPress={() => webViewHandler('SERVICE')}>
                    <View style={PoliciesTemplateStyles.buttonBox}>
                        <NormalText text="서비스 이용약관" size={16} color={colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={PoliciesTemplateStyles.tabBox}>
                <TouchButton onPress={() => webViewHandler('PRIVATE')}>
                    <View style={PoliciesTemplateStyles.buttonBox}>
                        <NormalText text="개인정보 처리방침" size={16} color={colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={PoliciesTemplateStyles.tabBox}>
                <TouchButton onPress={() => webViewHandler('LOACTION')}>
                    <View style={PoliciesTemplateStyles.buttonBox}>
                        <NormalText text="위치기반서비스" size={16} color={colors.BLACK} />
                    </View>
                </TouchButton>
            </View>

            <Modal visible={uri.length > 0} onRequestClose={() => seturi('')}>
                <WebViewComponent uri={uri} closeHandler={seturi} />
            </Modal>
        </View>
    );
};

export default PoliciesTemplate;
