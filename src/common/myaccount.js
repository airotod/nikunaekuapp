<<<<<<< HEAD:src/common/myaccount.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
=======
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
>>>>>>> dev:src/owner/myaccount.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

import AccountItem from '../components/accountitem';
import TopBar from '../components/topbar';
import {
  BLUE_COLOR,
  GREY_40_COLOR,
  GREY_70_COLOR,
  GREY_80_COLOR,
  GREY_90_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';
import { AuthContext } from '../utils/context';

<<<<<<< HEAD:src/common/myaccount.js
const MyAccount = ({ route, navigation }) => {
  const { userId, phone, otherParam } = route.params;
=======
const PHONE = '+82 10-1234-1234';

const OwnerAccount = ({ route, navigation }) => {
  const [userId, setUserId] = useState(null);
  const [logo, setLogo] = useState(null); 
  
  const ref = firestore().collection('User');

  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        setUserId(getUserId);
        ref.doc(getUserId).get().then(async function (doc) {
          if (doc.exists) {
            setLogo(doc.data().cafeLogo);
            console.log('logo: ', logo);
          }
        })
      } catch (e) {
        // Restoring Id failed
        console.log('Restoring Id failed');
      }
    };
    getUserIdAsync();
  }, []);
>>>>>>> dev:src/owner/myaccount.js

  async function _handleSignOut() {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userType');
    await AsyncStorage.removeItem('phoneNumber');
  }

  return (
    <AuthContext.Consumer>
      {({ signOut }) => (
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
                {logo ? <Image source={{uri: logo}} style={{resizeMode: "stretch", height: 80, width: 80, borderRadius: 80}}/>
                : <Icon name="person" size={50} color={GREY_40_COLOR} /> }
              </View>
              <View style={styles.myinfoTextContainer}>
                <Text style={styles.myinfoText}>{userId} 님</Text>
                <Text style={styles.myinfoText}>{phone}</Text>
              </View>
            </View>
            <View style={styles.navigationItemContainer}>
              <AccountItem
                text="로그아웃"
                onPress={() => {
                  signOut();
                  _handleSignOut();
                }}
              />
              <AccountItem
                text="비밀번호 변경"
                onPress={() => console.log('비밀번호 변경')}
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
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  benefitsText: {
    color: BLUE_COLOR,
    fontSize: 13,
  },
  benefitsTextContainer: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  crownIconContainer: {
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    margin: 15,
    width: 70,
  },
  eventBanner: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    flexDirection: 'row',
    height: 90,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  eventText: {
    color: GREY_80_COLOR,
    fontSize: 14,
  },
  eventTextHighlight: {
    color: RED_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
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
    marginBottom: 8,
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

export default MyAccount;
