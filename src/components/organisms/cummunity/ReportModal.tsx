import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { ReportModalProps } from '../../../types/types';
import { reportModalStyles } from '../../../styles/styles';
import { SingleLineInput } from '../../smallest/SingleLineInput';

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

    const finishReportModal = () => {
        closeReportModalHandler();
        // getCommentListRefetch();
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
                            borderColor: reportTopic === topic.parameterValue ? '#6826F5' : Colors.BORDER_GRAY,
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
                            <SemiBoldText text="신고가 완료되었습니다" color={Colors.BLACK} size={18} />
                        </View>
                        <View style={reportModalStyles.reportFinishButtonBox}>
                            <TouchButton
                                onPress={finishReportModal}
                                width="100%"
                                backgroundColor={Colors.BLACK}
                                paddingVertical={12}>
                                <SemiBoldText text="확인" size={14} color={Colors.WHITE} />
                            </TouchButton>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={reportModalStyles.titleBox}>
                            <SemiBoldText text="신고 후 게시글 차단" color={Colors.BLACK} size={18} />
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
                                borderColor={Colors.STATUS_GRAY}
                                borderWidth={1}
                                flex={1}
                                paddingVertical={12}>
                                <SemiBoldText text="취소" size={14} color={Colors.STATUS_GRAY} />
                            </TouchButton>
                            <Spacer width={8} />
                            <TouchButton
                                onPress={reportMutateHandler}
                                backgroundColor={Colors.BLACK}
                                flex={1}
                                paddingVertical={12}>
                                <SemiBoldText text="신고하기" size={14} color={Colors.WHITE} />
                            </TouchButton>
                        </View>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default ReportModal;
