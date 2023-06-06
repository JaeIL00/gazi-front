import React from 'react';
import { Image, View } from 'react-native';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import MediumText from '../smallest/MediumText';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import { PostListItemProps } from '../../types/types';
import { postListItemStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import { screenFont, screenHeight } from '../../utils/changeStyleSize';

const PostListItem = ({ post, isBorder, isMarkerPost, isNearList }: PostListItemProps) => {
    const rootNavigation = useRootNavigation();
    return (
        <>
            {post && (
                <View style={{ borderBottomWidth: isBorder ? 1 * screenFont : undefined, borderColor: '#EBEBEB' }}>
                    <TouchButton onPress={() => rootNavigation.navigate('ThreadItem', { postId: post.postId })}>
                        <View
                            style={[
                                postListItemStyles.container,
                                {
                                    paddingVertical: isNearList ? 10 * screenHeight : 16 * screenHeight,
                                },
                            ]}>
                            <View style={postListItemStyles.textBox}>
                                <SemiBoldText text={post.title} size={isMarkerPost ? 18 : 16} color={Colors.BLACK} />
                                {isMarkerPost && <Spacer height={5} />}
                                <MediumText
                                    text={`${post.distance ? post.distance + ' | ' : ''}${post.time} | +${
                                        post.rePostCount
                                    }posts`}
                                    size={11}
                                    color={Colors.TXT_GRAY}
                                />
                                <Spacer height={5} />
                                <NormalText text={post.content} size={12} color="#6A6A6A" numberOfLines={2} />
                            </View>
                            {post.thumbNail ? (
                                <Image source={{ uri: post.thumbNail }} style={postListItemStyles.postImage} />
                            ) : (
                                <View style={postListItemStyles.postImage} />
                            )}
                        </View>
                    </TouchButton>
                </View>
            )}
        </>
    );
};
export default PostListItem;
