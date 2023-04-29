import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View } from 'react-native';

import Colors from '../../styles/Colors';
import SemiBoldText from '../smallest/SemiBoldText';
import { nearbyPostListModalStyles } from '../../styles/styles';

const NearbyPostListModal = () => {
    const [isBack, setIsBack] = useState(false);

    const animValue = useRef(new Animated.Value(0)).current;
    const animType = useRef('mini');
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const { dy } = gestureState;

                if (dy > -700 && animType.current === 'mini') {
                    animValue.setValue(dy);
                    setIsBack(true);
                }
                if (animType.current === 'full') {
                    animValue.setValue(-640 + dy);
                }
            },
            onPanResponderEnd: (event, gestureState) => {
                const { dy } = gestureState;

                if (dy < -100 && animType.current === 'mini') {
                    Animated.spring(animValue, {
                        toValue: -640,
                        useNativeDriver: false,
                    }).start();
                    animType.current = 'full';
                }

                if (dy > -100 && animType.current === 'mini') {
                    Animated.spring(animValue, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }

                if (dy > 100 && animType.current === 'full') {
                    Animated.spring(animValue, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                    animType.current = 'mini';
                }
                if (dy < 100 && animType.current === 'full') {
                    Animated.spring(animValue, {
                        toValue: -640,
                        useNativeDriver: false,
                    }).start();
                }
            },
        }),
    ).current;

    useEffect(() => {
        const subscriptionAnim = animValue.addListener(({ value }) => {
            if (value < 10) {
                setIsBack(false);
            }
        });

        return () => {
            animValue.removeListener(subscriptionAnim);
        };
    }, [animValue]);

    return (
        <>
            {isBack && (
                <Animated.View
                    style={[
                        nearbyPostListModalStyles.grayBackground,
                        {
                            opacity: animValue.interpolate({
                                inputRange: [0, 640],
                                outputRange: [0, 0.6],
                            }),
                        },
                    ]}
                />
            )}

            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    nearbyPostListModalStyles.container,
                    {
                        transform: [
                            {
                                translateY: animValue.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [680, 780],
                                }),
                            },
                        ],
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
