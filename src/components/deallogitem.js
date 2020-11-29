import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import {
  BLACK_COLOR,
  BLUE_COLOR,
  GREY_10_COLOR,
  GREY_20_COLOR,
  GREY_60_COLOR,
  GREY_80_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';
import { dateUTCWithDot, numWithCommas } from '../utils/format';

const Item = ({ title, content, color }) => {
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

const DealLogItem = ({
  couponId,
  brandLogo,
  brandName,
  date,
  postedBy,
  // price,
  totalPrice,
  purchaseNum,
  purchasedBy,
  isPurchaseLog,
}) => {
  let purchasedColor = isPurchaseLog ? GREY_80_COLOR : BLUE_COLOR;
  let dateString = date ? date.toDate() : '';
  let dealDate = dateString ? dateUTCWithDot(dateString) : '';

  return (
    <View style={styles.item}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{dealDate}</Text>
        <View style={styles.dateLine}></View>
      </View>
      <View style={styles.main}>
        <View style={styles.mainLeft}>
          <View
            style={[
              styles.statusContainer,
              { backgroundColor: purchasedColor },
            ]}>
            <Text style={[styles.status]}>
              {isPurchaseLog ? '구매내역' : '판매내역'}
            </Text>
          </View>
          <Image style={styles.brandImg} source={{ uri: brandLogo }} />
        </View>
        <View style={styles.mainRight}>
          <Item title="브랜드명" content={brandName} />
          <Item
            title={isPurchaseLog ? '판매자' : '구매자'}
            content={isPurchaseLog ? postedBy : purchasedBy}
          />
          <Item title="쿠폰 개수" content={`${numWithCommas(purchaseNum)}개`} />
          {/* <Item
            title="제시가(1쿠폰 가격)"
            content={`${numWithCommas(price)}원`}
          /> */}
          <Item
            title="총 금액"
            content={`${numWithCommas(totalPrice)}원`}
            color={RED_COLOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  brandImg: {
    alignItems: 'center',
    borderRadius: 10,
    borderColor: GREY_20_COLOR,
    borderWidth: 1,
    height: 75,
    justifyContent: 'center',
    width: 125,
  },
  date: {
    color: BLACK_COLOR,
    fontSize: 13,
    marginRight: 10,
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
  },
  dateLine: {
    backgroundColor: GREY_10_COLOR,
    flex: 1,
    height: 2.5,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: WHITE_COLOR,
  },
  iteminfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iteminfoName: {
    color: GREY_60_COLOR,
    fontSize: 13,
    marginVertical: 2,
  },
  iteminfoText: {
    fontSize: 13,
  },
  main: {
    flexDirection: 'row',
  },
  mainLeft: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mainRight: {
    flex: 1.2,
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
    margin: 5,
  },
});

export default DealLogItem;
