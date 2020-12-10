import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import NavigateButton from './components/navigatebutton';
import { RED_COLOR } from './models/colors';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const MainScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>안녕하세요</Text>
        <Text style={styles.title}>
          <Text style={{ color: RED_COLOR }}>니쿠내쿠</Text> 입니다
        </Text>
      </View>
      <NavigateButton text="고객 화면" navigation={navigation} />
      <NavigateButton text="사장님 화면" navigation={navigation} />
      <NavigateButton text="테스트 화면" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainScreen;
