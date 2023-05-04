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

const PostListItem = ({ post }: PostListItemProps) => {
    return (
        <TouchButton key={post.id} onPress={() => {}}>
            <View style={postListItemStyles.container}>
                <View>
                    <SemiBoldText text={post.title} size={16} color={Colors.BLACK} />
                    <MediumText
                        text={`${post.distance} | ${post.time} | +${post.rePostCount}posts`}
                        size={11}
                        color={Colors.TXT_GRAY}
                    />
                    <Spacer height={5} />
                    <NormalText text={post.content} size={12} color="#6A6A6A" />
                </View>
                <Image source={{ uri: post.thumbnail }} style={postListItemStyles.postImage} />
            </View>
        </TouchButton>
    );
};
export default PostListItem;
