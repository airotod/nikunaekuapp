import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View, Image, Picker} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

import { 
  BLACK_COLOR,
  WHITE_COLOR, 
  RED_COLOR,
  GREY_70_COLOR,
  GREEN_COLOR
} from '../../models/colors';
import { and } from 'react-native-reanimated';

const PointLogItem = ({is_usage, date, point, logtitle, detail, balance  }) => {
  let IconItem = null;
  let dateItems = date.split(" ");

  if (is_usage) {
    IconItem = <View style={styles.itemcontainer}>
                  <Image
                  style={styles.imageItem}
                  source={require('./mypoint_images/use_image.png')} />
                  <Text style={styles.pointText_use}>{point}원</Text>
                </View>;
  } else {
    IconItem = <View style={styles.itemcontainer}>
                  <Image
                  style={styles.imageItem}
                  source={require('./mypoint_images/reward_image.png')} />
                  <Text style={styles.pointText_reward}>+{point}원</Text>
                </View>;};

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
            <Text style={styles.dateText}>{dateItems[3]}년 {dateItems[1]}월 {dateItems[2]}일 {dateItems[0]}요일</Text>
            <Text style={styles.logtitleText}>{logtitle}</Text>
          </View>
          <View style={styles.balancecontainer}>
            <Text style={styles.detailText}>{detail}</Text>
            <Text style={styles.balanceText}>잔액 {balance}원</Text>
          </View>
        </View>
      </View>
  );
};

const MyPointLog = ({ route, navigation }) => {
  const [pointLogList, setPointLogList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("전체");
  const ref = firestore().collection('client').where('clientID','==','yonsei4').orderBy('date', 'desc');
  
  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const { is_usage, date, point, logtitle, detail, balance } = doc.data();
        if ((selectedValue) == "전체") {
          items.push({
            is_usage: is_usage,
            date: date.toDate().toString(),
            point: point,
            logtitle: logtitle,
            detail: detail,
            balance: balance,
          });
        }
        else if ((selectedValue) == "적립"){
          if(!(is_usage)){
            items.push({
              is_usage: is_usage,
              date: date.toDate().toString(),
              point: point,
              logtitle: logtitle,
              detail: detail,
              balance: balance,
            });
          }
        }
        else if ((selectedValue) == "사용"){
          if((is_usage)){
            items.push({
              is_usage: is_usage,
              date: date.toDate().toString(),
              point: point,
              logtitle: logtitle,
              detail: detail,
              balance: balance,
            });
          }
        }
       });
      setPointLogList(items);
      console.log(selectedValue);
    });
  }, [selectedValue]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectcontainer}>
          {/* <Picker 
            mode = 'dropdown'
            selectedValue={selectedValue}
            style={styles.pickerstyle}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue)              
            }}>
            <Picker.Item label='전체' value='전체'/>
            <Picker.Item label='적립' value='적립'/>
            <Picker.Item label='사용' value='사용'/>
          </Picker> */}
        </View>
        <View style={styles.maincontainer}>
          <FlatList
            data={pointLogList}
            renderItem={({ item }) => <PointLogItem {...item} />}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  listcontainer: {
    height: 100,
    width: 400,
    flexDirection: 'row',
    marginBottom: 2,
    backgroundColor: WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemcontainer: {
    height: 100,
    width: 100,
    flexDirection: 'column',
    margin: 1,
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
    fontSize: 16,
    color: RED_COLOR,
  },
  pointText_reward: {
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
    width: 280,
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
    color: GREY_70_COLOR,
  }
});

export default MyPointLog;