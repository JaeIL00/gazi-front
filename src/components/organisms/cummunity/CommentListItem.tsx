import React, { useCallback, useState } from 'react';
import { Image, View } from 'react-native';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';
import { useRecoilValue } from 'recoil';

import ReportModal from './ReportModal';
import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import ModalBackground from '../../smallest/ModalBackground';
import CommentImageItem from '../../molecules/CommentImageItem';
import { userAuthAtom } from '../../../store/atoms';
import { commentListItemStyles } from '../../../styles/styles';
import { CommentListItemProps, ImageViewTypes } from '../../../types/types';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import { addHelpfulCommentAPI, delHelpfulCommentAPI, reportAPI } from '../../../queries/api';

const CommentListItem = ({
    comment,
    postTitle,
    postCount,
    getCommentListRefetch,
    delReportComment,
}: CommentListItemProps) => {
    const rootNavigation = useRootNavigation();

    const { accessToken } = useRecoilValue(userAuthAtom);

    const [isHelpful, setIsHelpful] = useState<boolean>(comment.like);
    const [isReportModal, setIsReportModal] = useState<boolean>(false);
    const [isReportSuccess, setIsReportSuccess] = useState<boolean>(false);
    const [helpfulCount, setHelpfulCount] = useState<number>(comment.likeCount);

    // Comment report API
    const { mutate, isLoading } = useMutation(reportAPI, {
        onSuccess: () => {
            setIsReportSuccess(true);
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) report API. respense: ', response);
        },
    });

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
            if (comment.post) {
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
        [comment],
    );
    const delHelpfulMutate = useCallback(
        debounce(() => {
            if (comment.post) {
                delHelpfultMutate({
                    accessToken,
                    data: {
                        postId: comment.postId,
                        repostId: null,
                    },
                });
            } else {
                delHelpfultMutate({
                    accessToken,
                    data: {
                        postId: null,
                        repostId: comment.postId,
                    },
                });
            }
        }, 1000),
        [],
    );

    // Report comment handler
    const reportMutate = (repostId: number, reportEnum: string, reason: string) => {
        if (comment.post) {
            mutate({
                accessToken,
                data: {
                    postId: repostId,
                    repostId: null,
                    reportEnum,
                    reason,
                },
            });
        } else {
            mutate({
                accessToken,
                data: {
                    postId: null,
                    repostId,
                    reportEnum,
                    reason,
                },
            });
        }
    };

    const closeReportModalHandler = () => {
        setIsReportModal(false);
        delReportComment(comment.postId);
    };

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
                        <TouchButton onPress={() => setIsReportModal(true)} hitSlop={10}>
                            <MediumText text="신고하기" size={11} color={Colors.BLACK} />
                        </TouchButton>
                        <ModalBackground visible={isReportModal} onRequestClose={closeReportModalHandler}>
                            <ReportModal
                                repostId={comment.postId}
                                isReportSuccess={isReportSuccess}
                                reportMutate={reportMutate}
                                closeReportModalHandler={closeReportModalHandler}
                                getCommentListRefetch={getCommentListRefetch}
                            />
                        </ModalBackground>
                    </View>
                </View>

                {/* 내용 및 라이크 */}
                <View style={commentListItemStyles.contentBox}>
                    <NormalText text={comment.content} size={13} color="#000000" />
                    <Spacer height={8} />
                    {comment.fileList.length === 1 && (
                        <CommentImageItem
                            moveImageViewScreen={() =>
                                moveImageViewScreen({
                                    postTitle,
                                    postCount,
                                    fileList: comment.fileList,
                                    nickName: comment.nickName,
                                    distance: comment.distance,
                                    time: comment.time,
                                    imageIndex: 0,
                                })
                            }
                            width={308}
                            height={208}
                            fileUrl={comment.fileList[0].fileUrl}
                        />
                    )}
                    {comment.fileList.length === 2 && (
                        <View style={commentListItemStyles.contentTwoImgBox}>
                            {comment.fileList.map((file, index) => (
                                <CommentImageItem
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
                                    height={208}
                                    fileUrl={file.fileUrl}
                                />
                            ))}
                        </View>
                    )}
                    {comment.fileList.length === 3 && (
                        <View style={commentListItemStyles.contentTwoOverImgBox}>
                            <View style={commentListItemStyles.contentThrHalfImg}>
                                <CommentImageItem
                                    moveImageViewScreen={() =>
                                        moveImageViewScreen({
                                            postTitle,
                                            postCount,
                                            fileList: comment.fileList,
                                            nickName: comment.nickName,
                                            distance: comment.distance,
                                            time: comment.time,
                                            imageIndex: 0,
                                        })
                                    }
                                    width={151}
                                    height={208}
                                    fileUrl={comment.fileList[0].fileUrl}
                                />
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
                                            imageIndex: 1,
                                        })
                                    }
                                    width={151}
                                    height={101}
                                    fileUrl={comment.fileList[1].fileUrl}
                                />
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
