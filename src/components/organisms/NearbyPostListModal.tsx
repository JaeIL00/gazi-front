import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, FlatList, PanResponder, PanResponderInstance, Platform, RefreshControl, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import FastImage from 'react-native-fast-image';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import PostListItem from './PostListItem';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import { userInfoAtom } from '../../store/atoms';
import { screenHeight } from '../../utils/changeStyleSize';
import { nearbyPostListModalStyles } from '../../styles/styles';
import { NearbyPostListModalProps, PostTypes } from '../../types/types';
import NormalText from '../smallest/NormalText';

const FULL_ANIM_VALUE = -415 * screenHeight;
const MIDDLE_ANIM_VALUE = 0;
const MARKER_ANIM_VALUE = 110 * screenHeight;
const MINI_ANIM_VALUE = 152 * screenHeight;
const INIT_MINI = 440 * screenHeight;
const INIT_OUTPUT = INIT_MINI + 100;
const NOTHING_LIST_GUIDE_FULL_ANIM_VALUE = 256 * screenHeight;
const NOTHING_LIST_GUIDE_MIDDLE_ANIM_VALUE = 0;
const NOTHING_LIST_GUIDE_MINI_ANIM_VALUE = -6 * screenHeight;

const NearbyPostListModal = ({
    isModalRef,
    handleModalTrigger,
    nearPostList,
    isBottomSheetMini,
    isBottomSheetFull,
    currentPosition,
    mapBoundaryState,
    markerPost,
    isNearPostRefresh,
    moveToBottomSheetFull,
    notBottomSheetMini,
    onPressGetUserPosition,
    callNextPageHandler,
    moveToWritePost,
    nearPostListRefresh,
}: NearbyPostListModalProps) => {
    const { nickname } = useRecoilValue(userInfoAtom);

    // Modal animation handling
    const animRef = useRef<Animated.Value>(new Animated.Value(0)).current;
    const opacityRef = useRef<Animated.Value>(new Animated.Value(0)).current;
    const nothingGuideRef = useRef<Animated.Value>(new Animated.Value(0)).current;
    const animType = useRef<string>('middle');
    const panResponder = useRef<PanResponderInstance>(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const { dy } = gestureState;
                if (animType.current === 'mini') {
                    if (dy > 0) return;
                    animRef.setValue(MINI_ANIM_VALUE + dy);
                    opacityRef.setValue(-MINI_ANIM_VALUE - dy);
                    if (nearPostList.length < 1) {
                        nothingGuideRef.setValue(NOTHING_LIST_GUIDE_MINI_ANIM_VALUE - dy);
                    }
                }
                if (animType.current === 'middle') {
                    if (dy > MINI_ANIM_VALUE) return;
                    animRef.setValue(dy);
                    opacityRef.setValue(-dy);
                    if (nearPostList.length < 1) {
                        nothingGuideRef.setValue(-dy);
                    }
                }
                if (animType.current === 'full') {
                    if (dy > MINI_ANIM_VALUE - FULL_ANIM_VALUE) return;
                    animRef.setValue(FULL_ANIM_VALUE + dy);
                    opacityRef.setValue(-FULL_ANIM_VALUE - dy);
                    if (nearPostList.length < 1) {
                        nothingGuideRef.setValue(NOTHING_LIST_GUIDE_FULL_ANIM_VALUE - dy);
                    }
                }
            },
            onPanResponderEnd: (event, gestureState) => {
                const { dy } = gestureState;
                // Animating start middle modal
                if (dy < -30 && animType.current === 'middle') {
                    // To full from middle
                    Animated.timing(animRef, {
                        toValue: FULL_ANIM_VALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -FULL_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start(({ finished }: { finished: boolean }) => {
                        if (finished) {
                            moveToBottomSheetFull('FULL');
                        }
                    });
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_FULL_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                    isModalRef.current = true;
                    return (animType.current = 'full');
                }
                if (dy > -30 && animType.current === 'middle') {
                    // To mini from middle
                    Animated.timing(animRef, {
                        toValue: MINI_ANIM_VALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_MINI_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                    isModalRef.current = true;
                    return (animType.current = 'mini');
                }
                // // Animating start mini modal
                if (dy > -330 && dy < -30 && animType.current === 'mini') {
                    // To middle from mini
                    Animated.timing(animRef, {
                        toValue: MIDDLE_ANIM_VALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    notBottomSheetMini();
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_MIDDLE_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                    isModalRef.current = false;
                    return (animType.current = 'middle');
                }
                if (dy > -30 && animType.current === 'mini') {
                    // None
                    Animated.timing(animRef, {
                        toValue: MINI_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start();
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_MINI_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                }
                if (dy < -330 && animType.current === 'mini') {
                    // To full from mini
                    Animated.timing(animRef, {
                        toValue: FULL_ANIM_VALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -FULL_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start(({ finished }: { finished: boolean }) => {
                        if (finished) {
                            moveToBottomSheetFull('FULL');
                        }
                    });
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_FULL_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                    isModalRef.current = true;
                    return (animType.current = 'full');
                }
                // // Animating start full modal
                if (dy < 330 && dy > 30 && animType.current === 'full') {
                    // To middile from full
                    Animated.timing(animRef, {
                        toValue: MIDDLE_ANIM_VALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -MIDDLE_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start(({ finished }: { finished: boolean }) => {
                        if (finished) {
                            moveToBottomSheetFull('NOT');
                        }
                    });
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_MIDDLE_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                    isModalRef.current = false;
                    animType.current = 'middle';
                }
                if (dy > 330 && animType.current === 'full') {
                    // To mini from full
                    Animated.timing(animRef, {
                        toValue: MINI_ANIM_VALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -MINI_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start(({ finished }: { finished: boolean }) => {
                        if (finished) {
                            moveToBottomSheetFull('NOT');
                        }
                    });
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_MIDDLE_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                    animType.current = 'mini';
                }
                if (dy < 30 && animType.current === 'full') {
                    // None
                    Animated.timing(animRef, {
                        toValue: FULL_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -FULL_ANIM_VALUE,
                        useNativeDriver: true,
                    }).start();
                    if (nearPostList.length < 1) {
                        Animated.timing(nothingGuideRef, {
                            toValue: NOTHING_LIST_GUIDE_FULL_ANIM_VALUE,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    }
                }
            },
        }),
    ).current;

    // Press hardware back key
    useEffect(() => {
        Animated.timing(animRef, {
            toValue: MIDDLE_ANIM_VALUE,
            duration: 200,
            useNativeDriver: true,
        }).start();
        Animated.timing(opacityRef, {
            toValue: MIDDLE_ANIM_VALUE,
            duration: 200,
            useNativeDriver: true,
        }).start(({ finished }: { finished: boolean }) => {
            if (finished) {
                moveToBottomSheetFull('NOT');
            }
        });
        notBottomSheetMini();
        isModalRef.current = false;
        animType.current = 'middle';
    }, [handleModalTrigger, nearPostList]);

    // Move to mini bottom sheet by move map
    useEffect(() => {
        if (isBottomSheetMini) {
            Animated.timing(animRef, {
                toValue: MINI_ANIM_VALUE,
                duration: 200,
                useNativeDriver: true,
            }).start();
            isModalRef.current = true;
            animType.current = 'mini';
        }
    }, [isBottomSheetMini]);

    // Marker post bottom sheet animate position
    useEffect(() => {
        if (markerPost) {
            Animated.timing(animRef, {
                toValue: MARKER_ANIM_VALUE,
                duration: 200,
                useNativeDriver: true,
            }).start();
            animType.current = 'marker';
        } else if (animType.current === 'marker') {
            Animated.timing(animRef, {
                toValue: MINI_ANIM_VALUE,
                duration: 200,
                useNativeDriver: true,
            }).start();
            isModalRef.current = true;
            animType.current = 'mini';
        }
    }, [markerPost]);

    // Flatlist function
    const keyExtractor = useCallback((item: PostTypes) => item.postId + 'list', []);
    const postList = useCallback(
        ({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={false} isNearList={true} />,
        [],
    );
    const ListFooterComponent = useCallback(() => <Spacer height={20} />, []);

    // Going to current position by toggle button
    const onPressCurrentPositionToggle = useCallback(() => {
        onPressGetUserPosition();
    }, [currentPosition, mapBoundaryState]);

    return (
        <>
            <Animated.View
                style={[
                    nearbyPostListModalStyles.grayBackground,
                    {
                        opacity: opacityRef.interpolate({
                            inputRange: [-MIDDLE_ANIM_VALUE, -FULL_ANIM_VALUE],
                            outputRange: [0, 0.6],
                        }),
                        zIndex: opacityRef.interpolate({
                            inputRange: [-MIDDLE_ANIM_VALUE, -MIDDLE_ANIM_VALUE + 10, -FULL_ANIM_VALUE],
                            outputRange: [-1, 0, 0],
                        }),
                    },
                ]}
            />

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
                    opacity: opacityRef.interpolate({
                        inputRange: [-MIDDLE_ANIM_VALUE, -FULL_ANIM_VALUE - 100],
                        outputRange: [1, 0],
                    }),
                }}>
                <View style={nearbyPostListModalStyles.toggleButtonBox}>
                    <TouchButton
                        onPress={onPressCurrentPositionToggle}
                        width={52}
                        height={52}
                        borderRadius={52}
                        backgroundColor={Colors.WHITE}
                        borderWidth={1}
                        borderColor="#E3E3E3">
                        <FastImage
                            source={require('../../assets/icons/location.png')}
                            style={nearbyPostListModalStyles.locationIcon}
                        />
                    </TouchButton>
                    <Spacer height={8} />
                    {Platform.OS === 'android' && (
                        <DropShadow style={nearbyPostListModalStyles.dropshadow}>
                            <TouchButton
                                onPress={moveToWritePost}
                                width={52}
                                height={52}
                                borderRadius={52}
                                backgroundColor={Colors.VIOLET}>
                                <FastImage
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

                {nearPostList.length > 0 && !markerPost && (
                    <>
                        <View style={nearbyPostListModalStyles.titleBox}>
                            <SemiBoldText
                                text={`${nickname}님 주변에서 일어나고 있는 일`}
                                color={Colors.BLACK}
                                size={18}
                            />
                        </View>
                    </>
                )}
                {nearPostList.length < 1 && (
                    <Animated.View
                        style={[
                            nearbyPostListModalStyles.nothingListGuideBox,
                            {
                                transform: [
                                    {
                                        translateY: nothingGuideRef.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: [38 * screenHeight, 138],
                                        }),
                                    },
                                ],
                            },
                        ]}>
                        <SemiBoldText text="주변에 일어나고 있는 일이  없어요!" color={Colors.BLACK} size={18} />
                        <Spacer height={4} />
                        <NormalText text="내 주변의 교통상황을 알려주세요" color={Colors.TXT_GRAY} size={14} />
                        <Spacer height={22} />
                        <TouchButton
                            onPress={moveToWritePost}
                            borderColor={Colors.BTN_GRAY}
                            borderWidth={1}
                            paddingHorizontal={16}
                            paddingVertical={12}
                            hitSlop={20}>
                            <SemiBoldText text="사건 제보하기" color="#49454F" size={13} />
                        </TouchButton>
                    </Animated.View>
                )}
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
                {!markerPost && nearPostList.length > 0 && (
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={nearPostList}
                        renderItem={postList}
                        ListFooterComponent={ListFooterComponent}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            callNextPageHandler();
                        }}
                        refreshControl={
                            <RefreshControl onRefresh={nearPostListRefresh} refreshing={isNearPostRefresh} />
                        }
                    />
                )}
                {markerPost && <PostListItem post={markerPost} isBorder={false} isMarkerPost={true} />}
            </Animated.View>

            {!isBottomSheetFull && !markerPost && nearPostList.length > 0 && (
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        nearbyPostListModalStyles.listTouchBox,
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
                    ]}
                />
            )}
        </>
    );
};

export default NearbyPostListModal;
