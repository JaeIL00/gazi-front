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

const PostListItem = ({ post, isBorder, isMarkerPost }: PostListItemProps) => {
    const rootNavigation = useRootNavigation();
    return (
        <>
            {post && (
                <View>
                    <TouchButton onPress={() => rootNavigation.navigate('ThreadItem', { postId: post.postId })}>
                        <View style={postListItemStyles.container}>
                            <View style={postListItemStyles.textBox}>
                                <SemiBoldText text={post.title} size={isMarkerPost ? 18 : 16} color={Colors.BLACK} />
                                {isMarkerPost && <Spacer height={5} />}
                                <MediumText
                                    text={`${post.distance} | ${post.time} | +${post.rePostCount}posts`}
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
                    {isBorder && <View style={postListItemStyles.postBottomBar} />}
                </View>
            )}
        </>
    );
};
export default PostListItem;
