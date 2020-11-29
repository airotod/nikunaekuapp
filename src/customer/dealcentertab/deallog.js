import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Loading from '../../components/loading';
import DealLogItem from '../../components/deallogitem';

import {
  BLACK_COLOR,
  GREY_20_COLOR,
  GREY_60_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { sortByDate } from '../../utils/sortby';
import { numWithCommas } from '../../utils/format';

const DealLog = ({ route, navigation }) => {
  const { userId, phone, otherParam } = route.params;
  const [loading, setLoading] = useState(true);
  const [userPoint, setUserPoint] = useState(0);
  const [wholeItemList, setWholeItemList] = useState([]);

  const userRef = firestore().collection('User').doc(userId);

  useEffect(() => {
    userRef.onSnapshot(function (doc) {
      if (doc.exists) {
        setUserPoint(doc.data().totalPoint);
      }
    });

    return userRef.collection('dealLog').onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const {
          brandLogo,
          brandName,
          couponNum,
          dateTime,
          dealType,
          totalPrice,
          trader,
        } = doc.data();
        items.push({
          couponId: doc.id,
          brandLogo: brandLogo,
          brandName: brandName,
          date: dateTime,
          postedBy: (dealType === '구매' && trader) || userId,
          totalPrice: totalPrice,
          purchaseNum: couponNum,
          purchasedBy: (dealType === '구매' && userId) || trader,
          isPurchaseLog: dealType === '구매',
        });
      });
      setWholeItemList(sortByDate(items));

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pointContainer}>
          <Text style={styles.pointTitle}>My 포인트</Text>
          <Text style={styles.point}>{numWithCommas(userPoint)}</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('포인트 내역 상세보기');
            }}
            style={styles.pointDetailContainer}>
            <Text style={styles.pointDetail}>포인트 내역 상세보기</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : wholeItemList ? (
          <FlatList
            data={wholeItemList}
            renderItem={({ item }) => <DealLogItem {...item} />}
            keyExtractor={(item) => item.couponId}
          />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>데이터가 존재하지 않습니다.</Text>
          </View>
        )}
        <View style={styles.flex}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: BLACK_COLOR,
    fontSize: 14,
  },
  mainText: {
    color: BLACK_COLOR,
  },
  point: {
    color: BLACK_COLOR,
    fontSize: 45,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pointContainer: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    borderBottomColor: GREY_20_COLOR,
    borderBottomWidth: 2,
    marginBottom: 4,
    paddingVertical: 20,
  },
  pointDetail: {
    color: BLACK_COLOR,
    fontSize: 16,
  },
  pointDetailContainer: {
    alignItems: 'center',
    borderColor: BLACK_COLOR,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    marginTop: 6,
    width: '80%',
  },
  pointTitle: {
    color: GREY_60_COLOR,
    fontSize: 14,
  },
});

export default DealLog;
