import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
import { numWithCommas } from '../utils/comma';

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

  let purchasedColor = purchased ? GREY_60_COLOR : GREEN_COLOR;
  let dateString = date ? date.toDate() : '';
  let couponmarketDate = dateString
    ? `${dateString.getUTCFullYear()}년 ${
        dateString.getUTCMonth() + 1
      }월 ${dateString.getUTCDate()} 일`
    : '';
  let postdealDate = dateString
    ? `${dateString.getUTCFullYear()}.${
        dateString.getUTCMonth() + 1
      }.${dateString.getUTCDate()}`
    : '';
  let imgSize =
    page == 'couponmarket'
      ? { height: 70, width: 100 }
      : { height: 85, width: 125 };
  let mainLeft =
    page == 'couponmarket'
      ? { flex: 1, justifyContent: 'flex-end' }
      : { flex: 2, justifyContent: 'flex-end' };
  let mainRight = page == 'couponmarket' ? { flex: 2 } : { flex: 3 };

  async function _purchaseItem() {
    await firestore()
      .collection('posts')
      .doc(couponId)
      .update({
        possibleNum: possibleNum - purchaseNum,
        purchased: possibleNum - purchaseNum == 0,
      });
    await firestore().collection('markethistory').add({
      brandName: brandName,
      date: firestore.FieldValue.serverTimestamp(),
      postedBy: postedBy,
      price: price,
      purchasedBy: currentUser,
      purchaseNum: purchaseNum,
    });
  }

  return (
    <View style={styles.item}>
      {page == 'couponmarket' ? (
        <View style={styles.header}>
          <Text style={styles.headerText}>{couponId}</Text>
          <Text style={styles.headerText}>{couponmarketDate}</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.main}>
        <View style={mainLeft}>
          <View style={[styles.brandImg, imgSize]}>
            <Text style={styles.brandImgAlt}>브랜드 이미지</Text>
          </View>
        </View>
        <View style={mainRight}>
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
                content={`${numWithCommas(totalNum)}개`}
              />
            </>
          ) : (
            <ItemInfo
              title="구매 가능 수량 (1인당)"
              content={`${numWithCommas(possibleNum)}개`}
            />
          )}
          <ItemInfo
            title="제시가 (1쿠폰 가격)"
            content={`${numWithCommas(price)}원`}
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
              onValueChange={(value, index) => setPurchaseNum(value)}>
              {numList.map((item) => (
                <Picker.Item label={item.toString()} value={item} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                '쿠폰 구매',
                `${brandName} 쿠폰을 ${purchaseNum}개 구매하시겠습니까?`,
                [
                  {
                    text: 'CANCEL',
                    onPress: () => console.log('쿠폰 구매를 취소합니다.'),
                  },
                  {
                    text: 'OK',
                    onPress: () => _purchaseItem(),
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
    backgroundColor: GREY_20_COLOR,
    borderRadius: 10,
    justifyContent: 'center',
  },
  brandImgAlt: {
    color: GREY_60_COLOR,
    fontSize: 10,
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
