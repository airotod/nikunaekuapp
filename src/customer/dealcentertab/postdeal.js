import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-community/picker';

import Loading from '../../components/loading';
import DealItem from '../../components/dealitem';

import {
  BLACK_COLOR,
  BLUE_COLOR,
  GREY_10_COLOR,
  GREY_20_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';

import { sortByDate } from '../../utils/sortby';
import { checkNumber } from '../../utils/validate';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Question = ({ text, subtext }) => {
  return (
    <View style={styles.question}>
    <Text style={styles.questionText}>{text}</Text>
    <Text style={styles.questionSubtext}>{subtext && `보유 수량 : ${subtext}개`}</Text>
  </View>
  );
};

const PostDeal = ({ route, navigation }) => {
  const { userId, phone, otherParam } = route.params;
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [couponList, setCouponList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [price, setPrice] = useState('');
  const [priceMsg, setPriceMsg] = useState('');
  const [maxNum, setMaxNum] = useState(null);
  const [totalNum, setTotalNum] = useState('');
  const [totalNumMsg, setTotalNumMsg] = useState('');

  const dealRef = firestore().collection('DealCenter');
  const userRef = firestore().collection('User').doc(userId);

  async function _addPost() {
    if (!brandName || !totalNum || !price) {
      setMsg('입력하지 않은 항목이 존재합니다.');
    } else if (totalNum > maxNum) {
      setMsg('판매할 쿠폰 개수는 보유 수량을 초과할 수 없습니다.');
    } else {
      Alert.alert('쿠폰 구매', `${brandName} 쿠폰을 판매 등록하시겠습니까?`, [
        {
          text: 'CANCEL',
          onPress: () => console.log('쿠폰 판매 등록을 취소합니다.'),
        },
        {
          text: 'OK',
          onPress: async () => {
            await dealRef.add({
              availableAmount: totalNum,
              brandID: brandName,
              brandLogo: brandLogo,
              clientID: userId,
              onSale: true,
              price: price,
              registrationAmount: totalNum,
              registrationAt: firestore.FieldValue.serverTimestamp(),
            });
            setMsg('');
            setBrandName(couponList[0].brandID || '');
            setBrandLogo(couponList[0].logo || '');
            setMaxNum(couponList[0].count || '');
            setTotalNum('');
            setPrice('');
          },
        },
      ]);
    }
  }

  useEffect(() => {
    userRef
      .collection('coupons')
      .get()
      .then(function (querySnapshot) {
        let coupons = [];
        querySnapshot.forEach(function (doc) {
          coupons.push({
            brandID: doc.id,
            count: doc.data().count,
            logo: doc.data().logo,
          });
        });
        setCouponList(coupons);
        setBrandName(coupons[0].brandID);
        setBrandLogo(coupons[0].logo);
        setMaxNum(coupons[0].count);
      });

    return dealRef
      .where('clientID', '==', userId)
      .onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          const {
            availableAmount,
            brandID,
            brandLogo,
            clientID,
            onSale,
            price,
            registrationAmount,
            registrationAt,
          } = doc.data();
          items.push({
            brandLogo: brandLogo,
            brandName: brandID,
            currentUser: userId,
            couponId: doc.id,
            date: registrationAt,
            possibleNum: availableAmount,
            postedBy: clientID,
            price: price,
            purchased: !onSale,
            totalNum: registrationAmount,
          });
        });
        setItemList(sortByDate(items));

        if (loading) {
          setLoading(false);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Question text="1. 판매할 쿠폰을 선택하세요." />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={brandName}
            style={styles.picker}
            onValueChange={(value, index) => {
              setBrandName(value);
              setBrandLogo(
                couponList.find((item) => item.brandID === value).logo,
              );
              setMaxNum(
                couponList.find((item) => item.brandID === value).count,
              );
            }}>
            {couponList.map((item) => (
              <Picker.Item
                label={item.brandID}
                value={item.brandID}
                key={item.brandID}
              />
            ))}
          </Picker>
        </View>
        <Question
          text="2. 판매할 쿠폰 개수를 입력하세요. (개)"
          subtext={maxNum}
        />
        <TextInput
          style={styles.input}
          placeholder="예) 3"
          onChangeText={(text) => {
            setTotalNum(parseInt(text));
            if (!checkNumber(text)) {
              setTotalNumMsg('숫자만 입력해주세요.');
              setTotalNum(text.substring(0, text.length - 1));
            } else {
              setTotalNumMsg('');
            }
          }}
          value={totalNum}
          clearButtonMode="always"
        />
        {totalNumMsg ? (
          <View style={styles.errMsgContainer}>
            <Text style={styles.red}>{totalNumMsg}</Text>
          </View>
        ) : (
          <></>
        )}
        <Question text="3. 쿠폰 한 개당 가격을 입력하세요. (원)" />
        <TextInput
          style={styles.input}
          placeholder="예) 100"
          onChangeText={(text) => {
            setPrice(parseInt(text));
            if (!checkNumber(text)) {
              setPriceMsg('숫자만 입력해주세요.');
              setPrice(text.substring(0, text.length - 1));
            } else {
              setPriceMsg('');
            }
          }}
          value={price}
          clearButtonMode="always"
        />
        {/* <Text style={styles.msg}>
          쿠폰 1개당 최대 판매 가능 가격은 해당 매장 기본 메뉴 가격의 10%입니다.
        </Text> */}
        {priceMsg ? (
          <View style={styles.errMsgContainer}>
            <Text style={styles.red}>{priceMsg}</Text>
          </View>
        ) : (
          <></>
        )}
        {msg ? (
          <View style={styles.errMsgContainer}>
            <Text style={styles.red}>{msg}</Text>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => await _addPost()}>
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postLogTitleContainer}>
        <View style={styles.postLogTitleLine}></View>
        <Text style={styles.postLogTitle}>내가 판매 등록한 쿠폰 내역</Text>
        <View style={styles.postLogTitleLine}></View>
      </View>
      {loading ? (
        <Loading />
      ) : itemList ? (
        <View style={styles.itemListContainer}>
          <FlatList
            data={itemList}
            renderItem={({ item }) => <DealItem page="postdeal" {...item} />}
            keyExtractor={(item) => item.couponId}
          />
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>데이터가 존재하지 않습니다.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    height: 44,
    justifyContent: 'center',
    width: 200,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 18,
  },
  container: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: BLACK_COLOR,
    fontSize: 14,
  },
  errMsgContainer: {
    marginTop: 20,
  },
  form: {
    backgroundColor: GREY_10_COLOR,
    marginTop: 2,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: WHITE_COLOR,
    fontSize: 13,
    height: 30,
    justifyContent: 'center',
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  itemListContainer: {
    backgroundColor: GREY_10_COLOR,
    flex: 1,
  },
  msg: {
    color: RED_COLOR,
    fontSize: 9,
    textAlign: 'right',
  },
  picker: {
    color: BLACK_COLOR,
    height: 30,
  },
  pickerContainer: {
    alignContent: 'center',
    backgroundColor: WHITE_COLOR,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  postLogTitle: {
    color: BLACK_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  postLogTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
  },
  postLogTitleLine: {
    backgroundColor: GREY_20_COLOR,
    flex: 1,
    height: 2.5,
  },
  question: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
    marginBottom: 10,
  },
  questionSubtext: {
    color: BLUE_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  questionText: {
    color: BLACK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  red: {
    color: RED_COLOR,
    textAlign: 'center',
  },
});

export default PostDeal;
