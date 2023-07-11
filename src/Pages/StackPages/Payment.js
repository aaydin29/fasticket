import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import BottomButtons from '../../components/cards/BottomButtons';
import colors from '../../styles/colors';

const Payment = ({navigation}) => {
  function handleBack() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Payment</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.banner_card_container}>
          <Image source={require('../../assets/images/bannercards.png')} />
        </View>
        <View style={styles.card_info_container}>
          <View>
            <Text>Name</Text>
          </View>
          <View>
            <Text>Card Number</Text>
          </View>
        </View>
        <View style={styles.ticket_price_container}>
          <Text>Ticket prices</Text>
        </View>
      </View>
      <BottomButtons
        textLeft="Back"
        textRight="Buy"
        onPressLeft={handleBack}
        // onPressRight={handleBuy}
      />
    </View>
  );
};

export default Payment;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header_container: {
    height: 80,
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
    paddingTop: 10,
    alignItems: 'center',
  },
  banner_card_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    padding: 10,
  },
  card_info_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 20,
  },
});
