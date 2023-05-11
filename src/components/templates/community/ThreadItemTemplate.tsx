import React from 'react';
import { FlatList, Image, Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { ThreadItemTemplateProps } from '../../../types/types';
import { threadItemTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
const dummy = {
    content: '',
    distance: '160m',
    headKeyword: 2,
    latitude: 37.4988341,
    longitude: 127.0261778,
    postId: 59,
    rePostCount: 0,
    thumbNail:
        'https://gazimapbucket.s3.ap-northeast-2.amazonaws.com/thumbnail/929ccc1c07-759b-4695-9264-b5a33df0b7a52023-05-11',
    time: '1시간 전',
    title: '강남역 ',
};
const listDummy = [
    {
        distance: '8064Km',
        content:
            '국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다. 국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을 받아 행정각부를 통할한다. 제1항의 지시를 받은 당해 행정기관은 이에 응하여야 한다.',
        fileList: [
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
        ],
        nickName: 'kakadoi',
        time: '2분 전',
        likeCount: 0,
        keywordIdList: [2, 3],
        like: false,
        report: false,
    },
    {
        distance: '8064Km',
        content: '이쪽으로 안오시는게 좋아요.',
        fileList: [
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
        ],
        nickName: 'kakadoi',
        time: '2분 전',
        likeCount: 0,
        keywordIdList: [2, 3],
        like: false,
        report: false,
    },
    {
        distance: '8064Km',
        content: '이쪽으로 안오시는게 좋아요.',
        fileList: [
            {
                fileName: 'postFile/36cf863b4c-3b85-4d39-892b-1747e4203b062023-05-11',
                fileUrl:
                    'https://pds.joongang.co.kr/news/component/joongang_sunday/202209/03/c9f999b5-d32d-4a06-bdfc-02aff4755ffb.jpg',
            },
        ],
        nickName: 'kakadoi',
        time: '2분 전',
        likeCount: 0,
        keywordIdList: [2, 3],
        like: false,
        report: false,
    },
];
const ThreadItemTemplate = ({ movetoCommunityScreen }: ThreadItemTemplateProps) => {
    return (
        <>
            <View style={threadItemTemplateStyles.backButtonBox}>
                {Platform.OS === 'android' && (
                    <DropShadow style={threadItemTemplateStyles.backButtonShadow}>
                        <TouchButton
                            onPress={movetoCommunityScreen}
                            backgroundColor="#FFFFFF80"
                            width={36}
                            height={(36 / screenHeight) * screenWidth}
                            borderRadius={36}>
                            <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={22} />
                        </TouchButton>
                    </DropShadow>
                )}
            </View>

            <View style={threadItemTemplateStyles.mapCrop}></View>

            <View style={threadItemTemplateStyles.main}>
                <View style={threadItemTemplateStyles.headerBox}>
                    <View>
                        <NormalText text={dummy.distance} size={12} color={Colors.TXT_GRAY} />
                        <Spacer height={4} />
                        <SemiBoldText text={dummy.title} size={20} color={Colors.BLACK} />
                        <Spacer height={4} />
                        <NormalText
                            text={`${dummy.rePostCount} posts • updated ${dummy.time}`}
                            size={12}
                            color={Colors.BLACK}
                        />
                    </View>
                    <Image
                        source={require('../../../assets/icons/share.png')}
                        style={threadItemTemplateStyles.shareIcon}
                    />
                </View>

                <View
                    style={{
                        position: 'relative',
                    }}>
                    <View
                        style={{
                            borderLeftWidth: 1 * screenFont,
                            borderColor: '#EBEBEB',
                            position: 'absolute',
                            top: 42 * screenHeight,
                            left: 2.8 * screenWidth,
                            width: 1 * screenWidth,
                            height: '100%',
                        }}
                    />
                    <FlatList
                        data={listDummy}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', width: '94%' }}>
                                <View
                                    style={{
                                        width: 6 * screenWidth,
                                        height: 6 * screenWidth,
                                        backgroundColor: '#D9D9D9',
                                        borderRadius: 6 * screenFont,
                                        marginRight: 14 * screenWidth,
                                        marginTop: 18 * screenHeight,
                                    }}
                                />
                                {/* 헤더 */}
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View
                                                    style={{
                                                        width: 36 * screenWidth,
                                                        height: 36 * screenWidth,
                                                        backgroundColor: '#999',
                                                        borderRadius: 36 * screenFont,
                                                    }}></View>
                                                <View style={{ paddingLeft: 7 * screenWidth }}>
                                                    <SemiBoldText text={item.nickName} size={16} color={Colors.BLACK} />
                                                    <Spacer height={1} />
                                                    <MediumText
                                                        text={`${item.distance} | ${item.time}`}
                                                        size={11}
                                                        color="#999999"
                                                    />
                                                </View>
                                            </View>
                                            <TouchButton onPress={() => {}}>
                                                <MediumText text="신고하기" size={11} color={Colors.BLACK} />
                                            </TouchButton>
                                        </View>
                                    </View>

                                    {/* 내용 및 라이크 */}
                                    <View style={{ paddingTop: 8 * screenHeight }}>
                                        <NormalText text={item.content} size={13} color="#000000" />
                                        <Spacer height={8} />
                                        {item.fileList.length === 1 && (
                                            <TouchButton onPress={() => {}} width={308} height={208}>
                                                <Image
                                                    source={{ uri: item.fileList[0].fileUrl }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: 5 * screenFont,
                                                    }}
                                                />
                                            </TouchButton>
                                        )}
                                        {item.fileList.length === 2 && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    // backgroundColor: 'tomato',
                                                }}>
                                                {item.fileList.map(file => (
                                                    <TouchButton onPress={() => {}} width={151} height={208}>
                                                        <Image
                                                            source={{ uri: file.fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                ))}
                                            </View>
                                        )}
                                        {item.fileList.length === 3 && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: 208 * screenHeight,
                                                }}>
                                                <View style={{ width: '49%' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={208}>
                                                        <Image
                                                            source={{ uri: item.fileList[0].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                </View>
                                                <View style={{ width: '49%', justifyContent: 'space-between' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[1].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[2].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                </View>
                                            </View>
                                        )}
                                        {(item.fileList.length === 4 || item.fileList.length > 4) && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: 208 * screenHeight,
                                                }}>
                                                <View style={{ width: '49%', justifyContent: 'space-between' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[0].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[1].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                </View>
                                                <View style={{ width: '49%', justifyContent: 'space-between' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[2].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                    {item.fileList.length > 4 ? (
                                                        <TouchButton onPress={() => {}} width={151} height={101}>
                                                            <>
                                                                <Image
                                                                    source={{ uri: item.fileList[3].fileUrl }}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        borderRadius: 5 * screenFont,
                                                                    }}
                                                                />
                                                                <View
                                                                    style={{
                                                                        backgroundColor: '#171717CC',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        position: 'absolute',
                                                                        borderRadius: 5 * screenFont,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                    <MediumText
                                                                        text={`+${item.fileList.length - 3}`}
                                                                        size={18}
                                                                        color={Colors.WHITE}
                                                                    />
                                                                </View>
                                                            </>
                                                        </TouchButton>
                                                    ) : (
                                                        <TouchButton onPress={() => {}} width={151} height={101}>
                                                            <Image
                                                                source={{ uri: item.fileList[3].fileUrl }}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    borderRadius: 5 * screenFont,
                                                                }}
                                                            />
                                                        </TouchButton>
                                                    )}
                                                </View>
                                            </View>
                                        )}
                                    </View>

                                    <Spacer height={9} />

                                    <TouchButton onPress={() => {}} alignSelf="flex-start">
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icons type="feather" name="thumbs-up" size={15} color={Colors.TXT_GRAY} />
                                            <Spacer width={2} />
                                            <NormalText
                                                text={`도움돼요 ${item.likeCount}`}
                                                size={13}
                                                color={Colors.TXT_GRAY}
                                            />
                                        </View>
                                    </TouchButton>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{
                            marginTop: 24 * screenHeight,
                            paddingBottom: 20 * screenHeight,
                        }}
                        ItemSeparatorComponent={() => <Spacer height={29} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    );
};

export default ThreadItemTemplate;
