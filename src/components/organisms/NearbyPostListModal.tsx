import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, PanResponder, View } from 'react-native';

import dummy from '../../utils/dummy';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import PostListItem from './PostListItem';
import SemiBoldText from '../smallest/SemiBoldText';
import { nearbyPostListModalStyles } from '../../styles/styles';
import { screenHeight } from '../../utils/changeStyleSize';

const FULL_ANIVALUE = -565 * screenHeight;
const MINI_ANIVALUE = 0;
const INIT_MINI = 600 * screenHeight;
const INIT_OUTPUT = INIT_MINI + 100;

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
                if (animType.current === 'mini') {
                    animRef.setValue(dy);
                    opacityRef.setValue(-dy);
                    setIsModalOpen(true);
                }
                if (animType.current === 'full') {
                    animRef.setValue(FULL_ANIVALUE + dy);
                    opacityRef.setValue(-FULL_ANIVALUE - dy);
                }
            },
            onPanResponderEnd: (event, gestureState) => {
                const { dy } = gestureState;
                if (dy < -50 && animType.current === 'mini') {
                    Animated.timing(animRef, {
                        toValue: FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: -FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    animType.current = 'full';
                }
                if (dy > -50 && animType.current === 'mini') {
                    Animated.timing(animRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                }
                if (dy > 50 && animType.current === 'full') {
                    Animated.timing(animRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    animType.current = 'mini';
                }
                if (dy < 50 && animType.current === 'full') {
                    Animated.timing(animRef, {
                        toValue: FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: -FULL_ANIVALUE,
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
            opacityRef.removeListener(subscriptionAnim);
        };
    }, [opacityRef]);

    return (
        <>
            {isModalOpen && (
                <Animated.View
                    style={[
                        nearbyPostListModalStyles.grayBackground,
                        {
                            opacity: opacityRef.interpolate({
                                inputRange: [0, -FULL_ANIVALUE],
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
                                    outputRange: [INIT_MINI, INIT_OUTPUT],
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
            </Animated.View>
            <Animated.View
                style={[
                    nearbyPostListModalStyles.listBox,
                    {
                        transform: [
                            {
                                translateY: animRef.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [INIT_MINI, INIT_OUTPUT],
                                }),
                            },
                        ],
                    },
                ]}>
                <FlatList
                    data={dummy}
                    renderItem={({ item }) => <PostListItem post={item} />}
                    ItemSeparatorComponent={() => <Spacer height={20} />}
                    ListFooterComponent={() => <Spacer height={20} />}
                    showsVerticalScrollIndicator={false}
                />
            </Animated.View>
        </>
    );
};

export default NearbyPostListModal;
