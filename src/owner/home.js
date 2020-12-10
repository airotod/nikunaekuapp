import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, LogBox } from 'react-native';
import TopBar from '../components/topbar';
import Loading from '../components/loading';
import {
  BLACK_COLOR,
  RED_COLOR,
  DARK_RED_COLOR,
  WHITE_COLOR,
  GREEN_COLOR,
  YELLO_COLOR,
  GREY_10_COLOR,
  GREY_60_COLOR,
  GREY_80_COLOR,
  GREY_100_COLOR,
  BLUE_COLOR,
} from '../models/colors';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const OwnerHome = ({ route, navigation }) => {
  const [owner, setOwner] = useState('');
  const [brandName, setBrand] = useState('');
  const [storeName, setStore] = useState('');
  const [seat, setSeat] = useState('');
  const [storeImg, setImg] = useState('');

  const [todayC, setToday] = useState(0);
  const [totalC, setTotal] = useState(0);

  const { userId } = route.params;

  var docRef = firestore().collection('User').doc(userId);
  var BrandRef = firestore().collection('Brand');

  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setBrand(doc.data().brandID);
        setStore(doc.data().storeID);
        BrandRef.doc(doc.data().brandID)
          .get()
          .then(function (brand) {
            setImg(brand.data().logo);
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
          });
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });

  async function _changeSeat(seatNum) {
    await firestore()
      .collection('Brand')
      .doc(brandName)
      .collection('Stores')
      .doc(storeName) // 이건 후에 수정하자!
      .update({
        seatState: seatNum, // 0 -> 선택 x, 1 -> 널널, 2 -> 보통, 3 -> 부족, 4 -> 만석
        time: Date.now(),
      });
    setSeat(seatNum);
  }

  function _changeSeat0() {
    setTimeout(
      () =>
        firestore()
          .collection('Brand')
          .doc(brandName)
          .collection('Stores')
          .doc(storeName) // 이건 후에 수정하자!
          .update({ seatState: 0 }),
      10000,
    );
    setSeat(0);
  }

  let ref = firestore().collection('Brand');

  ref.doc(brandName).collection('Stores').doc(storeName).get()
  .then(function (doc) {
    if (doc.exists) {
      setTotal(doc.data().saveCount);
      setToday(doc.data().useCount);
    }
  })
  .catch(function (error) {
    console.log('Error getting document:', error);
  });

  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        ref
          .doc(brandName)
          .collection('Stores')
          .doc(storeName)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const { saveCount, useCount } = doc.data();
              setTotal(saveCount);
              setToday(useCount);
            }
          });
      } catch (e) {
        console.log('Restoring Id failed or Get point data failed');
      }
    };
    getUserIdAsync();
  }, []);

  return (
    <>
      <TopBar
        title={storeName}
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        titleColor={RED_COLOR}
        myaccountColor={GREY_60_COLOR}
      />
      {storeImg ? (
        <View style={styles.container}>
          <Image style={styles.img} source={{ uri: storeImg }} />
          <View style={styles.seat}>
            <Text style={styles.mainText}> 매장 좌석 체크 </Text>
            <View style={styles.buttonLayout}>
              <TouchableOpacity
                style={[
                  styles.seatButton,
                  {
                    backgroundColor: GREEN_COLOR,
                    borderWidth: seat === 1 ? 3 : 0,
                    borderColor: seat === 1 ? BLACK_COLOR : '',
                  },
                ]}
                onPress={() => {
                  _changeSeat(1);
                  _changeSeat0();
                }}>
                <Text style={styles.buttonText}>널널</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.seatButton,
                  {
                    backgroundColor: BLUE_COLOR,
                    borderWidth: seat === 2 ? 3 : 0,
                    borderColor: seat === 2 ? BLACK_COLOR : '',
                  },
                ]}
                onPress={() => {
                  _changeSeat(2);
                  _changeSeat0();
                }}>
                <Text style={styles.buttonText}>보통</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.seatButton,
                  {
                    backgroundColor: YELLO_COLOR,
                    borderWidth: seat === 3 ? 3 : 0,
                    borderColor: seat === 3 ? BLACK_COLOR : '',
                  },
                ]}
                onPress={() => {
                  _changeSeat(3);
                  _changeSeat0();
                }}>
                <Text style={styles.buttonText}>부족</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.seatButton,
                  {
                    backgroundColor: DARK_RED_COLOR,
                    borderWidth: seat === 4 ? 3 : 0,
                    borderColor: seat === 4 ? BLACK_COLOR : '',
                  },
                ]}
                onPress={() => {
                  _changeSeat(4);
                  _changeSeat0();
                }}>
                <Text style={styles.buttonText}>만석</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sideText}>
              한시간 단위로 체크사항이 reset 됩니다.
            </Text>
          </View>
          <View style={styles.coupon}>
            <Text style={styles.mainText}>실시간 쿠폰 적립/사용량</Text>
            <Text style={{ fontSize: 40 }}>
              <Text style={{ color: GREEN_COLOR }}>{todayC}</Text> /{' '}
              <Text style={{ color: GREY_100_COLOR }}>{totalC}</Text>
            </Text>
            <TouchableOpacity
              style={styles.couponButton}
              onPress={() => {
                navigation.navigate('쿠폰 사용량');
              }}>
              <Text style={{ fontSize: 16 }}>
                매장 쿠폰 사용량 자세히 보기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainText: {
    color: BLACK_COLOR,
    marginVertical: 20, // 상 + 하
    fontSize: 19,
    fontWeight: '500',
  },
  img: {
    flex: 0.8,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  seat: {
    flex: 0.8,
    alignItems: 'center',
    backgroundColor: GREY_10_COLOR,
  },
  coupon: {
    flex: 1,
    alignItems: 'center',
  },
  buttonLayout: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  seatButton: {
    flex: 1,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 22,
  },
  sideText: {
    marginTop: 15,
    fontSize: 15,
    color: GREY_80_COLOR,
    fontWeight: '800',
  },
  couponButton: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    borderColor: BLACK_COLOR,
  },
});

export default OwnerHome;