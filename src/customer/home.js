import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, LogBox} from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';

import Card from '../components/customerHomeCom/card/Card';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const CustomerHome = ({ route, navigation }) => {
  const { userId, phone, otherParam } = route.params;
  const [couponlist, setCouponlist] = useState([]);

  const ref = firestore().collection('User').doc(userId).collection('coupons');

  useEffect(() => {
    ref.onSnapshot((querysnapshot) => {
      let items = [];
      querysnapshot.forEach((doc) => {
        const { logo, count } = doc.data();
        items.push({
          count: count,
          logo: logo,
          id: doc.id,
        });
      });
      setCouponlist(items);
    });
  }, []);

if (couponlist.length == 0) {
    return(
      <>
        <TopBar
          title="니쿠내쿠"
          navigation={navigation}
          drawerShown={true}
          myaccountShown={true}
        />
        <View style={styles.container}>
          <Text style={styles.empty}>등록된 쿠폰이 없습니다.</Text>
        </View>
      </>
    )
  } else {
    return (
      <>
        <TopBar
          title="니쿠내쿠"
          navigation={navigation}
          drawerShown={true}
          myaccountShown={true}
        />
        <View style={styles.container}>
          <ScrollView style={styles.cardContainer}>
            {couponlist.map((info) => (
              <Card key={info.id} data={info} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
  },
  empty:{
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default CustomerHome;
