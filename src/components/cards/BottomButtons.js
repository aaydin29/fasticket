import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import {Search} from '../Icons';

const BottomButtons = ({
  textLeft,
  textRight,
  icon,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPressLeft}>
        <Text style={styles.text_left}>{textLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressRight}
        style={styles.button_right}>
        {icon && <Search style={styles.icon} />}
        <Text style={styles.text_right}>{textRight}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButtons;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 80,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: deviceSize.width / 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text_left: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.lightBlack,
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: colors.lightBlack,
  },
  button_right: {
    width: 130,
    height: 40,
    backgroundColor: colors.green,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {marginRight: 10},
  text_right: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
    fontSize: 14,
  },
});
