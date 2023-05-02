import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, PanResponder, Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import dummy from '../../utils/dummy';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import PostListItem from './PostListItem';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import { screenHeight } from '../../utils/changeStyleSize';
import { NearbyPostListModalProps } from '../../types/types';
import { nearbyPostListModalStyles } from '../../styles/styles';

const FULL_ANIVALUE = -565 * screenHeight;
const MINI_ANIVALUE = 0;
const INIT_MINI = 600 * screenHeight;
const INIT_OUTPUT = INIT_MINI + 100;

const NearbyPostListModal = ({ isModalRef, handleModalTrigger, onPressGetUserPosition }: NearbyPostListModalProps) => {
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
                // Off modal
                if (dy < -50 && animType.current === 'mini') {
                    Animated.timing(animRef, {
                        toValue: FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: -FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = true;
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
                // On modal
                if (dy > 50 && animType.current === 'full') {
                    Animated.timing(animRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.spring(opacityRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = false;
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
        // Press hardware back key
        if (handleModalTrigger) {
            Animated.timing(animRef, {
                toValue: MINI_ANIVALUE,
                useNativeDriver: true,
            }).start();
            Animated.spring(opacityRef, {
                toValue: MINI_ANIVALUE,
                useNativeDriver: true,
            }).start();
            isModalRef.current = false;
            animType.current = 'mini';
        }

        // Off modal background
        const subscriptionAnim = opacityRef.addListener(({ value }) => {
            if (value < 10) {
                setIsModalOpen(false);
            }
        });
        return () => {
            opacityRef.removeListener(subscriptionAnim);
        };
    }, [opacityRef, handleModalTrigger]);

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
                style={{
                    transform: [
                        {
                            translateY: animRef.interpolate({
                                inputRange: [0, 100],
                                outputRange: [INIT_MINI, INIT_OUTPUT],
                            }),
                        },
                    ],
                }}>
                <View style={nearbyPostListModalStyles.toggleButtonBox}>
                    <TouchButton
                        onPress={onPressGetUserPosition}
                        width={52}
                        height={52}
                        borderRadius={52}
                        backgroundColor={Colors.WHITE}
                        borderWidth={1}
                        borderColor="#E3E3E3">
                        <Image
                            source={require('../../assets/icons/location.png')}
                            style={nearbyPostListModalStyles.locationIcon}
                        />
                    </TouchButton>
                    <Spacer height={8} />
                    {Platform.OS === 'android' && (
                        <DropShadow style={nearbyPostListModalStyles.dropshadow}>
                            <TouchButton
                                onPress={() => {}}
                                width={52}
                                height={52}
                                borderRadius={52}
                                backgroundColor={Colors.VIOLET}>
                                <Image
                                    source={require('../../assets/icons/write.png')}
                                    style={nearbyPostListModalStyles.writeIcon}
                                />
                            </TouchButton>
                        </DropShadow>
                    )}
                </View>
            </Animated.View>
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
