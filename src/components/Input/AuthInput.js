import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const AuthInput = ({
  icon,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        maxLength={maxLength}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textGray}
      />
      {icon && <View style={styles.icon_container}>{icon}</View>}
    </View>
  );
};

export default AuthInput;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.textGray,
    width: deviceSize.width / 1.3,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    fontFamily: 'Montserrat-Regular',
  },
  icon_container: {
    marginRight: 15,
  },
});
