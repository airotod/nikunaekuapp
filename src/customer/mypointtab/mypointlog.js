import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

import { 
  BLACK_COLOR,
  WHITE_COLOR, 
} from '../../models/colors';

const PointLogItem = ({ is_usage, date, point, logtitle, detail, balance  }) => {
  return (
    <View style={styles.listcontainer}>
      <View style={styles.itemcontainer}>
        <Image
          style={styles.imageItem}
          source={require('./mypoint_images/use_image.png')} />
        <Text style={styles.pointText}>{point}</Text>
      </View>
      <View style={styles.linecontainer}>
        <Image
          style={styles.lineItem}
          source={require('./mypoint_images/line_image.png')} />
      </View>
      <View style={styles.detailcontainer}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.logtitleText}>{logtitle}</Text>
        <Text style={styles.detailText}>{detail}</Text>
      </View>
      <View style={styles.balancecontainer}>
        <Text style={styles.balanceText}>{balance}</Text>
      </View>
  </View>
  );
};

const MyPointLog = ({ route, navigation }) => {
  const [pointLogList, setPointLogList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("전체");
  
  const ref = firestore().collection('client').doc('nGnPbG8xIg7onVaowgyr').collection('point_log');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const { is_usage, date, point, logtitle, detail, balance } = doc.data();
        items.push({
          is_usage: is_usage,
          date: date,
          point: point,
          logtitle: logtitle,
          detail: detail,
          balance: balance
        });
      });
      setPointLogList(items);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectcontainer}>
          <Picker 
            selectedValue={selectedValue}
            style={styles.pickerstyle}
            onValueChange={(itemValue, itemIndex) => 
              setSelectedValue(itemValue)
            }>
            <Picker.Item label='전체' value='전체' />
            <Picker.Item label='적립' value='적립' />
            <Picker.Item label='사용' value='사용' />
            
          </Picker>
        </View>
        <View style={styles.maincontainer}>
          <FlatList
            data={pointLogList}
            renderItem={({ item }) => <PointLogItem {...item} />}
            keyExtractor={(item) => {item.is_usage, item.date, item.point, item.logtitle, item.detail, item.balance }}
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
    width: 380,
    flexDirection: 'row',
    marginBottom: 2,
    backgroundColor: WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemcontainer: {
    flex: 3,
    flexDirection: 'column',
    margin: 1,
    alignItems: 'center',
  },
  imageItem: { 
    height: 30,
    width: 30,
    margin: 2,
  },
  pointText: {
    margin: 5,
    fontSize: 18,
  },
  linecontainer: {
    flex: 1
  },
  lineItem: {
    height: 70,
    width: 2,
    margin: 2,
  },
  detailcontainer: {
    flex: 6,
  },
  dateText: {
    
    margin: 3,
  },
  logtitleText: {
    fontSize: 18,
    margin: 3,
  },
  detailText: {
    
    margin: 3,
  },
  balancecontainer: {
    flex: 2,
  },
  balanceText: {

  }
});

export default MyPointLog;
