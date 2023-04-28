import React, { useRef } from 'react';
import { Animated, PanResponder, View } from 'react-native';
import { nearbyPostListModalStyles } from '../../styles/styles';
import SemiBoldText from '../smallest/SemiBoldText';
import Colors from '../../styles/Colors';
import { hegithPercentage } from '../../utils/changeStyleSize';

const NearbyPostListModal = () => {
    const modalHeight = hegithPercentage(560);

    const animation = useRef(new Animated.Value(0)).current;
    const animationRef = useRef('mini');
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const { dy } = gestureState;
                if (animationRef.current === 'mini') {
                    animation.setValue(-dy);
                }
                if (animationRef.current === 'full') {
                    animation.setValue(modalHeight - dy);
                }
            },
            onPanResponderEnd: (event, gestureState) => {
                const { dy } = gestureState;

                if (dy < -100 && animationRef.current === 'mini') {
                    Animated.spring(animation, {
                        toValue: modalHeight,
                        useNativeDriver: false,
                    }).start();
                    animationRef.current = 'full';
                }

                if (dy > -100 && animationRef.current === 'mini') {
                    Animated.spring(animation, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }

                if (dy > 100 && animationRef.current === 'full') {
                    Animated.spring(animation, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                    animationRef.current = 'mini';
                }
                if (dy < 100 && animationRef.current === 'full') {
                    Animated.spring(animation, {
                        toValue: modalHeight,
                        useNativeDriver: false,
                    }).start();
                }
            },
        }),
    ).current;

    return (
        <>
            <Animated.View
                style={[
                    nearbyPostListModalStyles.grayBackground,
                    {
                        opacity: animation.interpolate({
                            inputRange: [0, modalHeight],
                            outputRange: [0, 0.6],
                        }),
                    },
                ]}
            />
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    nearbyPostListModalStyles.container,
                    {
                        height: animation.interpolate({
                            inputRange: [0, 100],
                            outputRange: [87, 187],
                        }),
                    },
                ]}>
                <View style={nearbyPostListModalStyles.slideBarBox}>
                    <View style={nearbyPostListModalStyles.slideBar} />
                </View>

                <View style={nearbyPostListModalStyles.titleBox}>
                    <SemiBoldText text="유저이름님 주변에서 일어나고 있는 일" color={Colors.BLACK} size={18} />
                </View>

                <View
                    style={{
                        height: 800,
                    }}>
                    <SemiBoldText text="게시글" color={Colors.BLACK} size={18} />
                </View>
            </Animated.View>
        </>
    );
};

export default NearbyPostListModal;
