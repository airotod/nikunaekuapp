import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TopBar from '../components/topbar';
import { BLACK_COLOR, GREY_10_COLOR, RED_COLOR } from '../models/colors';

import { data } from './firestoredata';

const UploadFirestoreButton = () => {
  const collections = data;
  const db = firestore();

  function _restoreHandler() {
    Alert.alert(
      '데이터 업로드',
      'json 형태의 데이터를 전부 업로드하시겠습니까? 단, 계속 진행 시 복구가 불가능합니다.',
      [
        {
          text: '취소',
          onPresse: () => {},
        },
        {
          text: '진행',
          onPress: () => {
            for (let key in collections[0]) {
              let ref = db.collection(key);
              let value = collections[0][key];
              value.forEach((doc) => {
                console.log(doc);
                ref.add(doc);
              });
            }
          },
        },
      ],
    );
  }

  return (
    <View style={styles.iconContainer}>
      <Icon
        name="cloud-upload"
        size={30}
        color={BLACK_COLOR}
        onPress={_restoreHandler}
      />
    </View>
  );
};

const FirestoreUploadTest = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="Firestore 데이터 업로드하기"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoText}>Json 형태의 데이터를 업로드하려면</Text>
          <Text>
            <Text style={{ color: RED_COLOR }}>src/test/firestoredata.js</Text>
          </Text>
          <Text>에 데이터를 Json 형태로 저장한 후 아래의</Text>
          <Text style={styles.infoText}>
            <Icon name="cloud-upload" size={15} color={RED_COLOR} /> 버튼을
            눌러보세요.
          </Text>
        </View>
        <UploadFirestoreButton />
        <View style={styles.info}>
          <Text style={styles.infoText}>
            업로드된 데이터는 Firestore에서 확인하세요.
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_10_COLOR,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  info: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
  },
});

export default FirestoreUploadTest;
