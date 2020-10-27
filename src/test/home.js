import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import NavigateButton from '../components/navigatebutton';
import { RED_COLOR } from '../models/colors';

const TestHome = ({ route, navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            기능 <Text style={{ color: RED_COLOR }}>테스트</Text> 페이지
          </Text>
          <View style={styles.info}>
            <Text style={styles.infoText}>
              원하는 버튼을 눌러 기능을 확인해보세요.
            </Text>
          </View>
        </View>
        <NavigateButton
          text="Firestore 데이터 가져오기"
          navigation={navigation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  infoText: {
    fontSize: 14,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TestHome;
