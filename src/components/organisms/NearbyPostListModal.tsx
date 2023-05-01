import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View } from 'react-native';

import Colors from '../../styles/Colors';
import SemiBoldText from '../smallest/SemiBoldText';
import { nearbyPostListModalStyles } from '../../styles/styles';

const FULL_VALUE = -640;
const MINI_VALUE = 0;

const NearbyPostListModal = () => {
    // The trigger of modal background
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal animation handling
    const animRef = useRef(new Animated.Value(0)).current;
    const opacityRef = useRef(new Animated.Value(0)).current;
    const animType = useRef('mini');
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const { dy } = gestureState;
                if (dy > -700 && animType.current === 'mini') {
                    animRef.setValue(dy);
                    opacityRef.setValue(-dy);
                    setIsModalOpen(true);
                }
                if (animType.current === 'full') {
                    animRef.setValue(FULL_VALUE + dy);
                    opacityRef.setValue(-FULL_VALUE - dy);
                }
            },
            onPanResponderEnd: (event, gestureState) => {
                const { dy } = gestureState;
                if (dy < -100 && animType.current === 'mini') {
                    Animated.spring(animRef, {
                        toValue: FULL_VALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: -FULL_VALUE,
                        useNativeDriver: true,
                    }).start();
                    animType.current = 'full';
                }
                if (dy > -100 && animType.current === 'mini') {
                    Animated.spring(animRef, {
                        toValue: MINI_VALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: MINI_VALUE,
                        useNativeDriver: true,
                    }).start();
                }
                if (dy > 100 && animType.current === 'full') {
                    Animated.spring(animRef, {
                        toValue: MINI_VALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: MINI_VALUE,
                        useNativeDriver: true,
                    }).start();
                    animType.current = 'mini';
                }
                if (dy < 100 && animType.current === 'full') {
                    Animated.spring(animRef, {
                        toValue: FULL_VALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: -FULL_VALUE,
                        useNativeDriver: true,
                    }).start();
                }
            },
        }),
    ).current;
    useEffect(() => {
        const subscriptionAnim = opacityRef.addListener(({ value }) => {
            if (value < 10) {
                setIsModalOpen(false);
            }
        });
        return () => {
            animRef.removeListener(subscriptionAnim);
        };
    }, [animRef]);

    return (
        <>
            {isModalOpen && (
                <Animated.View
                    style={[
                        nearbyPostListModalStyles.grayBackground,
                        {
                            opacity: opacityRef.interpolate({
                                inputRange: [0, -FULL_VALUE],
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
                                translateY: animRef.interpolate({
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
                    <SemiBoldText text="00님 주변에서 일어나고 있는 일" color={Colors.BLACK} size={18} />
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
