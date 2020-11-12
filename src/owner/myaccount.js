import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AccountItem from '../components/accountitem';
import TopBar from '../components/topbar';
import {
  GREY_40_COLOR,
  GREY_70_COLOR,
  GREY_80_COLOR,
  GREY_90_COLOR,
  WHITE_COLOR,
} from '../models/colors';

const USER = '한승희';
const PHONE = '+82 10-1234-1234';

const OwnerAccount = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="내 정보"
        navigation={navigation}
        drawerShown={true}
        titleColor={GREY_90_COLOR}
      />
      <View style={styles.container}>
        <View style={styles.myinfoContainer}>
          <View style={styles.personIconContainer}>
            <Icon name="person" size={50} color={GREY_40_COLOR} />
          </View>
          <View style={styles.myinfoTextContainer}>
            <Text style={styles.myinfoText}>{USER}</Text>
            <Text style={styles.myinfoText}>{PHONE}</Text>
          </View>
        </View>
        <View style={styles.navigationItemContainer}>
          <AccountItem
            text="로그아웃"
            onPress={() => console.log('로그아웃')}
          />
          <AccountItem
            text="비밀번호 변경"
            onPress={() => console.log('비밀번호 변경')}
          />
          <AccountItem
            text="내 카페 관리"
            onPress={() => console.log('내 카페 관리')}
          />
          <AccountItem
            text="결제수단 관리"
            onPress={() => console.log('결제수단 관리')}
          />
          <AccountItem
            text="탈퇴하기"
            onPress={() => console.log('탈퇴하기')}
          />
        </View>
        <View style={styles.flexContainer}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flexContainer: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
    width: '100%',
  },
  myinfoContainer: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    flexDirection: 'row',
    height: 135,
    paddingHorizontal: 12,
    paddingTop: 25,
  },
  myinfoText: {
    color: GREY_80_COLOR,
    fontSize: 18,
    marginVertical: 2,
  },
  myinfoTextContainer: {
    flex: 4,
    marginHorizontal: 15,
  },
  navigationItemContainer: {
    backgroundColor: WHITE_COLOR,
    marginVertical: 8,
    width: '100%',
  },
  personIconContainer: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    borderColor: GREY_70_COLOR,
    borderRadius: 50,
    borderWidth: 1,
    height: 70,
    justifyContent: 'center',
    margin: 15,
    width: 70,
  },
});

export default OwnerAccount;
