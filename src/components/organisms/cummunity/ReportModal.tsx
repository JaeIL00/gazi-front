import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';

import Spacer from '../../atoms/Spacer';
import colors from '../../../constants/colors';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import { reportModalStyles } from '../../../styles/organisms/styles';
import { SingleLineInput } from '../../atoms/SingleLineInput';
import { ReportModalProps } from '../../../types/organisms/types';
import TextButton from '../../molecules/TextButton';

const ReportModal = ({
    isReportSuccess,
    repostId,
    reportMutate,
    closeReportModalHandler,
    getCommentListRefetch,
}: ReportModalProps) => {
    const TOPIC_LIST = [
        { title: '부적절한 글', parameterValue: 'IN_APPOSITE' },
        { title: '거짓 정보', parameterValue: 'FALSE_INFORMATION' },
        { title: '광고/홍보성 글', parameterValue: 'ADVERTISEMENT' },
        { title: '남을 비방/차별/혐오하는 글', parameterValue: 'HATE' },
        { title: '기타', parameterValue: 'ETC' },
    ];

    const [reportTopic, setReportTopic] = useState<string>('');
    const [etcReasonText, setEtcReasonText] = useState<string>('');

    // report
    const reportMutateHandler = () => {
        if (reportTopic) {
            reportMutate(repostId, reportTopic, etcReasonText);
        }
    };

    const radioButtonTopic = useCallback(
        (topic: { title: string; parameterValue: string }) => (
            <TouchButton key={topic.parameterValue} onPressIn={() => setReportTopic(topic.parameterValue)} hitSlop={10}>
                <View style={reportModalStyles.topicRadioButton}>
                    <View
                        style={[
                            reportModalStyles.radio,
                            {
                                borderColor: reportTopic === topic.parameterValue ? '#6826F5' : colors.BORDER_GRAY,
                            },
                        ]}>
                        {reportTopic === topic.parameterValue && <View style={reportModalStyles.radioInnerCircle} />}
                    </View>
                    <NormalText text={topic.title} size={15} color="#777777" />
                </View>
            </TouchButton>
        ),
        [reportTopic],
    );

    return (
        <KeyboardAvoidingView behavior="padding">
            <View style={reportModalStyles.container}>
                {isReportSuccess ? (
                    <>
                        <View style={reportModalStyles.titleBox}>
                            <SemiBoldText text="신고가 완료되었습니다" color={colors.BLACK} size={18} />
                        </View>
                        <View style={reportModalStyles.reportFinishButtonBox}>
                            <TextButton
                                onPress={closeReportModalHandler}
                                width="100%"
                                backgroundColor={colors.BLACK}
                                paddingVertical={12}
                                text="확인"
                                fontSize={14}
                                fontColor={colors.WHITE}
                                borderRadius={5}
                                fontWeight="semiBold"
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={reportModalStyles.titleBox}>
                            <SemiBoldText text="신고 후 게시글 차단" color={colors.BLACK} size={18} />
                        </View>

                        <View style={reportModalStyles.topicRadioButtonBox}>{TOPIC_LIST.map(radioButtonTopic)}</View>

                        {reportTopic === 'ETC' && (
                            <View style={reportModalStyles.etcTextInputBox}>
                                <SingleLineInput
                                    value={etcReasonText}
                                    onChangeText={text => setEtcReasonText(text)}
                                    placeholder="기타 사유를 알려주세요"
                                />
                                <Spacer height={6} />
                            </View>
                        )}

                        <View style={reportModalStyles.reportTopicButtonBox}>
                            <TextButton
                                onPress={closeReportModalHandler}
                                borderColor={colors.STATUS_GRAY}
                                borderWidth={1}
                                flex={1}
                                paddingVertical={12}
                                text="취소"
                                fontSize={14}
                                fontColor={colors.STATUS_GRAY}
                                borderRadius={5}
                                fontWeight="semiBold"
                            />
                            <Spacer width={8} />
                            <TextButton
                                onPress={reportMutateHandler}
                                backgroundColor={colors.BLACK}
                                flex={1}
                                paddingVertical={12}
                                text="신고하기"
                                fontSize={14}
                                fontColor={colors.WHITE}
                                fontWeight="semiBold"
                            />
                        </View>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default ReportModal;
