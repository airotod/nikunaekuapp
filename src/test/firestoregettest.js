import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import TopBar from '../components/topbar';
import {
  BLACK_COLOR,
  GREY_10_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

const BrandItem = ({ brandName }) => {
  return (
    <View style={styles.brandItem}>
      <Text style={styles.brandName}>{brandName}</Text>
    </View>
  );
};

const FirestoreGetTest = ({ route, navigation }) => {
  const [brandList, setBrandList] = useState([]);
  const ref = firestore().collection('brands');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const { brandName } = doc.data();
        items.push({
          brandName: brandName,
        });
      });

      setBrandList(items);
    });
  }, []);

  return (
    <>
      <TopBar
        title="Firestore 데이터 가져오기"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoText}>아래에 브랜드 리스트가 보인다면 </Text>
          <Text style={styles.infoText}>
            <Text style={{ color: RED_COLOR }}>Firestore</Text>에서 데이터를
            성공적으로 불러온 것입니다.
          </Text>
          <Text style={styles.infoText}>
            일부만 보이는 경우 화면을 위아래로 움직여보세요.{' '}
          </Text>
        </View>
        <FlatList
          data={brandList}
          renderItem={({ item }) => <BrandItem {...item} />}
          keyExtractor={(item) => item.brandName}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  brandItem: {
    padding: 20,
    marginBottom: 2,
    backgroundColor: WHITE_COLOR,
  },
  brandName: {
    fontSize: 13,
    color: BLACK_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: GREY_10_COLOR,
    justifyContent: 'center',
  },
  info: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
  },
});

export default FirestoreGetTest;
