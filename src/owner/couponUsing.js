import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';

import TopBar from '../components/topbar';
import {
  GREY_10_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
  GREY_40_COLOR,
  YELLO_COLOR_BRIGHT,
  RED_COLOR,
  GREY_80_COLOR,
  GREY_60_COLOR,
} from '../models/colors';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// const chartWidth = Dimensions.get('window').width;
// const charHeight = Dimensions.get('window').height;

const CouponUsing = ({ route, navigation }) => {
  const { brandId, storeId } = route.params;
  const [useCoupon, setUseCoupon] = useState(null);
  const [saveCoupon, setSaveCoupon] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const storeRef = firestore()
    .collection('Brand')
    .doc(brandId)
    .collection('Stores')
    .doc(storeId);
  const userRef = firestore().collection('User');

  useEffect(() => {
    storeRef.onSnapshot(function (doc) {
      if (doc.exists) {
        setSaveCoupon(doc.data().saveCount);
        setUseCoupon(doc.data().useCount);
      }
    });
    setLoading(false);
  }, [loading]);

  // renderItem = ({ item, index }) => { };

  function _UsingCouponHandler(customerId, count) {
    Alert.alert(
      '쿠폰 사용',
      customerId + ' 님이 쿠폰 ' + count + '개를 사용합니다.',
      [
        {
          text: '취소',
          onPress: () => console.log('쿠폰 사용을 취소합니다.'),
        },
        {
          text: '사용',
          onPress: async () => {
            try {
              userRef.doc(customerId).onSnapshot((doc) => {
                if (!doc.exists) {
                  Alert.alert('해당 아이디는 존재하지 않습니다.');
                  count = 0;
                  return;
                } else if (doc.data().userType != 'customer') {
                  Alert.alert('해당 아이디는 고객이 아닙니다.');
                  count = 0;
                  return;
                } else if (
                  userRef
                    .doc(customerId)
                    .collection('coupons')
                    .doc(brandId)
                    .get()
                    .then(function (document) {
                      if (!document.exists) {
                        Alert.alert(
                          '해당 고객에게 현 브랜드가 존재하지 않습니다.',
                        );
                        count = 0;
                        return;
                      } else if (document.data().count < count) {
                        Alert.alert(
                          '해당 고객의 보유 수량을 초과하였습니다.',
                        );
                        count = 0;
                        return;
                      } else {
                        storeRef.collection('clientLog').add({
                          clientID: customerId,
                          count: count,
                          dateTime: firestore.FieldValue.serverTimestamp(),
                          logType: '사용',
                        });
                        storeRef.update({
                          useCount: firestore.FieldValue.increment(
                            Number(count),
                          ),
                        });
                        userRef
                          .doc(customerId)
                          .collection('coupons')
                          .doc(brandId)
                          .update({
                            count: firestore.FieldValue.increment(
                              -Number(count),
                            ),
                          });
                        userRef
                          .doc(customerId)
                          .collection('coupons')
                          .doc(brandId)
                          .collection('couponLog')
                          .add({
                            count: count,
                            countType: '사용',
                            dateTime: firestore.FieldValue.serverTimestamp(),
                            storeID: storeId,
                          });
                      }
                    })
                );
              });
            } catch (e) {
              console.log('해당 아이디가 존재하지 않습니다.');
            }
            setIsVisible1(false);
            setLoading(true);
          },
        },
      ],
      setIsVisible1(false),
    );
  }

  function _SavingCouponHandler(customerId, count) {
    Alert.alert(
      '쿠폰 적립',
      customerId + ' 님이 쿠폰 ' + count + '개를 적립합니다.',
      [
        {
          text: '취소',
          onPress: () => console.log('쿠폰 적립을 취소합니다.'),
        },
        {
          text: '적립',
          onPress: async () => {
            try {
              userRef.doc(customerId).onSnapshot((doc) => {
                if (!doc.exists) {
                  Alert.alert('해당 아이디는 존재하지 않습니다.');
                  count = 0;
                  return;
                } else if (doc.data().userType != 'customer') {
                  Alert.alert('해당 아이디는 고객이 아닙니다.');
                  count = 0;
                  return;
                } else if (
                  userRef
                    .doc(customerId)
                    .collection('coupons')
                    .doc(brandId)
                    .get()
                    .then(function (document) {
                      if (!document.exists) {
                        Alert.alert(
                          '해당 고객에게 현 브랜드가 존재하지 않습니다.',
                        );
                        count = 0;
                        return;
                      } else {
                        storeRef.collection('clientLog').add({
                          clientID: customerId,
                          count: count,
                          dateTime: firestore.FieldValue.serverTimestamp(),
                          logType: '적립',
                        });
                        storeRef.update({
                          saveCount: firestore.FieldValue.increment(
                            Number(count),
                          ),
                        });
                        userRef
                          .doc(customerId)
                          .collection('coupons')
                          .doc(brandId)
                          .update({
                            count: firestore.FieldValue.increment(
                              Number(count),
                            ),
                          });
                        userRef
                          .doc(customerId)
                          .collection('coupons')
                          .doc(brandId)
                          .collection('couponLog')
                          .add({
                            count: count,
                            couponType: '적립',
                            dateTime: firestore.FieldValue.serverTimestamp(),
                            storeID: storeId,
                          });
                      }
                    })
                );
              });
            } catch (e) {
              console.log('해당 아이디가 존재하지 않습니다.');
            }
            setIsVisible2(false);
            setLoading(true);
          },
        },
      ],
      setIsVisible2(false),
    );
  }

  return (
    <>
      <TopBar
        title="쿠폰 적립/사용"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        titleColor={GREY_80_COLOR}
        myaccountColor={GREY_60_COLOR}
      />
      <View style={styles.container}>
        <View style={styles.maincontainer}>
          <View style={styles.topcontainer}>
            <View style={styles.pointcontainer}>
              <Text style={styles.pointText}>{storeId}</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <View style={styles.twobuttons}>
                <Button
                  title={'사용'}
                  color={YELLO_COLOR_BRIGHT}
                  onPress={() => {
                    setIsVisible1(true);
                  }}></Button>
                <Button
                  title={'적립'}
                  color={YELLO_COLOR_BRIGHT}
                  onPress={() => {
                    setIsVisible2(true);
                  }}></Button>
              </View>
            </View>
          </View>
          <View></View>
          <View style={styles.detailcontainer}>
            <View style={styles.detailpoint}>
              <Text style={styles.detailText}>고객 사용</Text>
              <Text style={styles.detailValue}>{useCoupon} 개</Text>
            </View>
            <View style={styles.detailpoint}>
              <Text style={styles.detailText}>고객 적립</Text>
              <Text style={styles.detailValue}>{saveCoupon} 개</Text>
            </View>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={isVisible1}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.modalView2}>
            <View style={styles.modalTopView2}>
              <Text style={styles.modalText}>쿠폰 사용</Text>
            </View>
            <View style={styles.modalMidView2}>
              <TextInput
                style={styles.input}
                placeholder="고객 아이디(id)"
                onChangeText={(text) => {
                  setCustomerId(text);
                }}
                autoFocus={true}
                clearButtonMode="always"
              />
              <TextInput
                style={styles.input}
                placeholder="사용할 쿠폰 개수"
                onChangeText={(text) => {
                  setCoupon(text);
                }}
                autoFocus={true}
                clearButtonMode="always"
              />
            </View>
            <View style={styles.modalBottomView2}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  _UsingCouponHandler(customerId, coupon);
                }}>
                <Text style={styles.buttonText}>사용</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  setIsVisible1(false);
                }}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isVisible2}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.modalView2}>
            <View style={styles.modalTopView2}>
              <Text style={styles.modalText}>쿠폰 적립</Text>
            </View>
            <View style={styles.modalMidView2}>
              <TextInput
                style={styles.input}
                placeholder="고객 아이디(id)"
                onChangeText={(text) => {
                  setCustomerId(text);
                }}
                autoFocus={true}
                clearButtonMode="always"
              />
              <TextInput
                style={styles.input}
                placeholder="적립할 쿠폰 개수"
                onChangeText={(text) => {
                  setCoupon(text);
                }}
                autoFocus={true}
                clearButtonMode="always"
              />
            </View>
            <View style={styles.modalBottomView2}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  _SavingCouponHandler(customerId, coupon);
                }}>
                <Text style={styles.buttonText}>적립</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  setIsVisible2(false);
                }}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    alignItems: 'center',
    backgroundColor: GREY_10_COLOR,
  },
  maincontainer: {
    width: 310,
    height: 165,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: WHITE_COLOR,
    borderRadius: 15,
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pointcontainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
  },
  pointText: {
    flex: 1,
    color: BLACK_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttoncontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  twobuttons: {
    flex: 1,
    flexDirection: 'row',
  },
  detailcontainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailpoint: {
    flex: 1,
    alignItems: 'center',
  },
  detailText: {
    color: BLACK_COLOR,
    marginTop: 3,
    fontSize: 12,
  },
  detailValue: {
    color: BLACK_COLOR,
    marginTop: 3,
    fontSize: 15,
  },
  modalView: {
    width: 280,
    height: 200,
    marginTop: 320,
    marginLeft: 65,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTopView: {
    flex: 1,
    paddingTop: 20,
  },
  modalMidView: {
    flex: 1,
    width: 200,
  },
  modalBottomView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    marginBottom: 25,
  },
  modalView2: {
    width: 280,
    height: 250,
    marginTop: 320,
    marginLeft: 65,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTopView2: {
    flex: 1,
    paddingTop: 20,
  },
  modalMidView2: {
    flex: 2,
    width: 200,
  },
  modalBottomView2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  modalText: {
    flex: 1,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: GREY_40_COLOR,
    borderRadius: 5,
    justifyContent: 'center',
  },
  button1: {
    flex: 1,
    width: 200,
    marginBottom: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED_COLOR,
  },
  button2: {
    flex: 1,
    width: 200,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREY_80_COLOR,
  },
  buttonText: {
    color: WHITE_COLOR,
  },
});

export default CouponUsing;
