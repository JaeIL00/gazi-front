import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, FlatList, Image, PanResponder, Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import PostListItem from './PostListItem';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import { screenHeight } from '../../utils/changeStyleSize';
import { nearbyPostListModalStyles } from '../../styles/styles';
import { NearbyPostListModalProps, PostTypes } from '../../types/types';

const FULL_ANIVALUE = -225 * screenHeight; // 340
const MIDDLE_ANIVALUE = 0;
const MINI_ANIVALUE = 345 * screenHeight;
const INIT_MINI = 250 * screenHeight; //590
const INIT_OUTPUT = INIT_MINI + 100;

const NearbyPostListModal = ({
    isModalRef,
    handleModalTrigger,
    nearPostList,
    onPressGetUserPosition,
    callNextPageHandler,
}: NearbyPostListModalProps) => {
    // Modal animation handling
    const animRef = useRef(new Animated.Value(0)).current;
    const opacityRef = useRef(new Animated.Value(0)).current;
    const animType = useRef('middle');
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const { dy } = gestureState;
                if (animType.current === 'mini') {
                    if (dy > 0) return;
                    animRef.setValue(MINI_ANIVALUE + dy);
                    opacityRef.setValue(-MINI_ANIVALUE - dy);
                }
                if (animType.current === 'middle') {
                    animRef.setValue(dy);
                    opacityRef.setValue(-dy);
                }
                if (animType.current === 'full') {
                    animRef.setValue(FULL_ANIVALUE + dy);
                    opacityRef.setValue(-FULL_ANIVALUE - dy);
                }
            },
            onPanResponderEnd: (event, gestureState) => {
                const { dy } = gestureState;
                // Animating start middle modal
                if (dy < -30 && animType.current === 'middle') {
                    // To full from middle
                    Animated.timing(animRef, {
                        toValue: FULL_ANIVALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = true;
                    return (animType.current = 'full');
                }
                if (dy > -30 && animType.current === 'middle') {
                    // To mini from middle
                    Animated.timing(animRef, {
                        toValue: 345 * screenHeight,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = true;
                    return (animType.current = 'mini');
                }
                // // Animating start mini modal
                if (-330 < dy && dy < -30 && animType.current === 'mini') {
                    // To middle from mini
                    Animated.timing(animRef, {
                        toValue: MIDDLE_ANIVALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = false;
                    return (animType.current = 'middle');
                }
                if (dy > -30 && animType.current === 'mini') {
                    // None
                    Animated.timing(animRef, {
                        toValue: MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                }
                if (dy < -330 && animType.current === 'mini') {
                    // To full from mini
                    Animated.timing(animRef, {
                        toValue: FULL_ANIVALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = true;
                    return (animType.current = 'full');
                }
                // // Animating start full modal
                if (330 > dy && dy > 30 && animType.current === 'full') {
                    // To middile from full
                    Animated.timing(animRef, {
                        toValue: MIDDLE_ANIVALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -MIDDLE_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    isModalRef.current = false;
                    animType.current = 'middle';
                }
                if (dy > 330 && animType.current === 'full') {
                    // To mini from full
                    Animated.timing(animRef, {
                        toValue: MINI_ANIVALUE,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -MINI_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    animType.current = 'mini';
                }
                if (dy < 30 && animType.current === 'full') {
                    // None
                    Animated.timing(animRef, {
                        toValue: FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                    Animated.timing(opacityRef, {
                        toValue: -FULL_ANIVALUE,
                        useNativeDriver: true,
                    }).start();
                }
            },
        }),
    ).current;

    // Press hardware back key
    useEffect(() => {
        if (handleModalTrigger) {
            Animated.timing(animRef, {
                toValue: MIDDLE_ANIVALUE,
                duration: 200,
                useNativeDriver: true,
            }).start();
            Animated.timing(opacityRef, {
                toValue: MIDDLE_ANIVALUE,
                duration: 200,
                useNativeDriver: true,
            }).start();
            isModalRef.current = false;
            animType.current = 'middle';
        }
    }, [handleModalTrigger]);

    const keyExtractor = useCallback((item: PostTypes) => item.postId + 'list', []);
    const postList = useCallback(({ item }: { item: PostTypes }) => <PostListItem post={item} />, []);
    const ItemSeparatorComponent = useCallback(() => <Spacer height={20} />, []);
    const ListFooterComponent = useCallback(() => <Spacer height={20} />, []);

    return (
        <>
            <Animated.View
                style={[
                    nearbyPostListModalStyles.grayBackground,
                    {
                        opacity: opacityRef.interpolate({
                            inputRange: [-MIDDLE_ANIVALUE, -FULL_ANIVALUE],
                            outputRange: [0, 0.6],
                        }),
                        zIndex: opacityRef.interpolate({
                            inputRange: [-MIDDLE_ANIVALUE, -MIDDLE_ANIVALUE + 10, -FULL_ANIVALUE],
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
                        inputRange: [-MIDDLE_ANIVALUE, -FULL_ANIVALUE - 100],
                        outputRange: [1, 0],
                    }),
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
                    keyExtractor={keyExtractor}
                    data={nearPostList}
                    renderItem={postList}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListFooterComponent={ListFooterComponent}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd > 0) {
                            callNextPageHandler();
                        }
                    }}
                    getItemLayout={(data, index) => ({
                        length: nearPostList.length,
                        offset: nearPostList.length * index,
                        index,
                    })}
                    initialNumToRender={5}
                    maxToRenderPerBatch={9}
                />
            </Animated.View>
        </>
    );
};

export default NearbyPostListModal;
