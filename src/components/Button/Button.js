import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors';
import Loading from '../Loading/Loading';

const Button = ({text, onPress, style}) => {
  const buttonLoading = useSelector(state => state.buttonLoading);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}>
      {buttonLoading ? <Loading /> : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
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
  text: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
});
