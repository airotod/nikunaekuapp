import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BLACK_COLOR,
    GREY_10_COLOR,
    RED_COLOR,
    WHITE_COLOR,
  } from '../../models/colors';

const StoreItem = ({ storeName, address, contactNumber }) => {
    return (
      <View style={styles.storeItem}>
        <Text style={styles.storeName}>{storeName}</Text>
        <View style={styles.detail}>
            <Text style={styles.detailText}>주소: {address}</Text>
            <Text style={styles.detailText}>연락처: {contactNumber}</Text>
        </View>
      </View>
    );
  };

  const StoreList = ({ route, navigation }) => {
    const { data, otherParam } = route.params;
    const [storeList, setStoreList] = useState([]);
    const ref = firestore().collection('Brand').doc(data.brandName).collection('Stores');
  
    useEffect(() => {
      return ref.onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          const { storeName, address, contactNumber } = doc.data();
          items.push({
            storeName: storeName,
            address: address,
            contactNumber: contactNumber
          });
        });
        setStoreList(items);
      });
    }, []);


    return (
        <>
          <View style={styles.container}>
            <FlatList
            data={storeList}
            renderItem={({ item }) => <StoreItem {...item} />}
            keyExtractor={(item) => item.storeName}
          />
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
    storeItem: {
        padding: 20,
        marginBottom: 2,
        backgroundColor: WHITE_COLOR,
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeName: {
        flex: 2,    
        fontSize: 16,
        color: BLACK_COLOR,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: GREY_10_COLOR,
        justifyContent: 'center',
    },
    detail: {
        flex: 3,
    },
    detailText: {
        fontSize: 13,
        color: BLACK_COLOR,
    }
  });
  




export default StoreList;
