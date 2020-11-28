import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';

import Card from '../components/customerHomeCom/card/Card';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerHome = ({ route, navigation }) => {
  const [couponlist, getcouponlist] = useState([]);
  const [userId, setUserId] = useState(null);

  let ref = firestore().collection('client');
  //  useEffect 값 하나면 가져오는 방법!!!

  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        setUserId(getUserId); //null??????????????????????
        // setRef(firestore().collection('client').doc(getUserId));
        ref = ref.doc(getUserId).collection('brand');
        ref.onSnapshot((querysnapshot) => {
          let items = [];
          querysnapshot.forEach((doc) => {
            const { logo, count } = doc.data();
            items.push({
              count: count,
              logo: logo,
              id: doc.id
            });
          });

          // console.log(items);

          getcouponlist(items);
        });
      } catch (e) {
        // Restoring Id failed
        console.log('Restoring Id failed');
      }
    };
    getUserIdAsync();
  }, []);

  // const [cards, setCards] = useState([]);
  // useEffect(() => {
  //   const fetchCards = async () => {
  //     const result = await fetch(
  //       'https://nicu-7262f.firebaseio.com/cards.json',
  //     );
  //     const cards = await result.json();

  //     const temp = [];

  //     for (let key in cards) {
  //       temp.push(cards[key]);
  //     }
  //     setCards(temp);
  //   };
  //   fetchCards();

  //   return fetchCards;
  // }, []);

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
});

export default CustomerHome;
