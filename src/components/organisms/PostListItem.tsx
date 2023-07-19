import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import Spacer from '../atoms/Spacer';
import colors from '../../common/constants/colors';
import NormalText from '../atoms/NormalText';
import MediumText from '../atoms/MediumText';
import SemiBoldText from '../atoms/SemiBoldText';
import { postListItemStyles } from '../../styles/organisms/styles';
import { screenFont, screenHeight } from '../../utils/changeStyleSize';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import { PostListItemProps } from '../../types/organisms/types';

const PostListItem = ({ post, isBorder, isMarkerPost, isNearList }: PostListItemProps) => {
    const rootNavigation = useRootNavigation();
    return (
        <>
            {post && (
                <View
                    style={{
                        borderBottomWidth: isBorder ? 1 * screenFont : undefined,
                        borderColor: colors.BORDER_GRAY,
                    }}>
                    <TouchableOpacity
                        onPress={() => rootNavigation.navigate('ThreadItem', { postId: post.postId })}
                        activeOpacity={1}>
                        <View
                            style={[
                                postListItemStyles.container,
                                {
                                    paddingVertical: isNearList ? 10 * screenHeight : 16 * screenHeight,
                                },
                            ]}>
                            <View style={postListItemStyles.textBox}>
                                <SemiBoldText
                                    text={post.title}
                                    size={isMarkerPost ? 18 : 16}
                                    color={colors.BLACK}
                                    numberOfLines={1}
                                />
                                {isMarkerPost && <Spacer height={5} />}
                                <MediumText
                                    text={`${post.distance ? post.distance + ' | ' : ''}${post.time} | +${
                                        post.rePostCount
                                    }posts`}
                                    size={11}
                                    color={colors.TXT_GRAY}
                                />
                                <Spacer height={5} />
                                <NormalText text={post.content} size={12} color="#6A6A6A" numberOfLines={2} />
                            </View>

                            {post.thumbNail && (
                                <View style={postListItemStyles.postImageBox}>
                                    <Image source={{ uri: post.thumbNail }} style={postListItemStyles.postImage} />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};
export default PostListItem;
