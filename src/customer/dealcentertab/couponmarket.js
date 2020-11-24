import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Loading from '../../components/loading';
import DealItem from '../../components/dealitem';
import SortButton from '../../components/sortbutton';

import {
  BLACK_COLOR,
  GREY_60_COLOR,
  GREEN_COLOR,
  GREY_20_COLOR,
  GREY_10_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { username } from '../../models/current';
import { sortByDate, sortByBrandName, sortByPrice } from '../../utils/sortby';

const CouponMarket = () => {
  const [displayedItemList, setDisplayedItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyOnSales, setOnlyOnSales] = useState(true);
  const [searchedItemList, setSearchedItemList] = useState([]);
  const [sortType, setSortType] = useState('최근등록순');
  const [searchKey, setSearchKey] = useState('');
  const [wholeItemList, setWholeItemList] = useState([]);

  let onlyOnSalesColor = onlyOnSales ? GREEN_COLOR : GREY_60_COLOR;

  const ref = firestore().collection('posts');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        const {
          brandName,
          possibleNum,
          price,
          purchased,
          postedAt,
          postedBy,
          totalNum,
        } = doc.data();
        items.push({
          couponId: doc.id,
          currentUser: username,
          brandName: brandName,
          possibleNum: possibleNum,
          price: price,
          purchased: purchased,
          date: postedAt,
          postedBy: postedBy,
          totalNum: totalNum,
        });
      });
      setWholeItemList(items);
      _sortList(sortType, items, items);
      _searchList(searchKey, items);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  function _filterList(value, list) {
    setDisplayedItemList(value ? list.filter((item) => !item.purchased) : list);
    setOnlyOnSales(value);
  }

  function _sortList(value, wholeItems, partItems) {
    if (value === '최근등록순') {
      setWholeItemList(sortByDate(wholeItems));
      setDisplayedItemList(sortByDate(partItems));
    } else if (value === '이름순') {
      setWholeItemList(sortByBrandName(wholeItems));
      setDisplayedItemList(sortByBrandName(partItems));
    } else if (value === '낮은가격순') {
      setWholeItemList(sortByPrice(wholeItems));
      setDisplayedItemList(sortByPrice(partItems));
    }
  }

  function _searchList(value, items) {
    let list = value ? items.filter((item) => item.brandName === value) : items;
    setSearchedItemList(list);
    _filterList(onlyOnSales, list);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="구매할 쿠폰을 검색해보세요"
          placeholderTextColor={GREY_20_COLOR}
          onChangeText={(text) => {
            setSearchKey(text);
            _searchList(text, wholeItemList);
          }}
          value={searchKey}
          clearButtonMode="always"
        />
      </View>
      <View style={styles.subcontainer}>
        <View style={styles.sortButtonContainer}>
          <SortButton
            buttonText="최근등록순"
            sortType={sortType}
            onPress={() => {
              setSortType('최근등록순');
              _sortList('최근등록순', wholeItemList, displayedItemList);
            }}
          />
          <SortButton
            buttonText="이름순"
            sortType={sortType}
            onPress={() => {
              setSortType('이름순');
              _sortList('이름순', wholeItemList, displayedItemList);
            }}
          />
          <SortButton
            buttonText="낮은가격순"
            sortType={sortType}
            onPress={() => {
              setSortType('낮은가격순');
              _sortList('낮은가격순', wholeItemList, displayedItemList);
            }}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text style={[styles.filterText, { color: onlyOnSalesColor }]}>
            {onlyOnSales ? '판매중 상품만' : '전체'}
          </Text>
          <Switch
            trackColor={{ false: WHITE_COLOR, true: WHITE_COLOR }}
            thumbColor={onlyOnSales ? GREEN_COLOR : GREY_60_COLOR}
            onValueChange={() =>
              _filterList(
                !onlyOnSales,
                searchKey ? searchedItemList : wholeItemList,
              )
            }
            value={onlyOnSales}
          />
        </View>
      </View>
      {loading ? (
        <Loading />
      ) : displayedItemList ? (
        <FlatList
          data={displayedItemList}
          renderItem={({ item }) => <DealItem page="couponmarket" {...item} />}
          keyExtractor={(item) => item.couponId}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>데이터가 존재하지 않습니다.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_10_COLOR,
    flex: 1,
    justifyContent: 'center',
  },
  search: {
    alignItems: 'center',
    borderColor: GREY_20_COLOR,
    borderRadius: 8,
    borderWidth: 1,
    height: 35,
    paddingHorizontal: 11,
    paddingVertical: 0,
    width: '100%',
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  subcontainer: {
    alignItems: 'center',
    borderColor: GREY_20_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    height: 42,
  },
  sortButtonContainer: {
    alignItems: 'center',
    flex: 2,
    flexDirection: 'row',
    margin: 9,
  },
  filterContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 9,
  },
  filterText: {
    fontSize: 10,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: BLACK_COLOR,
    fontSize: 14,
  },
});

export default CouponMarket;
