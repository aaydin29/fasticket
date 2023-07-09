import {StyleSheet, ActivityIndicator, View, Dimensions} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'small'} color={'white'} />
    </View>
  );
};

export default Loading;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    width: deviceSize.width / 1.3,
    margin: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
