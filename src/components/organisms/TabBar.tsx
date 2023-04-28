import React from 'react';
import TouchButton from '../smallest/TouchButton';
import { Image, View } from 'react-native';
import NormalText from '../smallest/NormalText';
import { TabBarProps } from '../../types/types';
import Colors from '../../styles/Colors';
import Spacer from '../smallest/Spacer';
import { tabBarStyles } from '../../styles/styles';

const blurImageList = [
    require('../../assets/icons/chat-outline.png'),
    require('../../assets/icons/map-outline.png'),
    require('../../assets/icons/human-outline.png'),
];
const focusImageList = [
    require('../../assets/icons/chat-fill.png'),
    require('../../assets/icons/map-fill.png'),
    require('../../assets/icons/human-fill.png'),
];

const TabBar = ({ state, navigation }: TabBarProps) => {
    return (
        <View style={tabBarStyles.container}>
            {state.routes.map((route, index) => {
                const label = route.name === 'ServiceHome' ? '지도' : route.name === 'Community' ? '커뮤니티' : '마이';

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
                    <TouchButton flex={1} onPress={onPress}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={isFocused ? focusImageList[index] : blurImageList[index]}
                                style={tabBarStyles.image}
                            />
                            <Spacer height={5} />
                            <NormalText text={label} color={isFocused ? Colors.VIOLET : '#7E7E7E'} size={10} />
                        </View>
                    </TouchButton>
                );
            })}
        </View>
    );
};

export default TabBar;
