import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../components/topbar';
import { BLACK_COLOR, WHITE_COLOR } from '../models/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const FindBrand = ({ route, navigation }) => {
  const [brandList, setBrandList] = useState([]);
  const [userId, setUserId] = useState(null);

  const Card = ({ brandName, logo }) => {
    return (
      <View style={{ width: '30%', marginHorizontal: 5, marginVertical: 10 }}>
        <TouchableOpacity
          style={styles.cardcontainer}
          onPress={() =>
            navigation.navigate('멤버십 가입', { data: { brandName, logo } })
          }>
          <Image style={styles.imagecontainer} source={{ uri: logo }} />
          <Text style={styles.textcontainer}> {brandName}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        setUserId(getUserId);
        const ref = firestore().collection('Brand');

        let userCoupons = [];
        firestore()
          .collection('User')
          .doc(getUserId)
          .collection('coupons')
          .get()
          .then(function (querySnapshot) {
            let coupons = [];
            querySnapshot.forEach(function (doc) {
              coupons.push(doc.id);
            });
            userCoupons = coupons;
          });

        ref.onSnapshot((querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            const { brandName, logo } = doc.data();
            if (!userCoupons.includes(brandName)) {
              items.push({
                brandName: brandName,
                logo: logo,
              });
            }
          });
          setBrandList(items);
          console.log(brandList);
        });
      } catch (e) {
        // Restoring Id failed
        console.log('Restoring Id failed');
      }
    };
    getUserIdAsync();
  }, []);

  return (
    <>
      <TopBar
        title="브랜드 찾기"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.listcontainer}>
          <FlatList
            data={brandList}
            renderItem={({ item }) => <Card {...item} />}
            keyExtractor={(item) => item.brandName}
            style={{ width: '100%' }}
            numColumns={3}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
  },
  listcontainer: {
    flex: 1,
    width: '100%',
  },
  cardcontainer: {
    aspectRatio: 5 / 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE_COLOR,
    flexDirection: 'column',
  },
  textcontainer: {
    flex: 1,
    color: BLACK_COLOR,
  },
  imagecontainer: {
    flex: 4,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default FindBrand;
