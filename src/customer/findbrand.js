import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';


const Card = () => {
  return(
    <View>
      <Text> card</Text>
      <Image 
      source={{uri: 'https://firebasestorage.googleapis.com/v0/b/nikunaekuapp.appspot.com/o/andar.png?alt=media&token=0d4c779d-7570-49a3-98e3-1682c493ce0e'}}
      style={{height: 100, resizeMode: 'center'}} />
    </View>
  )
}

const FindBrand = ({ route, navigation }) => {
//  './brandImages/andar.png ./brandImages/baleudagimseonsaeng.png ./brandImages/cafegate.png \
//   ./brandImages/illlitercoffee.png ./brandImages/mrhealing.png ./brandImages/samjin.png \
//   ./brandImages/starbucks.png ./brandImages/streetchurros.png ./brandImages/thekindcoffee.png';  

  return (
    <>
      <TopBar
        title="브랜드 찾기"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>브랜드 찾기 화면</Text>
        <Card></Card>
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

export default FindBrand;
