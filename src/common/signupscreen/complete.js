import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';

import TopBar from '../../components/topbar';
import { BLACK_COLOR, RED_COLOR } from '../../models/colors';
import { AuthContext } from '../../utils/context';

export default function Complete({ route, navigation }) {
  async function _handleHome() {
    AsyncStorage.removeItem('userType');
  }

  return (
    <AuthContext.Consumer>
      {({ signOut }) => (
        <>
          <TopBar
            title="매장 등록 절차"
            navigation={navigation}
            barColor={BLACK_COLOR}
          />
          <View style={styles.container}>
            <Text style={styles.largeText}>신청 완료</Text>
            <Text style={styles.redText}>신청해주셔서 감사합니다.</Text>
            <Text style={styles.smallText}>
              입력하신 정보를 기준으로 심사가 진행됩니다.{'\n'}영업일 기준 5일
              이내로 결과를 알려드리겠습니다.
            </Text>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                signOut();
                _handleHome();
              }}>
              <Icon name="home" size={30} color={RED_COLOR} />
              <Text style={styles.iconText}> 홈으로 이동</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 25,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 100,
    width: '80%',
  },
  iconText: {
    color: BLACK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  largeText: {
    color: BLACK_COLOR,
    fontSize: 36,
    fontWeight: 'bold',
  },
  redText: {
    color: RED_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 50,
  },
  smallText: {
    color: BLACK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
