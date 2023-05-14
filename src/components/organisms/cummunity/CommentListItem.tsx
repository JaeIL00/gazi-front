import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { CommentTypes } from '../../../types/types';
import { commentListItemStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import Colors from '../../../styles/Colors';

const CommentListcomment = ({ comment }: { comment: CommentTypes }) => (
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
                    <TouchButton onPress={() => {}}>
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
                        <Image source={{ uri: comment.fileList[0].fileUrl }} style={commentListItemStyles.contentImg} />
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
                            <TouchButton onPress={() => {}} width={151} height={101}>
                                <Image
                                    source={{ uri: comment.fileList[0].fileUrl }}
                                    style={commentListItemStyles.contentImg}
                                />
                            </TouchButton>
                            <TouchButton onPress={() => {}} width={151} height={101}>
                                <Image
                                    source={{ uri: comment.fileList[1].fileUrl }}
                                    style={commentListItemStyles.contentImg}
                                />
                            </TouchButton>
                        </View>
                        <View style={commentListItemStyles.contentThrQtImg}>
                            <TouchButton onPress={() => {}} width={151} height={101}>
                                <Image
                                    source={{ uri: comment.fileList[2].fileUrl }}
                                    style={commentListItemStyles.contentImg}
                                />
                            </TouchButton>
                            {comment.fileList.length > 4 ? (
                                <TouchButton onPress={() => {}} width={151} height={101}>
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
                                <TouchButton onPress={() => {}} width={151} height={101}>
                                    <Image
                                        source={{ uri: comment.fileList[3].fileUrl }}
                                        style={commentListItemStyles.contentImg}
                                    />
                                </TouchButton>
                            )}
                        </View>
                    </View>
                )}
            </View>

            <Spacer height={9} />

            <TouchButton onPress={() => {}} alignSelf="flex-start">
                <View style={commentListItemStyles.likeBox}>
                    <Icons type="feather" name="thumbs-up" size={15} color={Colors.TXT_GRAY} />
                    <Spacer width={2} />
                    <NormalText text={`도움돼요 ${comment.likeCount}`} size={13} color={Colors.TXT_GRAY} />
                </View>
            </TouchButton>
        </View>
    </View>
);
export default CommentListcomment;
