import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useMutation } from 'react-query';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import CommentImageItem from '../../molecules/CommentImageItem';
import { commentListItemStyles } from '../../../styles/styles';
import { CommentListItemProps, ImageViewTypes } from '../../../types/types';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import { addHelpfulCommentAPI, delHelpfulCommentAPI } from '../../../queries/api';
import { debounce } from 'lodash';
import { useRecoilValue } from 'recoil';
import { userTokenAtom } from '../../../store/atoms';

const CommentListItem = ({ comment, postTitle, postCount, reportHandler, firstCommentId }: CommentListItemProps) => {
    const rootNavigation = useRootNavigation();

    const { accessToken } = useRecoilValue(userTokenAtom);

    const [isHelpful, setIsHelpful] = useState<boolean>(comment.like);
    const [helpfulCount, setHelpfulCount] = useState<number>(comment.likeCount);

    // Add helpful comment API
    const { mutate: addHelpfultMutate } = useMutation(addHelpfulCommentAPI, {
        onSuccess: data => {
            console.log(data);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Add helpful comment API', error);
        },
    });

    // Delete helpful comment API
    const { mutate: delHelpfultMutate } = useMutation(delHelpfulCommentAPI, {
        onSuccess: data => {
            console.log(data);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Delete helpful comment API', error);
        },
    });

    useEffect(() => {
        console.log(comment.postId, comment.like);
    }, []);

    // Helpful comment handler
    const helpfulCommentHandler = () => {
        setIsHelpful(!isHelpful);
        if (isHelpful) {
            setHelpfulCount(helpfulCount - 1);
            delHelpfulMutate();
        } else {
            setHelpfulCount(helpfulCount + 1);
            addHelpfulMutate();
        }
    };
    const addHelpfulMutate = useCallback(
        debounce(() => {
            if (firstCommentId === comment.postId) {
                addHelpfultMutate({
                    accessToken,
                    data: {
                        postId: comment.postId,
                        repostId: null,
                    },
                });
            } else {
                addHelpfultMutate({
                    accessToken,
                    data: {
                        postId: null,
                        repostId: comment.postId,
                    },
                });
            }
        }, 1000),
        [firstCommentId],
    );
    const delHelpfulMutate = useCallback(
        debounce(() => {
            if (firstCommentId === comment.postId) {
                console.log('first');
                delHelpfultMutate({
                    accessToken,
                    data: {
                        postId: comment.postId,
                        repostId: null,
                    },
                });
            } else {
                console.log('others');
                delHelpfultMutate({
                    accessToken,
                    data: {
                        postId: null,
                        repostId: comment.postId,
                    },
                });
            }
        }, 1000),
        [firstCommentId],
    );

    // Move image view screen
    const moveImageViewScreen = (viewData: ImageViewTypes) => {
        rootNavigation.navigate('ImageView', viewData);
    };

    return (
        <View style={commentListItemStyles.container}>
            <View style={commentListItemStyles.lineSphere} />
            {/* 헤더 */}
            <View>
                <View style={commentListItemStyles.headerBox}>
                    <View style={commentListItemStyles.headerInner}>
                        <View style={commentListItemStyles.headerProfileBox}>
                            <View style={commentListItemStyles.headerProfileImg}></View>
                            <View style={commentListItemStyles.headerTitleBox}>
                                <SemiBoldText text={comment.nickName} size={16} color={Colors.BLACK} />
                                <Spacer height={1} />
                                <MediumText text={`${comment.distance} | ${comment.time}`} size={11} color="#999999" />
                            </View>
                        </View>
                        <TouchButton onPress={() => reportHandler(comment.postId)} hitSlop={10}>
                            <MediumText text="신고하기" size={11} color={Colors.BLACK} />
                        </TouchButton>
                    </View>
                </View>

                {/* 내용 및 라이크 */}
                <View style={commentListItemStyles.contentBox}>
                    <NormalText text={comment.content} size={13} color="#000000" />
                    <Spacer height={8} />
                    {comment.fileList.length === 1 && (
                        <TouchButton onPress={() => {}} width={308} height={208}>
                            <Image
                                source={{ uri: comment.fileList[0].fileUrl }}
                                style={commentListItemStyles.contentImg}
                            />
                        </TouchButton>
                    )}
                    {comment.fileList.length === 2 && (
                        <View style={commentListItemStyles.contentTwoImgBox}>
                            {comment.fileList.map(file => (
                                <TouchButton onPress={() => {}} width={151} height={208}>
                                    <Image source={{ uri: file.fileUrl }} style={commentListItemStyles.contentImg} />
                                </TouchButton>
                            ))}
                        </View>
                    )}
                    {comment.fileList.length === 3 && (
                        <View style={commentListItemStyles.contentTwoOverImgBox}>
                            <View style={commentListItemStyles.contentThrHalfImg}>
                                <TouchButton onPress={() => {}} width={151} height={208}>
                                    <Image
                                        source={{ uri: comment.fileList[0].fileUrl }}
                                        style={commentListItemStyles.contentImg}
                                    />
                                </TouchButton>
                            </View>
                            <View style={commentListItemStyles.contentThrQtImg}>
                                <TouchButton onPress={() => {}} width={151} height={101}>
                                    <Image
                                        source={{ uri: comment.fileList[1].fileUrl }}
                                        style={commentListItemStyles.contentImg}
                                    />
                                </TouchButton>
                                <TouchButton onPress={() => {}} width={151} height={101}>
                                    <Image
                                        source={{ uri: comment.fileList[2].fileUrl }}
                                        style={commentListItemStyles.contentImg}
                                    />
                                </TouchButton>
                            </View>
                        </View>
                    )}
                    {(comment.fileList.length === 4 || comment.fileList.length > 4) && (
                        <View style={commentListItemStyles.contentTwoOverImgBox}>
                            <View style={commentListItemStyles.contentThrQtImg}>
                                {comment.fileList.map((item, index) => {
                                    if (index < 2) {
                                        return (
                                            <CommentImageItem
                                                key={item.fileName}
                                                moveImageViewScreen={() =>
                                                    moveImageViewScreen({
                                                        postTitle,
                                                        postCount,
                                                        fileList: comment.fileList,
                                                        nickName: comment.nickName,
                                                        distance: comment.distance,
                                                        time: comment.time,
                                                        imageIndex: index,
                                                    })
                                                }
                                                width={151}
                                                height={101}
                                                fileUrl={item.fileUrl}
                                            />
                                        );
                                    }
                                })}
                            </View>
                            <View style={commentListItemStyles.contentThrQtImg}>
                                <CommentImageItem
                                    moveImageViewScreen={() =>
                                        moveImageViewScreen({
                                            postTitle,
                                            postCount,
                                            fileList: comment.fileList,
                                            nickName: comment.nickName,
                                            distance: comment.distance,
                                            time: comment.time,
                                            imageIndex: 2,
                                        })
                                    }
                                    width={151}
                                    height={101}
                                    fileUrl={comment.fileList[2].fileUrl}
                                />
                                {comment.fileList.length > 4 ? (
                                    <TouchButton
                                        onPress={() =>
                                            moveImageViewScreen({
                                                postTitle,
                                                postCount,
                                                fileList: comment.fileList,
                                                nickName: comment.nickName,
                                                distance: comment.distance,
                                                time: comment.time,
                                                imageIndex: 3,
                                            })
                                        }
                                        width={151}
                                        height={101}>
                                        <>
                                            <Image
                                                source={{ uri: comment.fileList[3].fileUrl }}
                                                style={commentListItemStyles.contentImg}
                                            />
                                            <View style={commentListItemStyles.overFourImg}>
                                                <MediumText
                                                    text={`+${comment.fileList.length - 3}`}
                                                    size={18}
                                                    color={Colors.WHITE}
                                                />
                                            </View>
                                        </>
                                    </TouchButton>
                                ) : (
                                    <CommentImageItem
                                        moveImageViewScreen={() =>
                                            moveImageViewScreen({
                                                postTitle,
                                                postCount,
                                                fileList: comment.fileList,
                                                nickName: comment.nickName,
                                                distance: comment.distance,
                                                time: comment.time,
                                                imageIndex: 3,
                                            })
                                        }
                                        width={151}
                                        height={101}
                                        fileUrl={comment.fileList[3].fileUrl}
                                    />
                                )}
                            </View>
                        </View>
                    )}
                </View>

                <Spacer height={9} />

                <TouchButton onPress={helpfulCommentHandler} alignSelf="flex-start" hitSlop={10}>
                    <View style={commentListItemStyles.likeBox}>
                        <Icons
                            type="feather"
                            name="thumbs-up"
                            size={15}
                            color={isHelpful ? Colors.VIOLET : Colors.TXT_GRAY}
                        />
                        <Spacer width={2} />
                        <NormalText
                            text={`도움돼요 ${helpfulCount}`}
                            size={13}
                            color={isHelpful ? Colors.VIOLET : Colors.TXT_GRAY}
                        />
                    </View>
                </TouchButton>
            </View>
        </View>
    );
};

export default CommentListItem;
