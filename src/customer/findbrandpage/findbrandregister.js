import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, Button, Alert, Modal, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';
import TopBar from '../../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import StoreList from './storelist';
import Introduction from '../brandDetailTab/introduction';

const Tab = createMaterialTopTabNavigator();

const FindBrandRegister = ({ route, navigation }) => {
  const { data, otherParam } = route.params;
  const [userId, setUserId] = useState(null);
  let ref = firestore().collection('User');
  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        setUserId(getUserId);
      } catch (e) {
        // Restoring Id failed
        console.log('Restoring Id failed');
      }
    };
    getUserIdAsync();
  }, []);

  return (
    <>
      <Image
        source={{ uri: data.logo }}
        resizeMode="contain"
        style={[styles.img]}
      />
      <Tab.Navigator
        initialRouteName="소개"
        tabBarOptions={{
          activeTintColor: RED_COLOR,
          inactiveTintColor: GREY_60_COLOR,
          indicatorStyle: { backgroundColor: RED_COLOR },
          pressColor: GREY_20_COLOR,
          labelStyle: { fontSize: 16 },
          style: { backgroundColor: WHITE_COLOR, height: 44 },
          tabStyle: {
            borderBottomColor: GREY_20_COLOR,
            borderBottomWidth: 1,
            height: 44,
          },
        }}
        >
        <Tab.Screen
          name="소개"
          component={Introduction}
          options={{ tabBarLabel: '소개' }}
          initialParams={{data:data}}
        />
        <Tab.Screen
          name="쿠폰 내역"
          component={StoreList}
          options={{ tabBarLabel: '쿠폰 내역' }}
          initialParams={{data:data}}
        />
      </Tab.Navigator>

      <TouchableOpacity style={styles.button1}
              onPress={async () => {
                navigation.navigate("홈", {data:data});
                await ref.doc(userId).collection('coupons').doc(data.brandName).set({
                  brandID: data.brandName,
                  count: 0,
                  logo: data.logo
                })  
              }
              }>
        <Text style={styles.buttonText}>멤버십 가입</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 0.6,
    width: '100%',
    height: '100%',
  },
  modalView: {
    width: 280,
    height : 200,
    marginTop: 320,
    marginLeft: 65,
    flexDirection: 'column',
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  button1: {
    position: 'absolute',
    bottom : 30,
    right: 30,
    width: 120,
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED_COLOR,
  },
  buttonText: {
    fontSize: 18,
    color: WHITE_COLOR
  }
});

export default FindBrandRegister;
