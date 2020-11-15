import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BLACK_COLOR,
  GREY_20_COLOR,
  GREY_30_COLOR,
  GREY_70_COLOR,
  WHITE_COLOR,
} from '../models/colors';

const TopBar = ({
  title,
  navigation,
  barColor,
  drawerShown,
  drawerColor,
  titleAlign,
  titleColor,
  myaccountShown,
  myaccountColor,
}) => {
  const BarBackgroundColor = {
    backgroundColor: barColor ? barColor : WHITE_COLOR,
  };
  const titleTextAlign = {
    alignItems: titleAlign ? titleAlign : 'center',
  };
  const titleTextColor = {
    color: titleColor
      ? titleColor
      : barColor == BLACK_COLOR
      ? GREY_20_COLOR
      : GREY_70_COLOR,
  };
  const _handleDrawer = (event) => {
    navigation.openDrawer();
  };
  const _handleNavigate = (event) => {
    navigation.jumpTo('내 정보');
  };

  const HeaderLeft = () => {
    if (drawerShown) {
      return (
        <View style={[styles.buttonContainer, styles.drawer]}>
          <Icon
            name="menu"
            size={30}
            color={drawerColor ? drawerColor : GREY_30_COLOR}
            onPress={_handleDrawer}
          />
        </View>
      );
    } else {
      return myaccountShown ? <View style={styles.buttonContainer} /> : <></>;
    }
  };

  const HeaderRight = () => {
    if (myaccountShown) {
      return (
        <View style={[styles.buttonContainer, styles.myaccount]}>
          <Icon
            name="person"
            size={30}
            color={myaccountColor ? myaccountColor : GREY_30_COLOR}
            onPress={_handleNavigate}
          />
        </View>
      );
    } else {
      return drawerShown ? <View style={styles.buttonContainer} /> : <></>;
    }
  };

  return (
    <View style={[styles.topBarContainer, BarBackgroundColor]}>
      <HeaderLeft />
      <View style={[styles.titleContainer, titleTextAlign]}>
        <Text style={[styles.title, titleTextColor]}>{title ? title : ''}</Text>
      </View>
      <HeaderRight />
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 65,
  },
  buttonContainer: {
    margin: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  titleContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
  },
  drawer: {
    alignItems: 'flex-start',
  },
  myaccount: {
    alignItems: 'flex-end',
  },
});

export default TopBar;
