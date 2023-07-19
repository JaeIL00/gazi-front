import React from 'react';
import TouchButton from '../atoms/TouchButton';
import FastImage from 'react-native-fast-image';

import { CommentImageProps } from '../../types/molecules/types';
import { commentListItemStyles } from '../../styles/molecules/styles';

const CommentImageItem = ({ fileUrl, width, height, moveImageViewScreen }: CommentImageProps) => {
    return (
        <TouchButton onPress={moveImageViewScreen} width={width} height={height}>
            <FastImage source={{ uri: fileUrl }} style={commentListItemStyles.contentImg} />
        </TouchButton>
    );
};

export default CommentImageItem;
