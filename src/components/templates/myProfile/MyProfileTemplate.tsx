import React from 'react';
import { Image, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { myProfileTemplateStyles } from '../../../styles/styles';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const MyProfileTemplate = () => {
    return (
        <View style={myProfileTemplateStyles.container}>
            <View style={myProfileTemplateStyles.profileBox}>
                <TouchButton
                    onPress={() => {}}
                    width={63}
                    height={(63 / screenHeight) * screenWidth}
                    backgroundColor="#D9D9D9"
                    borderRadius={63}>
                    {/* <Image /> */}
                    <View style={myProfileTemplateStyles.profileCameraBox}>
                        <Icons type="feather" name="camera" color="#D9D9D9" size={12} />
                    </View>
                </TouchButton>
                <View style={myProfileTemplateStyles.profileTextBox}>
                    <View style={myProfileTemplateStyles.profileNameBox}>
                        <SemiBoldText text="가나다라마바사아자차카타" size={16} color={Colors.WHITE} />
                        <Image
                            source={require('../../../assets/icons/pencil.png')}
                            style={myProfileTemplateStyles.penIcon}
                        />
                    </View>
                    <NormalText text="asfda@naver.com" size={12} color={Colors.TXT_GRAY} />
                </View>
            </View>
        </View>
    );
};
export default MyProfileTemplate;
