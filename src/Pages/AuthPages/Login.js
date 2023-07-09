import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import AuthInput from '../../components/Input/AuthInput';
import {Key, Mail} from '../../components/Icons';
import colors from '../../styles/colors';
import Button from '../../components/Button/Button';
import AuthCheckbox from '../../components/CheckBox/AuthCheckbox';
import authErrorMessages from '../../utils/authErrorMessages';
import Loading from '../../components/Loading/Loading';

const initialFormValues = {
  email: '',
  password: '',
};

const Login = ({navigation}) => {
  const [keyCheckBox, setKeyCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCreatePress() {
    navigation.navigate('Register');
    setKeyCheckBox(false);
  }

  async function handleLogin(formValues) {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(
        formValues.email,
        formValues.password,
      );
      showMessage({
        message: 'Login successful!',
        type: 'success',
        floating: true,
      });
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      showMessage({
        message: authErrorMessages(error.code),
        type: 'danger',
        floating: true,
      });
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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
                icon={<Key />}
                value={values.password}
                secureTextEntry={keyCheckBox ? false : true}
                onChangeText={handleChange('password')}
              />
              <AuthCheckbox
                style={styles.checkbox}
                value={keyCheckBox}
                onValueChange={value => setKeyCheckBox(value)}
                text="Show password"
              />
              {loading ? (
                <Loading />
              ) : (
                <Button text="Login" onPress={handleSubmit} />
              )}
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
