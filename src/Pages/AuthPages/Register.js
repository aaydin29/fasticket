import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import colors from '../../styles/colors';
import AuthInput from '../../components/Input/AuthInput';
import {
  Birthday,
  EyeClose,
  EyeOpen,
  IdCard,
  Mail,
  User,
} from '../../components/Icons';
import AuthCheckbox from '../../components/CheckBox/AuthCheckbox';
import Button from '../../components/Button/Button';
import authErrorMessages from '../../utils/authErrorMessages';
import {changeButtonLoading} from '../../redux/reducers';

const initialFormValues = {
  username: '',
  idNo: '',
  birthday: '',
  email: '',
  password: '',
  repassword: '',
  gender: '',
};

const Register = ({navigation}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    male: false,
    female: false,
  });
  const dispatch = useDispatch();

  async function handleRegister(formValues) {
    dispatch(changeButtonLoading(true));
    const {username, idNo, birthday, email, password, repassword, gender} =
      formValues;

    if (password !== repassword) {
      showMessage({
        message: 'Passwords do not match!',
        type: 'danger',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
      return;
    }
    if (
      !(
        username &&
        idNo &&
        birthday &&
        email &&
        password &&
        repassword &&
        gender
      )
    ) {
      showMessage({
        message: 'Please fill in all fields!',
        type: 'danger',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, repassword);
      await database().ref(`users/${auth().currentUser.uid}`).set({
        fullName: username,
        idNo: idNo,
        birthday: birthday,
        email: email,
        password: password,
        gender: gender,
      });
      showMessage({
        message: 'Account created successfully.',
        type: 'success',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
      navigation.navigate('Login');
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
    }
  }

  function handleCheckboxChange(type, setFieldValue) {
    setCheckboxValues(prevValues => ({
      ...prevValues,
      male: type === 'male' ? !prevValues.male : false,
      female: type === 'female' ? !prevValues.female : false,
    }));
    setFieldValue('gender', type);
  }

  function onChangeText(text, setFieldValue) {
    const numbersOnly = text.replace(/\D/g, '');
    let formattedDate = '';
    if (numbersOnly.length > 0) {
      formattedDate += numbersOnly.substring(0, 2);
      if (numbersOnly.length >= 3) {
        formattedDate += '/' + numbersOnly.substring(2, 4);
        if (numbersOnly.length >= 5) {
          formattedDate += '/' + numbersOnly.substring(4, 8);
        }
      }
    }
    setFieldValue('birthday', formattedDate);
  }

  function handlePasswordVisibility() {
    setPasswordVisible(prevState => !prevState);
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
        <Formik initialValues={initialFormValues} onSubmit={handleRegister}>
          {({values, handleChange, handleSubmit, setFieldValue}) => (
            <>
              <AuthInput
                placeholder="Full Name"
                icon={<User />}
                value={values.username}
                onChangeText={handleChange('username')}
              />
              <AuthInput
                placeholder="ID Number"
                icon={<IdCard />}
                maxLength={20}
                keyboardType="numeric"
                value={values.idNo}
                onChangeText={handleChange('idNo')}
              />
              <AuthInput
                placeholder="Birthday dd/mm/yyyy"
                maxLength={10}
                keyboardType="numeric"
                icon={<Birthday />}
                value={values.birthday}
                onChangeText={text => onChangeText(text, setFieldValue)}
              />
              <AuthInput
                placeholder="E-mail"
                icon={<Mail />}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <AuthInput
                placeholder="Password"
                icon={
                  isPasswordVisible ? (
                    <EyeOpen onPress={handlePasswordVisibility} />
                  ) : (
                    <EyeClose onPress={handlePasswordVisibility} />
                  )
                }
                secureTextEntry={!isPasswordVisible}
                value={values.password}
                onChangeText={handleChange('password')}
              />
              <AuthInput
                placeholder="Confirm Password"
                icon={
                  isPasswordVisible ? (
                    <EyeOpen onPress={handlePasswordVisibility} />
                  ) : (
                    <EyeClose onPress={handlePasswordVisibility} />
                  )
                }
                secureTextEntry={!isPasswordVisible}
                value={values.repassword}
                onChangeText={handleChange('repassword')}
              />
              <View style={styles.checkbox_container}>
                <AuthCheckbox
                  style={styles.checkbox}
                  value={checkboxValues.male}
                  onValueChange={() =>
                    handleCheckboxChange('male', setFieldValue)
                  }
                  text="Male"
                />
                <AuthCheckbox
                  style={styles.checkbox}
                  value={checkboxValues.female}
                  onValueChange={() =>
                    handleCheckboxChange('female', setFieldValue)
                  }
                  text="Female"
                />
              </View>
              <Button text="Register" onPress={handleSubmit} />
            </>
          )}
        </Formik>
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
    fontFamily: 'Montserrat-SemiBold',
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
    margin: 5,
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
