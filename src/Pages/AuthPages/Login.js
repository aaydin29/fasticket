import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import colors from '../../styles/colors';
import Button from '../../components/Button/Button';
import AuthInput from '../../components/Input/AuthInput';
import {EyeClose, EyeOpen, Mail} from '../../components/Icons';
import authErrorMessages from '../../utils/authErrorMessages';
import {changeButtonLoading} from '../../redux/reducers';

const initialFormValues = {
  email: '',
  password: '',
};

const Login = ({navigation}) => {
  const [keyCheckBox, setKeyCheckBox] = useState(false);
  const dispatch = useDispatch();

  function handleCreatePress() {
    navigation.navigate('Register');
    setKeyCheckBox(false);
  }

  async function handleLogin(formValues) {
    dispatch(changeButtonLoading(true));
    try {
      //Login function.
      await auth().signInWithEmailAndPassword(
        formValues.email,
        formValues.password,
      );
      showMessage({
        message: 'Login successful!',
        type: 'success',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
      navigation.navigate('Home');
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Login</Text>
      </View>
      <View style={styles.body_container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/AppLogo/fasticketText.png')}
        />
        <Formik initialValues={initialFormValues} onSubmit={handleLogin}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <AuthInput
                placeholder="Email"
                icon={<Mail />}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <AuthInput
                placeholder="Password"
                icon={
                  keyCheckBox === false ? (
                    <EyeClose onPress={() => setKeyCheckBox(true)} />
                  ) : (
                    <EyeOpen onPress={() => setKeyCheckBox(false)} />
                  )
                }
                value={values.password}
                secureTextEntry={keyCheckBox ? false : true}
                onChangeText={handleChange('password')}
              />
              <Button text="Login" onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <Text style={styles.register_text}>
          You don't have an account? {''} {''}
          <Text onPress={handleCreatePress} style={styles.register_text_create}>
            Create
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    backgroundColor: colors.lightGray,
    height: 60,
    elevation: 5,
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
  },
  image: {
    resizeMode: 'contain',
    height: 250,
  },
  checkbox: {
    minHeight: 40,
  },
  register_text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    margin: 10,
    fontSize: 15,
  },
  register_text_create: {
    fontFamily: 'Montserrat-Bold',
    color: colors.lightBlack,
    fontSize: 15,
  },
});
