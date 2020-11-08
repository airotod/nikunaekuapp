import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { 
  GREY_10_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
  YELLO_COLOR,
  YELLO_COLOR_BRIGHT 
} from '../../models/colors';

const MyWallet = ({ route, navigation }) => {
  const ref = firestore().collection('client');
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.maincontainer}>
          <Text style={styles.topText}>보유 포인트</Text>
          <View style={styles.pointcontainer}>
            <View style={styles.centercontainer}>
              <Text style={styles.pointText}>1,200원</Text>
              <View style={styles.threebuttons}>
                <Button title={"충천"} color={YELLO_COLOR_BRIGHT}></Button>
                <Button title={"선물"} color={YELLO_COLOR_BRIGHT}></Button>
                <Button title={"인출"} color={YELLO_COLOR_BRIGHT}></Button>
              </View>
            </View>
            <View style={styles.detailcontainer}>
              <View style={styles.detailpoint}>
                <Text style={styles.detailText}>적립</Text>
                <Text style={styles.detailValue}>300원</Text>
              </View>
              <View style={styles.detailpoint}>
                <Text style={styles.detailText}>충전</Text>
                <Text style={styles.detailValue}>2000원</Text>
              </View>
              <View style={styles.detailpoint}>
                <Text style={styles.detailText}>사용</Text>
                <Text style={styles.detailValue}>0원</Text>
              </View>
            </View>
          </View>

        </View>
        
      </View>
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
  maincontainer:{
    width: 310,
    height : 180,
    padding: 20,
    backgroundColor: WHITE_COLOR,
    borderRadius : 15,
  },
  topText: {
    color: BLACK_COLOR,
    fontSize : 12,
  },
  pointcontainer: {
    flex:1,
    flexDirection: 'column',
  },
  centercontainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointText: {
    flex: 1,
    color: BLACK_COLOR,
    fontSize: 25,
    fontWeight: 'bold',
  },
  threebuttons: {
    flex: 1,
    flexDirection: 'row',
  },
  detailcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailpoint: {
    flex: 1,
    alignItems: 'center',
  },
  detailText: {
    color: BLACK_COLOR,
    fontSize: 12,
  },
  detailValue: {
    color: BLACK_COLOR,
    fontSize: 15,
  }
});

export default MyWallet;
