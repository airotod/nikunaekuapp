import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View, Image, Dimensions, LogBox} from 'react-native';
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  BLACK_COLOR,
  WHITE_COLOR, 
  RED_COLOR,
  GREY_70_COLOR,
  GREEN_COLOR
} from '../../models/colors';
import { dateUTCWithKorean } from '../../utils/format'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const chartWidth = Dimensions.get('window').width;
const charHeight = Dimensions.get('window').height;

const PointLogItem = ({balance, dateTime, pointVolume, pointType, trader, count, brandID }) => {
  let IconItem = null;
  let dateItems = dateTime && dateUTCWithKorean(dateTime.toDate());
  let detailContent = null;
  let traderContent = null;

  if (pointType=="포인트 사용" || pointType=="포인트 선물" || pointType=="포인트 인출") {
    IconItem = <View style={styles.itemcontainer}>
                  <Image
                  style={styles.imageItem}
                  source={require('./mypoint_images/use_image.png')} />
                  <Text style={styles.pointText_use}>{pointVolume}원</Text>
                </View>;
  } else {
    IconItem = <View style={styles.itemcontainer}>
                  <Image
                  style={styles.imageItem}
                  source={require('./mypoint_images/reward_image.png')} />
                  <Text style={styles.pointText_reward}>+{pointVolume}원</Text>
                </View>;
  }

  if (pointType=="포인트 충전" || pointType=="포인트 인출") {
    detailContent = <Text style={styles.detailText}></Text>;
  } else if (pointType=="포인트 선물") {
    detailContent = <Text style={styles.detailText}>{trader}</Text>;
  } else if (pointType=="포인트 선물 적립") {
    detailContent = <Text style={styles.detailText}>{trader}</Text>;
  } else {
    detailContent = <Text style={styles.detailText}>{brandID} {count}개</Text>;
    traderContent = <Text style={styles.detailText}>{trader}</Text>;
  }
  return (
      <View style={styles.listcontainer}>     
        {IconItem}      
        <View style={styles.linecontainer}>
          <Image
            style={styles.lineItem}
            source={require('./mypoint_images/line_image.png')} />
        </View>
        <View style={styles.contextcontainer}>
          <View style={styles.detailcontainer}>
            <Text style={styles.dateText}>{dateItems}</Text>
            <View style={styles.detailcontainer2}>
              <Text style={styles.logtitleText}>{pointType}</Text>
              {traderContent}
            </View>
          </View>
          <View style={styles.balancecontainer}>
            {detailContent}
            <Text style={styles.balanceText}>잔액 {balance}원</Text>
          </View>
        </View>
      </View>
  );
};

const MyPointLog = ({ route, navigation }) => {
  const [pointLogList, setPointLogList] = useState(null);
  const [selectedValue, setSelectedValue] = useState("전체");

  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        let ref = firestore().collection('User').doc(getUserId).collection('pointLog').orderBy('dateTime', 'desc');
        ref.onSnapshot((querySnapshot) => {
            let items = [];
            querySnapshot.forEach((doc) => {
              const {dateTime, balance, brandID, count, pointType, pointVolume, trader} = doc.data();
              if ((selectedValue) == "전체") {
                items.push({
                  balance: balance,
                  dateTime: dateTime,
                  pointVolume: pointVolume,
                  pointType: pointType,
                  trader: trader,
                  count: count,
                  brandID: brandID,
                });
              } else if ((selectedValue) == "적립"){
                if (pointType == "포인트 적립") {
                  items.push({
                    balance: balance,
                    dateTime: dateTime,
                    pointVolume: pointVolume,
                    pointType: pointType,
                    trader: trader,
                    count: count,
                    brandID: brandID,
                  });
                }
              } else if ((selectedValue) == "사용"){
                if (pointType=="포인트 사용" || pointType=="포인트 선물" || pointType=="포인트 인출") {
                  items.push({
                    balance: balance,
                    dateTime: dateTime,
                    pointVolume: pointVolume,
                    pointType: pointType,
                    trader: trader,
                    count: count,
                    brandID: brandID,
                  });
                }                
              } else if ((selectedValue) == "충전"){
                if (pointType=="포인트 충전") {
                  items.push({
                    balance: balance,
                    dateTime: dateTime,
                    pointVolume: pointVolume,
                    pointType: pointType,
                    trader: trader,
                    count: count,
                    brandID: brandID,
                  });
                }                
              }
            });
          setPointLogList(items);
        });
      } catch (e) {
        console.log('Restoring Id failed or Get point log data failed');
      }
    };
    getUserIdAsync();
  }, [selectedValue]);

  renderItem = ({ item, index }) => { };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectcontainer}>
          <Picker 
            mode = 'dropdown'
            selectedValue={selectedValue}
            style={styles.pickerstyle}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue)              
            }}>
            <Picker.Item label='전체' value='전체'/>
            <Picker.Item label='적립' value='적립'/>
            <Picker.Item label='사용' value='사용'/>
            <Picker.Item label='충전' value='충전'/>
          </Picker>
        </View>
        <View style={styles.maincontainer}>
          <FlatList
            data={pointLogList}
            renderItem={({ item }) => <PointLogItem  {...item}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
    alignItems: 'center'
  },
  pickerstyle:{
    height: 40,
    width: 100,
  },
  maincontainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
    height: 100,
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
  pointText_use: {
    margin: 5,
    fontSize: 14,
    color: RED_COLOR,
  },
  pointText_reward: {
    margin: 5,
    fontSize: 14,
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
    justifyContent: 'center'
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
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  balancecontainer: {
    flex: 1,
    marginRight: 12,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    color: GREY_70_COLOR,
  },
  balanceText: {
    fontSize: 12,
    color: GREY_70_COLOR,
  }
});

export default MyPointLog;