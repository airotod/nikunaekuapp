import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View , ScrollView} from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';

import Card from "../components/customerHomeCom/card/Card";

const CustomerHome = ({ route, navigation }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      const result = await fetch(
        'https://nicu-7262f.firebaseio.com/cards.json',
      );
      const cards = await result.json();

      const temp = [];

      console.log(cards)

      for (let key in cards) {
        temp.push(cards[key]);
      }
      setCards(temp);
    };
    fetchCards();

    return fetchCards;
  }, []);

  return (
    <>
      <TopBar
        title="니쿠내쿠"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <View style={styles.container}>
        <ScrollView style={styles.cardContainer}>
          {cards.map((info) => (
            <Card key={info.id} data={info} navigation={navigation} />
          ))}
        </ScrollView>
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
  mainText: {
    color: BLACK_COLOR,
  },
});

export default CustomerHome;
