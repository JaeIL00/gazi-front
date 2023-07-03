import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { ReportModalProps } from '../../../types/types';
import { reportModalStyles } from '../../../styles/styles';

const ReportModal = ({ isReportSuccess, reportTopicHandler, closeReportModalHandler }: ReportModalProps) => {
    const TOPIC_LIST = ['부적절한 글', '거짓 정보', '광고/홍보성 글', '남을 비방/차별/혐오하는 글', '기타'];
    const [reportTopic, setReportTopic] = useState<string>('');

    const radioButtonTopic = useCallback(
        (topic: string) => (
            <TouchableOpacity
                key={topic}
                onPressIn={() => setReportTopic(topic)}
                style={reportModalStyles.topicRadioButton}
                hitSlop={10}
                activeOpacity={1}>
                <View
                    style={[
                        reportModalStyles.radio,
                        {
                            borderColor: reportTopic === topic ? '#6826F5' : Colors.BORDER_GRAY,
                        },
                    ]}>
                    {reportTopic === topic && <View style={reportModalStyles.radioInnerCircle} />}
                </View>
                <NormalText text={topic} size={15} color="#777777" />
            </TouchableOpacity>
        ),
        [reportTopic],
    );

    return (
        <View style={reportModalStyles.container}>
            {isReportSuccess ? (
                <>
                    <View style={reportModalStyles.titleBox}>
                        <SemiBoldText text="신고가 완료되었습니다" color={Colors.BLACK} size={18} />
                    </View>
                    <View style={reportModalStyles.reportFinishButtonBox}>
                        <TouchButton
                            onPress={closeReportModalHandler}
                            width="100%"
                            backgroundColor={Colors.BLACK}
                            paddingVertical={12}>
                            <SemiBoldText text="신고하기" size={14} color={Colors.WHITE} />
                        </TouchButton>
                    </View>
                </>
            ) : (
                <>
                    <View style={reportModalStyles.titleBox}>
                        <SemiBoldText text="신고 후 게시글 차단" color={Colors.BLACK} size={18} />
                    </View>

                    <View style={reportModalStyles.topicRadioButtonBox}>{TOPIC_LIST.map(radioButtonTopic)}</View>

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
                            onPress={reportTopicHandler}
                            backgroundColor={Colors.BLACK}
                            flex={1}
                            paddingVertical={12}>
                            <SemiBoldText text="신고하기" size={14} color={Colors.WHITE} />
                        </TouchButton>
                    </View>
                </>
            )}
        </View>
    );
};

export default ReportModal;
