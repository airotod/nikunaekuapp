import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NavigateButton from '../components/navigatebutton';
import TopBar from '../components/topbar';
import {
  BLACK_COLOR,
  GREY_10_COLOR,
  GREY_90_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

const AddBrandForm = () => {
  const [brand, setBrand] = useState(null);
  const ref = firestore().collection('brands');

  function _addHandler() {
    Alert.alert('브랜드 추가', '브랜드 리스트에 추가하겠습니까?', [
      {
        text: '취소',
        onPresse: () => {},
      },
      {
        text: '추가',
        onPress: async () => {
          await ref.add({
            brandName: brand,
          });
          setBrand(null);
        },
      },
    ]);
  }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="예) 투썸플레이스"
        onChangeText={(text) => {
          setBrand(text);
        }}
        value={brand}
        clearButtonMode="always"
        autoFocus={true}
      />
      <View style={styles.iconContainer}>
        <Icon name="add" size={30} color={BLACK_COLOR} onPress={_addHandler} />
      </View>
    </View>
  );
};

const FirestoreAddTest = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="Firestore 데이터 추가하기"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoText}>
            추가하려는 브랜드 이름을 입력한 후
          </Text>
          <Text style={styles.infoText}>
            <Icon name="add" size={15} color={RED_COLOR} /> 버튼을 눌러보세요.
          </Text>
        </View>
        <AddBrandForm />
        <View style={styles.info}>
          <Text style={styles.infoText}>
            <Text style={{ color: RED_COLOR }}>Firestore 데이터 가져오기</Text>{' '}
            버튼을 눌러
          </Text>
          <Text style={styles.infoText}>브랜드 리스트를 확인해보세요.</Text>
        </View>
        <View style={styles.iconContainer}>
          <NavigateButton
            text="Firestore 데이터 가져오기"
            navigation={navigation}
          />
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
  form: {
    alignSelf: 'center',
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    marginVertical: 10,
    shadowColor: GREY_90_COLOR,
    width: '70%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
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

export default FirestoreAddTest;
