import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import AuthInput from '../../components/Input/AuthInput';
import {Birthday, IdCard, Key, Mail, User} from '../../components/Icons';
import AuthCheckbox from '../../components/CheckBox/AuthCheckbox';
import Button from '../../components/Button/Button';

const Register = ({navigation}) => {
  const [date, setDate] = useState('');
  const [checkboxValues, setCheckboxValues] = useState({
    male: false,
    female: false,
  });

  function handleCheckboxChange(type) {
    setCheckboxValues(prevValues => ({
      ...prevValues,
      male: type === 'male' ? !prevValues.male : false,
      female: type === 'female' ? !prevValues.female : false,
    }));
  }

  function onChangeText(text) {
    const numbersOnly = text.replace(/\D/g, '');
    let formattedDate = '';
    if (numbersOnly.length > 0) {
      formattedDate += numbersOnly.substring(0, 2);
      if (numbersOnly.length >= 3) {
        formattedDate += '/' + numbersOnly.substring(2, 4);
        if (numbersOnly.length >= 5) {
          formattedDate += '/' + numbersOnly.substring(4, 6);
        }
      }
    }
    setDate(formattedDate);
  }

  function handleLoginPress() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Register</Text>
      </View>
      <View style={styles.body_container}>
        <AuthInput placeholder="Full Name" icon={<User />} />
        <AuthInput placeholder="ID Number" icon={<IdCard />} maxLength={20} />
        <AuthInput
          placeholder="Birthday dd/mm/yy"
          maxLength={8}
          icon={<Birthday />}
          value={date}
          onChangeText={text => onChangeText(text)}
        />
        <AuthInput placeholder="E-mail" icon={<Mail />} />
        <AuthInput placeholder="Password" icon={<Key />} secureTextEntry />
        <AuthInput
          placeholder="Confirm Password"
          icon={<Key />}
          secureTextEntry
        />
        <View style={styles.checkbox_container}>
          <AuthCheckbox
            style={styles.checkbox}
            value={checkboxValues.male}
            onValueChange={() => handleCheckboxChange('male')}
            text="Male"
          />
          <AuthCheckbox
            style={styles.checkbox}
            value={checkboxValues.female}
            onValueChange={() => handleCheckboxChange('female')}
            text="Female"
          />
        </View>
        <Button text="Register" />
        <Text style={styles.login_text}>
          Already have an account? {''} {''}
          <Text onPress={handleLoginPress} style={styles.login_text_login}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    backgroundColor: colors.lightGray,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: colors.lightBlack,
  },
  body_container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 40,
  },
  checkbox_container: {
    width: deviceSize.width / 1.3,
    flexDirection: 'row',
  },
  checkbox: {
    justifyContent: 'center',
  },
  login_text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    margin: 10,
    fontSize: 15,
  },
  login_text_login: {
    fontFamily: 'Montserrat-Bold',
    color: colors.lightBlack,
    fontSize: 15,
  },
});
