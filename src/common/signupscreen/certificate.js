import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';

import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import {
  BLACK_COLOR,
  GREY_30_COLOR,
  GREY_40_COLOR,
  GREY_50_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { AuthContext } from '../../utils/context';
import { chooseImage } from './ImagePicker';

export default function Certificate({ route, navigation }) {
  const { account, otherParam } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [logoUrl, setLogoUrl] = useState(false);
  const [resiUrl, setResiUrl] = useState(false);
  const [comUrl, setComUrl] = useState(false);
  const [logoChanged, setLogoChanged] = useState(false);
  const [resiChanged, setResiChanged] = useState(false);
  const [comChanged, setComChanged] = useState(false);
  const [ errMsg, setErrMsg ] = useState(false);

  const ref = firestore().collection('User');
  const ref2 = firestore().collection('Brand');

  function _handleComplete(event) {
    if (!logoUrl || !resiUrl || !comUrl) {
      setErrMsg('업로드 되지 않은 이미지가 있습니다.');
    } else {
      setErrMsg(false);
      setModalVisible(true);
    }
  }

  async function _handleSignUp(event) {
    if (account.brandID === null) {
      ref2.doc(account.storeID).set({
        brandName: account.storeID,
        description: account.des,
        logo: logoUrl,
      });
      ref2.doc(account.storeID).collection('Stores').doc(account.storeID).set({
        address: account.region,
        contactNumber: account.cafephone,
        seatTime: 0,
        seatState: 0,
        storeName: account.storeID,
        useCount: 0,
        saveCount: 0,
      });
    } else {
      ref2.doc(account.brandID).collection('Stores').doc(account.storeID).set({
        address: account.region,
        contactNumber: account.cafephone,
        seatTime: 0,
        seatState: 0,
        storeName: account.storeID,
        useCount: 0,
        saveCount: 0,
      });

    }
    await AsyncStorage.setItem('userType', 'owner');
    await ref.doc(account.userid).set({
      birthdate: account.birthdate,
      brandID: account.brandID === null ? account.storeID : account.brandID,
      storeID: account.storeID,
      password: account.password,
      phoneNumber: account.phoneNumber,
      userId: account.userid,
      userName: account.username,
      userType: 'owner',
      idCard: resiUrl,
      businessLicense: comUrl,
    });
    setModalVisible(false);
  }

  useEffect(() => {
    if (logoChanged === true) {
      storage()
        .ref('/cafeLogo_' + account.userid)
        .getDownloadURL()
        .then(async function (url) {
          setLogoUrl(url);
        })
        .catch((e) => console.log('download logo url error: ', e));
      setLogoChanged(false);
    } else if (resiChanged === true) {
      storage()
        .ref('/resiNum_' + account.userid)
        .getDownloadURL()
        .then(async function (url) {
          setResiUrl(url);
        })
        .catch((e) => console.log('download resiNum url error: ', e));
      setResiChanged(false);
    } else if (comChanged === true) {
      storage()
        .ref('/comNum_' + account.userid)
        .getDownloadURL()
        .then(async function (url) {
          setComUrl(url);
        })
        .catch((e) => console.log('download comNum url error: ', e));
      setComChanged(false);
    } if (account.brandID !== null) {
      try {
        ref2
          .doc(account.brandID)
          .get()
          .then(async function (doc) {
            if (doc.exists) {
              setLogoUrl(doc.data().logo);
            }
          });
      } catch (e) {
        // Restoring Id failed
        console.log('Brand logo downloading failed');
      }
    }
  }, [logoChanged, resiChanged, comChanged])

  return (
    <AuthContext.Consumer>
      {({ signUp }) => (
        <>
          <TopBar
            title="매장 등록 절차"
            navigation={navigation}
            barColor={BLACK_COLOR}
          />
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.mainContents}>
                <Text style={styles.question}>
                  ● 브랜드 로고를 등록해주세요.
                </Text>
                {account.brandID !== null ? <Image source={{ uri: logoUrl }} style={styles.img} /> :
                <TouchableOpacity
                  style={styles.img}
                  onPress={() => {
                    chooseImage({
                      userid: account.userid,
                      option: 'cafeLogo',
                      onClick: () => setLogoChanged(true)
                    });
                  }}
                  activeOpacity={0.5}>
                  {!logoUrl ? <Text style={styles.imgAlt}>Brand{'\n'}Logo</Text>
                    : <Image source={{ uri: logoUrl }} style={styles.img2} />}
                </TouchableOpacity>}
                <Text style={styles.question}>
                  ● 주민등록증을 등록해주세요.
                </Text>
                <TouchableOpacity
                  style={styles.img}
                  onPress={() => {
                    chooseImage({
                      userid: account.userid,
                      option: 'resiNum',
                      onClick: () => setResiChanged(true)
                    });
                  }}
                  activeOpacity={0.5}>
                  {!resiUrl ? <Text style={styles.imgAlt}>주민등록증</Text>
                    : <Image source={{ uri: resiUrl }} style={styles.img2} />}
                </TouchableOpacity>
                <Text style={styles.question}>
                  ● 사업자등록증을 등록해주세요.
                </Text>
                <TouchableOpacity
                  style={styles.img}
                  onPress={() => {
                    chooseImage({
                      userid: account.userid,
                      option: 'comNum',
                      onClick: () => setComChanged(true)
                    });
                  }}
                  activeOpacity={0.5}>
                  {!comUrl ? <Text style={styles.imgAlt}>사업자등록증</Text>
                    : <Image source={{ uri: comUrl }} style={styles.img2} />}
                </TouchableOpacity>
              </View>
              {errMsg && <Text style={styles.redMsg}>{errMsg}</Text>}
              <View style={styles.buttonContainer}>
                <StepButton
                  text="이전"
                  onPress={() => navigation.pop()}
                  borderColor={GREY_40_COLOR}
                />
                <StepButton
                  text="신청"
                  onPress={_handleComplete}
                  buttonColor={RED_COLOR}
                />
              </View>
            </View>
            <Modal animated="fade" visible={modalVisible} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.msg}>
                    [확인]을 누르면 매장 등록 신청이 완료됩니다.{'\n'}
                    올바른 이미지를 업로드했는지 다시 한번 확인해보시기 바랍니다.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <StepButton
                      text="취소"
                      onPress={() => setModalVisible(false)}
                      borderColor={GREY_40_COLOR}
                    />
                    <StepButton
                      text="확인"
                      onPress={() => {
                        signUp({ userType: 'owner' });
                        _handleSignUp();
                      }}
                      buttonColor={RED_COLOR}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  buttonContainer1: {
    alignItems: 'flex-end',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  buttonText: {
    color: BLACK_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    margin: 25,
  },
  img: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: GREY_30_COLOR,
    borderRadius: 15,
    height: 160,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
    width: '90%',
  },
  img2: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: GREY_30_COLOR,
    borderRadius: 15,
    height: 160,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  imgAlt: {
    color: GREY_50_COLOR,
    fontSize: 24,
    textAlign: 'center',
  },
  redMsg: {
    color: RED_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'right',
  },
  mainContents: {
    flex: 1,
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
    margin: 5,
  },
  question: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    width: 70,
  },
});
