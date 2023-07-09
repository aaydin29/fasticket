import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import AuthInput from '../../components/Input/AuthInput';
import {Key, Mail} from '../../components/Icons';
import colors from '../../styles/colors';
import Button from '../../components/Button/Button';
import AuthCheckbox from '../../components/CheckBox/AuthCheckbox';

const Login = ({navigation}) => {
  const [keyCheckBox, setKeyCheckBox] = useState(false);

  function handleCreatePress() {
    navigation.navigate('Register');
    setKeyCheckBox(false);
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
        <AuthInput placeholder="Email" icon={<Mail />} />
        <AuthInput
          placeholder="Password"
          icon={<Key />}
          secureTextEntry={keyCheckBox ? false : true}
        />
        <AuthCheckbox
          value={keyCheckBox}
          onValueChange={value => setKeyCheckBox(value)}
          text="Show password"
        />
        <Button text="Login" />
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
