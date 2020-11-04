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
  GREY_10_COLOR,
  GREY_20_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { username } from '../../models/current';
import { shopList } from '../../models/shops';

import { sortByDate } from '../../utils/sortby';
import { checkNumber } from '../../utils/validate';

const Question = ({ text }) => {
  return <Text style={styles.question}>{text}</Text>;
};

const PostDeal = ({ route, navigation }) => {
  const [brandName, setBrandName] = useState(shopList[0]);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [price, setPrice] = useState('');
  const [priceMsg, setPriceMsg] = useState('');
  const [totalNum, setTotalNum] = useState('');
  const [totalNumMsg, setTotalNumMsg] = useState('');

  const ref = firestore().collection('posts');

  async function _addPost() {
    if (!brandName || !totalNum || !price) {
      setMsg('입력하지 않은 항목이 존재합니다.');
    } else {
      Alert.alert('쿠폰 구매', `${brandName} 쿠폰을 판매 등록하시겠습니까?`, [
        {
          text: 'CANCEL',
          onPress: () => console.log('쿠폰 판매 등록을 취소합니다.'),
        },
        {
          text: 'OK',
          onPress: async () => {
            await ref.add({
              brandName: brandName,
              possibleNum: totalNum,
              price: price,
              purchased: false,
              postedAt: firestore.FieldValue.serverTimestamp(),
              postedBy: username,
              totalNum: totalNum,
            });
            setMsg('');
            setBrandName(shopList[0]);
            setTotalNum('');
            setPrice('');
          },
        },
      ]);
    }
  }

  useEffect(() => {
    return ref.where('postedBy', '==', username).onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const {
          brandName,
          possibleNum,
          price,
          purchased,
          postedAt,
          postedBy,
          totalNum,
        } = doc.data();
        items.push({
          brandName: brandName,
          currentUser: username,
          couponId: doc.id,
          date: postedAt,
          possibleNum: possibleNum,
          postedBy: postedBy,
          price: price,
          purchased: purchased,
          totalNum: totalNum,
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
            onValueChange={(value, index) => setBrandName(value)}>
            {shopList.map((item) => (
              <Picker.Item label={item} value={item} />
            ))}
          </Picker>
        </View>
        <Question text="2. 판매할 쿠폰 개수를 입력하세요. (개)" />
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
        <Text style={styles.msg}>
          쿠폰 1개당 최대 판매 가능 가격은 해당 카페 기본 메뉴 가격의 10%입니다.
        </Text>
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
    color: BLACK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 10,
  },
  red: {
    color: RED_COLOR,
    textAlign: 'center',
  },
});

export default PostDeal;
