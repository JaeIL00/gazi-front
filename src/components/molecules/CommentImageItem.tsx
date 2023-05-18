import React from 'react';
import TouchButton from '../smallest/TouchButton';
import FastImage from 'react-native-fast-image';

import { CommentImageProps } from '../../types/types';
import { commentListItemStyles } from '../../styles/styles';

const CommentImageItem = ({ fileUrl, width, height, moveImageViewScreen }: CommentImageProps) => {
    return (
        <TouchButton onPress={moveImageViewScreen} width={width} height={height}>
            <FastImage source={{ uri: fileUrl }} style={commentListItemStyles.contentImg} />
        </TouchButton>
    );
};

export default CommentImageItem;
