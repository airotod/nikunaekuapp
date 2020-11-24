import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TopBar from '../components/topbar';

import { BLACK_COLOR, RED_COLOR, DARK_RED_COLOR, WHITE_COLOR, GREEN_COLOR, YELLO_COLOR, GREY_10_COLOR, GREY_60_COLOR, GREY_80_COLOR, GREY_100_COLOR, BLUE_COLOR } from '../models/colors';
import firestore from "@react-native-firebase/firestore";

const OwnerHome = ({ route, navigation }) => {
  const [owner, setOwner] = useState([]);

  const ref = firestore().collection("owner");

  async function _changeSeat(
    seatNum,
  ) {
    await firestore()
      .collection("owner")
      .doc("starbucks") // 이건 후에 수정하자!
      .update({
        checkSeat: seatNum, // 0 -> 선택 x, 1 -> 널널, 2 -> 보통, 3 -> 부족, 4 -> 만석
        time: Date.now()
      });
  }

  function _changeSeat0() {
    setTimeout(() => firestore().collection("owner").doc("starbucks").update({ checkSeat: 0 }), 10000);
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { userName, userId, storeName, storeImg, weekCount, totalCount, checkSeat, time } = doc.data();
        if (userId === "b970311") {
          setOwner({
            userName: userName,
            userId: userId,
            storeName: storeName,
            storeImg: storeImg,
            weekCount: weekCount,
            totalCount: totalCount,
            checkSeat: checkSeat,
            time: time
          });
        }
      });
      // if (Date.now() - owner.time > 10000) { // 한시간이 지나면 초기화(지금은 테스트라서 10초로 함)
      //   firestore().collection("owner").doc("starbucks").update({ checkSeat: 0, time: Date.now() }); // 시간도 업데이트 안 시켜주면 버튼을 두번 클릭해야지 됨. 아마 update 시간 차이 때문인 것 같음.
      // }
    });
  }, []);

  return (
    <>
      <TopBar
        title={owner.storeName}
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        titleColor={RED_COLOR}
        myaccountColor={GREY_60_COLOR}
      />
      <View style={styles.container}>
        {/* 가게 이미지 */}
        <Image
          style={styles.img}
          source={{ uri: owner.storeImg }} />
        {/* 매장 좌석 체크 */}
        <View style={styles.seat}>
          <Text style={styles.mainText}> 매장 좌석 체크 </Text>
          <View style={styles.buttonLayout}>
            <TouchableOpacity
              style={[styles.seatButton, {
                backgroundColor: GREEN_COLOR,
                borderWidth: owner.checkSeat === 1 ? 3 : 0,
                borderColor: owner.checkSeat === 1 ? BLACK_COLOR : ""
              }]}
              onPress={() => {
                _changeSeat(1);
                _changeSeat0();
              }}>
              <Text style={styles.buttonText}>널널</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.seatButton, {
                backgroundColor: BLUE_COLOR,
                borderWidth: owner.checkSeat === 2 ? 3 : 0,
                borderColor: owner.checkSeat === 2 ? BLACK_COLOR : ""
              }]}
              onPress={() => {
                _changeSeat(2);
                _changeSeat0();
              }}>
              <Text style={styles.buttonText}>보통</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.seatButton, {
                backgroundColor: YELLO_COLOR,
                borderWidth: owner.checkSeat === 3 ? 3 : 0,
                borderColor: owner.checkSeat === 3 ? BLACK_COLOR : ""
              }]}
              onPress={() => {
                _changeSeat(3);
                _changeSeat0();
              }}>
              <Text style={styles.buttonText}>부족</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.seatButton, {
                backgroundColor: DARK_RED_COLOR,
                borderWidth: owner.checkSeat === 4 ? 3 : 0,
                borderColor: owner.checkSeat === 4 ? BLACK_COLOR : ""
              }]}
              onPress={() => {
                _changeSeat(4);
                _changeSeat0();
              }}>
              <Text style={styles.buttonText}>만석</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sideText}>한시간 단위로 체크사항이 reset 됩니다.</Text>
        </View>
        {/* 쿠폰 사용량 */}
        <View style={styles.coupon}>
          <Text style={styles.mainText}>실시간 쿠폰 사용량 (주별/전원)</Text>
          <Text style={{ fontSize: 40 }}><Text style={{ color: "red" }}>{owner.weekCount}</Text> / <Text style={{ color: GREY_100_COLOR }}>{owner.totalCount}</Text></Text>
          <TouchableOpacity
            style={styles.couponButton}
            onPress={() => { navigation.navigate("쿠폰 사용량") }}>
            <Text style={{ fontSize: 16 }}>내 카페 쿠폰 사용량 자세히 보기</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.1 }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  mainText: {
    color: BLACK_COLOR,
    marginVertical: 20, // 상 + 하
    fontSize: 19,
    fontWeight: "500"
  },
  img: {
    flex: 0.8,
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  seat: {
    flex: 0.8,
    alignItems: 'center',
    backgroundColor: GREY_10_COLOR
  },
  coupon: {
    flex: 1,
    alignItems: 'center'
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
    fontWeight: "800"
  },
  couponButton: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    borderColor: BLACK_COLOR
  }
});

export default OwnerHome;
