import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import BottomButtons from '../../components/cards/BottomButtons';
import colors from '../../styles/colors';
import PaymentCard from '../../components/cards/PaymentCard';

const Payment = ({navigation}) => {
  const paymentInfo = useSelector(state => state.paymentInfo);

  function handleBuy() {
    const {holderName, cardNumber, expiryDate, cvv, isNumberTrue} = paymentInfo;
    if (
      holderName === '' ||
      cardNumber === '' ||
      expiryDate === '' ||
      cvv === ''
    ) {
      showMessage({
        message: 'Please fill in all fields!',
        type: 'warning',
        floating: true,
      });
      return;
    } else if (isNumberTrue === false) {
      showMessage({
        message: 'Please enter the card number correctly!',
        type: 'warning',
        floating: true,
      });
    } else {
      navigation.navigate('PaymentSuccess');
    }
  }

  function handleBack() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Payment</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <PaymentCard />
      </ScrollView>
      <BottomButtons
        textLeft="Back"
        textRight="Buy"
        onPressLeft={handleBack}
        onPressRight={handleBuy}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header_container: {
    height: 60,
    backgroundColor: colors.white,
    elevation: 5,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  header_text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.lightBlack,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 50,
    alignItems: 'center',
  },
});
