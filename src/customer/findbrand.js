import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Card = ({brandName, logo}) => {
  return(
    <View style={styles.cardcontainer}> 
      <TouchableOpacity>
        <Image style={styles.imagecontainer}
        source={{uri: logo}}/>
        <Text style={styles.textcontainer}> {brandName}</Text>
      </TouchableOpacity>
    </View>
  )
}

const FindBrand = ({ route, navigation }) => {
  const [brandList, setBrandList] = useState([]);
  const ref = firestore().collection('Brand');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const { brandName, logo } = doc.data();
        items.push({
          brandName: brandName,
          logo: logo
        });
      });
      setBrandList(items);
    });
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
        <Text style={styles.mainText}>브랜드 찾기 화면</Text>
        <FlatList
          data={brandList}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={(item) => item.brandName}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
  },
  cardcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcontainer: {
    // flex: 1,
  },
  imagecontainer: {
    // flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  }
});

export default FindBrand;
