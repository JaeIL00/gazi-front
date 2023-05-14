import React, { useState } from 'react';
import { Image, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import WebViewComponent from '../../organisms/WebViewComponent';
import { PoliciesTemplateProps } from '../../../types/types';
import { PoliciesTemplateStyles } from '../../../styles/styles';

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
                    <Image
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={PoliciesTemplateStyles.headerIcon}
                    />
                </TouchButton>
                <Spacer width={21} />
                <MediumText text="약관 및 정책" size={18} color={Colors.BLACK} />
            </View>
            <View style={PoliciesTemplateStyles.tabBox}>
                <TouchButton onPress={() => webViewHandler('SERVICE')}>
                    <View style={PoliciesTemplateStyles.buttonBox}>
                        <NormalText text="서비스 이용약관" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={PoliciesTemplateStyles.tabBox}>
                <TouchButton onPress={() => webViewHandler('PRIVATE')}>
                    <View style={PoliciesTemplateStyles.buttonBox}>
                        <NormalText text="개인정보 처리방침" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={PoliciesTemplateStyles.tabBox}>
                <TouchButton onPress={() => webViewHandler('LOACTION')}>
                    <View style={PoliciesTemplateStyles.buttonBox}>
                        <NormalText text="위치기반서비스" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            {uri && (
                <View style={PoliciesTemplateStyles.webviewBox}>
                    <WebViewComponent uri={uri} closeHandler={seturi} />
                </View>
            )}
        </View>
    );
};

export default PoliciesTemplate;
