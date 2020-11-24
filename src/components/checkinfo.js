import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import StepButton from '../components/stepbutton';
import { dateWithKorean } from '../utils/format';
import {
  BLACK_COLOR,
  GREY_40_COLOR,
  GREY_80_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

export default function CheckInfo({ data, visible, onClose, onConfirm }) {
  return (
    <Modal animated="fade" visible={visible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {data.usertype === 'customer' ? (
            <Text style={styles.msg}>
              입력하신 정보를 확인해주세요.{'\n'}
              [확인] 버튼을 누르면 회원가입이 완료되며{'\n'}
              메인화면으로 이동합니다.
            </Text>
          ) : (
            <Text style={styles.msg}>
              입력하신 정보를 확인해주세요.{'\n'}
              [확인] 버튼을 누르면 증명서 인증 페이지로{'\n'}
              이동합니다.
            </Text>
          )}
          <View style={styles.modalTextContainer}>
            {data.username && (
              <Text style={styles.modalText}>이름: {data.username}</Text>
            )}
            {data.userid && (
              <Text style={styles.modalText}>아이디: {data.userid}</Text>
            )}
            {data.birthdate && (
              <Text style={styles.modalText}>
                생년월일: {dateWithKorean(data.birthdate)}
              </Text>
            )}
            {data.cafename && (
              <Text style={styles.modalText}>카페명: {data.cafename}</Text>
            )}
            {data.region && (
              <Text style={styles.modalText}>영업지역: {data.region}</Text>
            )}
            {data.cafephone && (
              <Text style={styles.modalText}>
                카페 전화번호: {data.cafephone}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <StepButton
              text="취소"
              onPress={onClose}
              borderColor={GREY_40_COLOR}
            />
            <StepButton
              text="확인"
              onPress={onConfirm}
              buttonColor={RED_COLOR}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalText: {
    color: GREY_80_COLOR,
    fontSize: 13,
  },
  modalTextContainer: {
    marginVertical: 20,
  },
  modalView: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  msg: {
    color: BLACK_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
