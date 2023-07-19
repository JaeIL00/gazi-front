import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';

import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import { reportModalStyles } from '../../../styles/organisms/styles';
import { SingleLineInput } from '../../atoms/SingleLineInput';
import { ReportModalProps } from '../../../types/organisms/types';

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
            <TouchableOpacity
                key={topic.parameterValue}
                onPressIn={() => setReportTopic(topic.parameterValue)}
                style={reportModalStyles.topicRadioButton}
                hitSlop={10}
                activeOpacity={1}>
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
            </TouchableOpacity>
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
                            <TouchButton
                                onPress={closeReportModalHandler}
                                width="100%"
                                backgroundColor={colors.BLACK}
                                paddingVertical={12}>
                                <SemiBoldText text="확인" size={14} color={colors.WHITE} />
                            </TouchButton>
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
                            <TouchButton
                                onPress={closeReportModalHandler}
                                borderColor={colors.STATUS_GRAY}
                                borderWidth={1}
                                flex={1}
                                paddingVertical={12}>
                                <SemiBoldText text="취소" size={14} color={colors.STATUS_GRAY} />
                            </TouchButton>
                            <Spacer width={8} />
                            <TouchButton
                                onPress={reportMutateHandler}
                                backgroundColor={colors.BLACK}
                                flex={1}
                                paddingVertical={12}>
                                <SemiBoldText text="신고하기" size={14} color={colors.WHITE} />
                            </TouchButton>
                        </View>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default ReportModal;
