import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BLACK_COLOR,
  WHITE_COLOR,
  RED_COLOR,
  GREY_70_COLOR,
  GREEN_COLOR,
} from '../../models/colors';
import { dateUTCWithKorean } from '../../utils/format';
import { ScrollView } from 'react-native-gesture-handler';

const chartWidth = Dimensions.get('window').width;
const charHeight = Dimensions.get('window').height;

const CouponLogItem = ({ count, couponType, dateTime, storeID, trader }) => {
  let IconItem = null;
  let dateItems = dateUTCWithKorean(dateTime.toDate());
  let detailContent = null;
  let traderContent = null;

  if (couponType == '사용' || couponType == '판매') {
    IconItem = (
      <View style={styles.itemcontainer}>
        <Image
          style={styles.imageItem}
          source={require('../brandDetailTab/myCoupon_images/use_image.png')}
        />
        <Text style={styles.couponText_use}>{count}개</Text>
      </View>
    );
  } else {
    IconItem = (
      <View style={styles.itemcontainer}>
        <Image
          style={styles.imageItem}
          source={require('../brandDetailTab/myCoupon_images/reward_image.png')}
        />
        <Text style={styles.couponText_reward}>+{count}개</Text>
      </View>
    );
  }

  if (couponType == '적립' || couponType == '사용') {
    detailContent = (
      <Text style={styles.detailText}>
        {storeID} {count}개
      </Text>
    );
  } else if (couponType == '구매' || couponType == '판매') {
    detailContent = (
      <Text style={styles.detailText}>
        {trader} {count}개
      </Text>
    );
  }

  return (
    <View style={styles.listcontainer}>
      {IconItem}
      <View style={styles.linecontainer}>
        <Image
          style={styles.lineItem}
          source={require('../brandDetailTab/myCoupon_images/line_image.png')}
        />
      </View>
      <View style={styles.contextcontainer}>
        <View style={styles.detailcontainer}>
          <Text style={styles.dateText}>{dateItems}</Text>
          <View style={styles.detailcontainer2}>
            <Text style={styles.logtitleText}>{couponType} - </Text>
            {traderContent} 
            <View style={styles.balancecontainer}>{detailContent}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const MyCouponLog = ({ route, navigation }) => {
  const [pointLogList, setCouponLogList] = useState(null);
  const [selectedValue, setSelectedValue] = useState('전체');
  const { data, otherParam } = route.params;

  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        let ref = firestore()
          .collection('User')
          .doc(getUserId)
          .collection('coupons')
          .doc(data.id)
          .collection('couponLog')
          .orderBy('dateTime', 'desc');
        ref.onSnapshot((querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            const { count, couponType, dateTime, storeID, trader } = doc.data();
            if (selectedValue == '전체') {
              items.push({
                count: count,
                couponType: couponType,
                dateTime: dateTime,
                storeID: storeID,
                trader: trader,
              });
            } else if (selectedValue == '적립') {
              if (couponType == '적립') {
                items.push({
                  count: count,
                  couponType: couponType,
                  dateTime: dateTime,
                  storeID: storeID,
                  trader: trader,
                });
              }
            } else if (selectedValue == '사용') {
              if (couponType == '사용') {
                items.push({
                  count: count,
                  couponType: couponType,
                  dateTime: dateTime,
                  storeID: storeID,
                  trader: trader,
                });
              }
            } else if (selectedValue == '구매') {
              if (couponType == '구매') {
                items.push({
                  count: count,
                  couponType: couponType,
                  dateTime: dateTime,
                  storeID: storeID,
                  trader: trader,
                });
              }
            } else if (selectedValue == '판매') {
              if (couponType == '판매') {
                items.push({
                  count: count,
                  couponType: couponType,
                  dateTime: dateTime,
                  storeID: storeID,
                  trader: trader,
                });
              }
            }
          });
          setCouponLogList(items);
        });
      } catch (e) {
        console.log('Restoring Id failed or Get point log data failed');
      }
    };
    getUserIdAsync();
  }, [selectedValue]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectcontainer}>
          <Picker
            mode="dropdown"
            selectedValue={selectedValue}
            style={styles.pickerstyle}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
            }}>
            <Picker.Item label="전체" value="전체" />
            <Picker.Item label="적립" value="적립" />
            <Picker.Item label="사용" value="사용" />
            <Picker.Item label="구매" value="구매" />
            <Picker.Item label="판매" value="판매" />
          </Picker>
        </View>
        <ScrollView style={styles.maincontainer}>
          <FlatList
            data={pointLogList}
            renderItem={({ item }) => <CouponLogItem {...item} />}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  selectcontainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerstyle: {
    height: 40,
    width: 100,
  },
  maincontainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    height: charHeight - 200,
  },
  listcontainer: {
    height: 100,
    width: chartWidth,
    flexDirection: 'row',
    marginBottom: 2,
    backgroundColor: WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemcontainer: {
    height: 800,
    width: 70,
    flexDirection: 'column',
    margin: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageItem: {
    height: 40,
    width: 40,
    margin: 2,
  },
  couponText_use: {
    margin: 5,
    fontSize: 16,
    color: RED_COLOR,
  },
  couponText_reward: {
    margin: 5,
    fontSize: 16,
    color: GREEN_COLOR,
  },
  linecontainer: {
    height: 100,
    width: 20,
    justifyContent: 'center',
  },
  lineItem: {
    height: 70,
    width: 2,
    margin: 2,
  },
  contextcontainer: {
    height: 100,
    width: chartWidth - 140,
    flexDirection: 'column',
  },
  detailcontainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    justifyContent: 'center',
  },
  dateText: {
    color: GREY_70_COLOR,
    marginVertical: 8,
  },
  logtitleText: {
    fontSize: 16,
  },
  detailcontainer2: {
    marginRight: 12,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balancecontainer: {
    flex: 1,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    color: GREY_70_COLOR,
  },
  balanceText: {
    fontSize: 12,
    color: GREY_70_COLOR,
  },
});

export default MyCouponLog;
