import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, PanResponder, View } from 'react-native';

import dummy from '../../utils/dummy';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import PostListItem from './PostListItem';
import SemiBoldText from '../smallest/SemiBoldText';
import { nearbyPostListModalStyles } from '../../styles/styles';

const FULL_VALUE = -640;
const MINI_VALUE = 0;

const NearbyPostListModal = () => {
    // The trigger of modal background
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal animation handling
    const isTouchingList = useRef(false);
    const animRef = useRef(new Animated.Value(0)).current;
    const opacityRef = useRef(new Animated.Value(0)).current;
    const animType = useRef('mini');
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const { dy } = gestureState;
                console.log(dy);
                if (dy > -700 && animType.current === 'mini' && isTouchingList) {
                    animRef.setValue(dy);
                    opacityRef.setValue(-dy);
                    setIsModalOpen(true);
                }
                if (animType.current === 'full' && isTouchingList) {
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
                <Spacer height={10} />
                <FlatList
                    data={dummy}
                    renderItem={({ item }) => <PostListItem post={item} />}
                    ItemSeparatorComponent={() => <Spacer height={20} />}
                    ListFooterComponent={() => <Spacer height={200} />}
                    showsVerticalScrollIndicator={false}
                    onTouchStart={() => {
                        isTouchingList.current = false;
                    }}
                    onTouchEnd={() => {
                        isTouchingList.current = true;
                    }}
                    onScrollBeginDrag={() => {
                        isTouchingList.current = false;
                    }}
                    onScrollEndDrag={() => {
                        isTouchingList.current = true;
                    }}
                />
            </Animated.View>
        </>
    );
};

export default NearbyPostListModal;
