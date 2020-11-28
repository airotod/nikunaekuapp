import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BLACK_COLOR } from '../../models/colors';

import firestore from '@react-native-firebase/firestore';

const Introduction = ({ route, navigation }) => {
  const { data, otherParam } = route.params;
  const [description, setDescription] = useState(null);

  let brand = data.id;

  const ref = firestore().collection('Brand').doc(brand);

  useEffect(() => {
    ref.get().then(function (doc) {
      setDescription(doc.data().description);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>{description}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default Introduction;
