import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { Picker } from '@react-native-community/picker';

import {
  BLACK_COLOR,
  GREEN_COLOR,
  GREY_20_COLOR,
  GREY_40_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';
import {
  dateUTCWithDot,
  dateUTCWithKorean,
  numWithCommas,
} from '../utils/format';

const ItemInfo = ({ title, content, color }) => {
  return (
    <View style={styles.iteminfo}>
      <Text style={styles.iteminfoName}>{title}</Text>
      <Text
        style={[
          styles.iteminfoText,
          color ? { color: color } : { color: BLACK_COLOR },
        ]}>
        {content}
      </Text>
    </View>
  );
};

const DealItem = ({
  couponId,
  currentUser,
  brandLogo,
  brandName,
  date,
  page,
  possibleNum,
  postedBy,
  price,
  purchased,
  totalNum,
}) => {
  const numList = [...Array(possibleNum).keys()].map((item) => item + 1);
  const [purchaseNum, setPurchaseNum] = useState(numList[0]);
  const [msg, setMsg] = useState(null);
  const [point, setPoint] = useState(null);

  const dealRef = firestore().collection('DealCenter');
  const userRef = firestore().collection('User');

  let purchasedColor = purchased ? GREY_60_COLOR : GREEN_COLOR;
  let dateString = date ? date.toDate() : '';
  let couponmarketDate = dateString ? dateUTCWithKorean(dateString) : '';
  let postdealDate = dateString ? dateUTCWithDot(dateString) : '';
  let imgSize =
    page == 'couponmarket'
      ? { height: 72, width: 120 }
      : { height: 75, width: 125 };

  async function _purchaseItem() {
    await dealRef.doc(couponId).update({
      availableAmount: possibleNum - purchaseNum,
      onSale: possibleNum - purchaseNum !== 0,
    });
    await userRef.doc(currentUser).update({
      usedPoint: firebase.firestore.FieldValue.increment(price * purchaseNum),
      totalPoint: firebase.firestore.FieldValue.increment(-price * purchaseNum),
    });
    console.log(currentUser, brandName, purchaseNum);
    await userRef
      .doc(currentUser)
      .collection('coupons')
      .doc(brandName)
      .update({
        count: firebase.firestore.FieldValue.increment(purchaseNum),
    });
    await userRef
      .doc(currentUser)
      .collection('dealLog')
      .add({
        brandLogo: brandLogo,
        brandName: brandName,
        couponNum: purchaseNum,
        dateTime: firestore.FieldValue.serverTimestamp(),
        dealType: '구매',
        totalPrice: price * purchaseNum,
        trader: postedBy,
    });
    await userRef
      .doc(postedBy)
      .collection('dealLog')
      .add({
        brandLogo: brandLogo,
        brandName: brandName,
        couponNum: purchaseNum,
        dateTime: firestore.FieldValue.serverTimestamp(),
        dealType: '판매',
        totalPrice: price * purchaseNum,
        trader: currentUser,
    });
    let userPoint = null;
    await userRef.doc(currentUser).get().then(async function (doc) {
      userPoint = doc.data().totalPoint
    });
    await userRef
      .doc(currentUser)
      .collection('pointLog')
      .add({
        balance: userPoint,
        brandID: brandName,
        count: purchaseNum,
        dateTime: firestore.FieldValue.serverTimestamp(),
        pointType: "포인트 사용",
        pointVolumn: -purchaseNum * price,
        trader: postedBy,
    });
    let opponentPoint = null;
    await userRef.doc(postedBy).get().then(async function (doc) {
      opponentPoint = doc.data().totalPoint
    });
    await userRef
      .doc(postedBy)
      .collection('pointLog')
      .add({
        balance: opponentPoint,
        brandID: brandName,
        count: purchaseNum,
        dateTime: firestore.FieldValue.serverTimestamp(),
        pointType: "포인트 적립",
        pointVolumn: purchaseNum * price,
        trader: currentUser,
    });
  }

  useEffect(() => {
    userRef.doc(currentUser).onSnapshot(function (doc) {
      if (doc.exists) {
        setPoint(doc.data().totalPoint);
      }
    });
  }, []);

  return (
    <View style={styles.item}>
      {page == 'couponmarket' ? (
        <View style={styles.header}>
          <Text style={styles.headerText}>{couponmarketDate}</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.main}>
        <View style={styles.mainLeft}>
          <Image
            style={[styles.brandImg, imgSize]}
            source={{ uri: brandLogo }}
          />
        </View>
        <View style={styles.mainRight}>
          <View style={styles.iteminfo}>
            <Text style={styles.brandName}>{brandName}</Text>
            <View
              style={[
                styles.statusContainer,
                { backgroundColor: purchasedColor },
              ]}>
              <Text style={[styles.status]}>
                {purchased ? '판매완료' : '판매중'}
              </Text>
            </View>
          </View>
          {page == 'postdeal' ? (
            <>
              <ItemInfo title="쿠폰 판매 등록 날짜" content={postdealDate} />
              <ItemInfo
                title="총 쿠폰 개수"
                content={`${numWithCommas(totalNum || 0)}개`}
              />
            </>
          ) : (
            <ItemInfo
              title="구매 가능 수량 (1인당)"
              content={`${numWithCommas(possibleNum || 0)}개`}
            />
          )}
          <ItemInfo
            title="제시가 (1쿠폰 가격)"
            content={`${numWithCommas(price || 0)}원`}
          />
        </View>
      </View>
      {!purchased && currentUser !== postedBy ? (
        <View style={styles.purchaseContainer}>
          <View style={styles.purchaseinfoContainer}>
            <Text style={styles.purchaseinfo}>구매 개수 :</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={purchaseNum}
              style={styles.picker}
              onValueChange={(value, index) => {
                if (point < value * price) {
                  setMsg('포인트가 부족합니다.');
                } else {
                  setMsg('');
                }
                setPurchaseNum(value);
              }}>
              {numList.map((item) => (
                <Picker.Item label={item.toString()} value={item} key={item} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                '쿠폰 구매',
                msg
                  ? msg
                  : `${brandName} 쿠폰을 ${purchaseNum}개 구매하시겠습니까?`,
                [
                  {
                    text: 'CANCEL',
                    onPress: () => {},
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      if (point >= purchaseNum * price) {
                        _purchaseItem();
                      }
                    },
                  },
                ],
              );
            }}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>구매</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  brandImg: {
    alignItems: 'center',
    borderColor: GREY_20_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  brandName: {
    color: BLACK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    flex: 1,
    height: 25,
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: WHITE_COLOR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  headerText: {
    color: GREY_40_COLOR,
    fontSize: 12,
  },
  item: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: WHITE_COLOR,
    marginBottom: 2,
  },
  iteminfo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iteminfoName: {
    color: GREY_60_COLOR,
    fontSize: 12,
    marginVertical: 2,
  },
  iteminfoText: {
    fontSize: 12,
  },
  main: {
    flexDirection: 'row',
  },
  mainLeft: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainRight: {
    flex: 1.5,
  },
  picker: {
    color: BLACK_COLOR,
    height: 25,
  },
  pickerContainer: {
    alignContent: 'center',
    borderColor: GREY_20_COLOR,
    borderWidth: 1,
    flex: 3,
    height: 25,
    justifyContent: 'center',
  },
  purchaseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  purchaseinfo: {
    color: BLACK_COLOR,
  },
  purchaseinfoContainer: {
    flex: 2,
  },
  status: {
    color: WHITE_COLOR,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 13,
  },
  statusContainer: {
    width: 65,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});

export default DealItem;
