import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';

import colors from '../../styles/colors';

const AuthCheckbox = ({value, onValueChange, text, style}) => {
  return (
    <View style={[styles.checkbox_container, style]}>
      <CheckBox
        disabled={false}
        value={value}
        tintColors={{true: colors.green}}
        onValueChange={onValueChange}
      />
      <Text style={styles.checkbox_text}>{text}</Text>
    </View>
  );
};

export default AuthCheckbox;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  checkbox_container: {
    flex: 1,
    maxHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: deviceSize.width / 1.3,
  },
  checkbox_text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    marginLeft: 5,
  },
});
