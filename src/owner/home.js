import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import TopBar from '../components/topbar';

import { BLACK_COLOR, RED_COLOR, GREY_60_COLOR } from '../models/colors';
import firestore from "@react-native-firebase/firestore";


const OwnerHome = ({route, navigation}) => {
  const [owner, setOwner] = useState([]);

  const ref = firestore().collection("owner");

  async function _changeSeat(
    seatNum,
  ) {
    await firestore()
      .collection("owner")
      .doc("starbucks") // 이건 후에 수정하자!
      .update({ checkSeat: seatNum, // 0 -> 선택 x, 1 -> 널널, 2 -> 보통, 3 -> 부족, 4 -> 만석
                time: Date.now()}); 
  }


  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { userName, userId, storeName, storeImg, weekCount, totalCount, checkSeat, time } = doc.data();
        if (userId === "b970311") {
          setOwner({
            userName : userName, 
            userId : userId, 
            storeName : storeName, 
            storeImg : storeImg, 
            weekCount : weekCount,
            totalCount : totalCount,
            checkSeat : checkSeat,
            time : time
          });
        }
      });
      if(Date.now() - owner.time > 10000) { // 한시간이 지나면 초기화(지금은 테스트라서 10초로 함)
        firestore().collection("owner").doc("starbucks").update({checkSeat: 0, time: Date.now()}); // 시간도 업데이트 안 시켜주면 버튼을 두번 클릭해야지 됨. 아마 update 시간 차이 때문인 것 같음.
      }
    });
  });

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
              source={{uri: owner.storeImg}}/>
        {/* 매장 좌석 체크 */}
        <View style= {styles.seat}>
          <Text style= {styles.mainText}> 매장 좌석 체크 </Text>
          <View style={styles.buttonLayout}>
            <TouchableOpacity
              style={[styles.seatButton, { backgroundColor: '#2AC940', 
              borderWidth: owner.checkSeat === 1 ? 3 : 0, 
              borderColor: owner.checkSeat === 1 ? "#000": ""}]}
              onPress={()=>{_changeSeat(1)}}>
              <Text style={styles.buttonText}>널널</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.seatButton, { backgroundColor: '#39F', 
              borderWidth: owner.checkSeat === 2 ? 3 : 0, 
              borderColor: owner.checkSeat === 2 ? "#000": ""}]}
              onPress={()=>{_changeSeat(2)}}>
              <Text style={styles.buttonText}>보통</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.seatButton, { backgroundColor: '#FA9917', 
              borderWidth: owner.checkSeat === 3 ? 3 : 0, 
              borderColor: owner.checkSeat === 3 ? "#000": ""}]}
              onPress={()=>{_changeSeat(3)}}>
              <Text style={styles.buttonText}>부족</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.seatButton, { backgroundColor: '#F00', 
              borderWidth: owner.checkSeat === 4 ? 3 : 0, 
              borderColor: owner.checkSeat === 4 ? "#000": ""}]}
              onPress={()=>{_changeSeat(4)}}>
              <Text style={styles.buttonText}>만석</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sideText}>한시간 단위로 체크사항이 reset 됩니다.</Text>
        </View>
        {/* 쿠폰 사용량 */}
        <View style={styles.coupon}>
          <Text style={styles.mainText}>실시간 쿠폰 사용량 (주별/전원)</Text>
          <Text style={{fontSize:40}}><Text style={{color: "red"}}>{owner.weekCount}</Text> / <Text style={{color: "#828282"}}>{owner.totalCount}</Text></Text>
          <TouchableOpacity
            style={styles.couponButton}
            onPress={()=>{navigation.navigate("쿠폰 사용량")}}>
            <Text style={{fontSize : 16}}>내 카페 쿠폰 사용량 자세히 보기</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex : 0.1}}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "white"
  },
  mainText: {
    color: BLACK_COLOR,
    marginVertical : 20, // 상 + 하
    fontSize : 19,
    fontWeight : "500"
  },
  img : {
    flex : 0.8,
    height:'100%',
    width:'100%',
    resizeMode:'contain'
  },
  seat : {
    flex : 0.8,
    alignItems: 'center',
    backgroundColor : "#F2F2F2"
  },
  coupon : {
    flex : 1,
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
    color: '#fff',
    fontSize: 22,
  },
  sideText: {
    marginTop : 15,
    fontSize : 15,
    color : "#4F4F4F",
    fontWeight : "800"
  },
  couponButton: {
    borderWidth : 1,
    padding : 10,
    width : "80%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop : 24,
    borderColor : BLACK_COLOR
  }
});

export default OwnerHome;
