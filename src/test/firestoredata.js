import firestore from '@react-native-firebase/firestore';

export const data = 
// {
//         clientID: 'hwa0327',
//         birth: '19980327',
//         name: '이화영',
//         nickname: '퐈',
//         password: 'abcde12345!',
//         phonenumber: '01012345678',
//         totalpoint: 1200,
// };
[
  {
    // pointlog: [
    //   {
    //     date: firestore.Timestamp.fromDate(new Date('2020-09-28')),
    //     is_usage: false,
    //     logtitle: '포인트 충전',
    //     detail: '우리은행',
    //     point: 1000,
    //     balance: 2300,
    //   },
    //   {
    //     date: firestore.Timestamp.fromDate(new Date("2020-10-25")),
    //     is_usage: true,
    //     logtitle: '결제 시 사용',
    //     detail: '스타벅스 2개',
    //     point: -1000,
    //     balance: 1300,
    //   },
    //   {
    //     date: firestore.Timestamp.fromDate(new Date("2020-10-22")),
    //     is_usage: false,
    //     logtitle: '판매 적립',
    //     detail: '더커피 2개',
    //     point: 400,
    //     balance: 1700,
    //   },
    //   {
    //     date: firestore.Timestamp.fromDate(new Date("2020-11-01")),
    //     is_usage: false,
    //     logtitle: '판매 적립',
    //     detail: '안다르 1개',
    //     point: 100,
    //     balance:  1800
    //   },
    //   {
    //     date: firestore.Timestamp.fromDate(new Date("2020-10-19")),
    //     is_usage: true,
    //     logtitle: '결제 시 사용',
    //     detail: '스타벅스 6개',
    //     point: -600,
    //     balance: 1200,
    //   },
    // ],
    brands: [
      { brandName: '일리터커피' },
      { brandName: '파리바게트' },
      { brandName: '안다르커피' },
      { brandName: '더착한커피' },
      { brandName: '스타벅스' },
      { brandName: '미스터힐링' },
      { brandName: '스트릿츄러스' },
      { brandName: '바르다김선생' },
      { brandName: '카페게이트' },
      { brandName: '삼진어묵' },
    ],
    client : [
      {
        clientID: 'hwa0327',
        birth: '19980327',
        name: '이화영',
        nickname: '퐈',
        password: 'abcde12345!',
        phonenumber: '01012345678',
        totalpoint: 1200,
      },
    ],
    owner: [
      {
        coupon_count: '10',
        store_img:
          'https://firebasestorage.googleapis.com/v0/b/nikunaeku-f3aa2.appspot.com/o/starbucks.png?alt=media&token=9c50661b-43e1-49c7-8b03-cf8ac297757d',
        store_name: '안 다르',
        user_name: '백진우',
      },
      {
        checkSeat: 0,
        storeImg:
          'https://firebasestorage.googleapis.com/v0/b/nikunaeku-f3aa2.appspot.com/o/starbucks.png?alt=media&token=9c50661b-43e1-49c7-8b03-cf8ac297757d',
        storeName: 'starbucks',
        time: 1604304625951,
        totalCount: 24,
        userId: 'b970311',
        userName: 'Baek',
        weekCount: 13,
      },
    ],
    posts: [
      {
        possibleNum: 2,
        price: 500,
        purchased: false,
        shopName: '스트릿츄러스',
      },
      {
        possibleNum: 2,
        price: 220,
        purchased: false,
        shopName: '카페안다르',
      },
      {
        possibleNum: 3,
        price: 100,
        purchased: false,
        shopName: '안다르커피',
        timestamp: { _nanoseconds: 851000000, _seconds: 1603207828 },
        userId: 'USER_ID',
      },
      {
        possibleNum: 1,
        price: 200,
        purchased: true,
        shopName: '스타벅스',
      },
      {
        possibleNum: 2,
        price: 500,
        purchased: true,
        shopName: '스트릿츄러스',
      },
    ],
  },
];
