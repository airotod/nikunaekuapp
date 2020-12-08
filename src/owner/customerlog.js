import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';

import TopBar from '../components/topbar';
import { BLACK_COLOR, GREY_60_COLOR,
  WHITE_COLOR, 
  RED_COLOR,
  GREY_70_COLOR,
  GREEN_COLOR } from '../models/colors';
import { dateUTCWithKorean } from '../utils/format'

const chartWidth = Dimensions.get('window').width;
const charHeight = Dimensions.get('window').height;

const CustomerLogItem = ({clientCumCount, clientID, count, dateTime, logType }) => {
  let IconItem = null;
  let dateItems = dateTime && dateUTCWithKorean(dateTime.toDate());
  let idContent = null;
  let cumContent = null;

  if (logType=="사용") {
    IconItem = <View style={styles.itemcontainer}>
                  <Image
                  style={styles.imageItem}
                  source={require('./customerlog_images/use_image.png')} />
                  <Text style={styles.pointText_use}>-{count}개</Text>
                </View>;
    cumContent = <Text style={styles.detailText}>누적 사용 개수 | {clientCumCount}개</Text>;
  } else {
    IconItem = <View style={styles.itemcontainer}>
                  <Image
                  style={styles.imageItem}
                  source={require('./customerlog_images/reward_image.png')} />
                  <Text style={styles.pointText_reward}>+{count}개</Text>
                </View>;
    cumContent = <Text style={styles.detailText}>누적 적립 개수 | {clientCumCount}개</Text>;
  }
  idContent = <Text style={styles.logtitleText}>고객아이디 | {clientID}</Text>;
  

  return (
      <View style={styles.listcontainer}>     
        {IconItem}      
        <View style={styles.linecontainer}>
          <Image
            style={styles.lineItem}
            source={require('./customerlog_images/line_image.png')} />
        </View>
        <View style={styles.contextcontainer}>
          <View style={styles.detailcontainer}>
            <Text style={styles.dateText}>{dateItems}</Text>
            <View style={styles.detailcontainer2}>
              {idContent}
            </View>
          </View>
          <View style={styles.balancecontainer}>
            {cumContent}
          </View>
        </View>
      </View>
  );
};

const CustomerLog = ({ route, navigation }) => {
  const { userId, phone, otherParam } = route.params;
  const [customerLogList, setCustomerLogList] = useState(null);
  const [selectedValue, setSelectedValue] = useState("전체");

  const userRef = firestore().collection('User').doc(userId);

  useEffect(() => {
    userRef.onSnapshot(function (doc) {
      if (doc.exists) {
        try {
          let ref = firestore().collection('Brand').doc(doc.data().brandID).collection('Stores').doc(doc.data().storeID).collection('clientLog').orderBy('dateTime', 'desc');
          ref.onSnapshot((querySnapshot) => {
              let items = [];
              querySnapshot.forEach((document) => {
                const {clientCumCount, clientID, count, dateTime, logType} = document.data();
                if ((selectedValue) == "전체") {
                  items.push({
                    clientCumCount: clientCumCount,
                    clientID: clientID, 
                    count: count,
                    dateTime: dateTime,
                    logType: logType,
                  });
                } else if ((selectedValue) == "적립"){
                  if (logType == "적립") {
                    items.push({
                      clientCumCount: clientCumCount,
                      clientID: clientID, 
                      count: count,
                      dateTime: dateTime,
                      logType: logType,
                    });
                  }
                } else if ((selectedValue) == "사용"){
                  if (logType == "사용") {
                    items.push({
                      clientCumCount: clientCumCount,
                      clientID: clientID, 
                      count: count,
                      dateTime: dateTime,
                      logType: logType,
                    });
                  }                
                } 
              });
            setCustomerLogList(items);
          });
        } catch (e) {
          console.log('Restoring Id failed or Get customer log data failed');
        }
      }});
    }, [selectedValue]);

  // renderItem = ({ item, index }) => { };

  return (
    <>
      <TopBar
        title="고객 로그"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        myaccountColor={GREY_60_COLOR}
      />
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
          </Picker>
        </View>
        <View style={styles.maincontainer}>
          <FlatList
            data={customerLogList}
            renderItem={({ item }) => <CustomerLogItem  {...item}/>}
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
    color: BLACK_COLOR,
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

export default CustomerLog;