import React from 'react';
import { Image, View } from 'react-native';

import Spacer from '../../atoms/Spacer';
import colors from '../../../constants/colors';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import { tabBarStyles } from '../../../styles/organisms/styles';
import { TabBarProps } from '../../../types/common/types';

const blurImageList = [
    require('../../../assets/icons/chat-outline.png'),
    require('../../../assets/icons/map-outline.png'),
    require('../../../assets/icons/human-outline.png'),
];
const focusImageList = [
    require('../../../assets/icons/chat-fill.png'),
    require('../../../assets/icons/map-fill.png'),
    require('../../../assets/icons/human-fill.png'),
];

const TabBar = ({ state, navigation }: TabBarProps) => {
    return (
        <View style={tabBarStyles.container}>
            {state.routes.map((route, index) => {
                let label: string = '';
                switch (route.name) {
                    case 'MapHome':
                        label = '지도';
                        break;
                    case 'Community':
                        label = '커뮤니티';
                        break;
                    case 'MyPage':
                        label = '마이';
                        break;
                    case 'AlarmPage':
                        label = '알림';
                        break;
                    default:
                        // For Debug
                        console.log('(ERROR) TabBar component route name.', route.name);
                        break;
                }

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchButton key={route.key} flex={1} onPress={onPress}>
                        <View style={tabBarStyles.contentBox}>
                            <Image
                                source={isFocused ? focusImageList[index] : blurImageList[index]}
                                style={tabBarStyles.image}
                            />
                            <Spacer height={5} />
                            <NormalText text={label} color={isFocused ? colors.VIOLET : '#7E7E7E'} size={10} />
                        </View>
                    </TouchButton>
                );
            })}
        </View>
    );
};

export default TabBar;
