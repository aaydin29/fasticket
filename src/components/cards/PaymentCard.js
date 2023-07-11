import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../styles/colors';
import {CheckCircle} from '../Icons';
import {changePaymentInfo} from '../../redux/reducers';

const PaymentCard = () => {
  const [isNumberTrue, setIsNumberTrue] = useState(false);
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const ticketPrice = useSelector(state => state.selectedTicketPrice);
  const taxPrice = selectedBusTicket.taxPrice;
  const paymentInfo = useSelector(state => state.paymentInfo);
  const dispatch = useDispatch();

  function handleWrite(key, value) {
    dispatch(changePaymentInfo({...paymentInfo, [key]: value}));
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner_card_container}>
        <Image source={require('../../assets/images/bannercards.png')} />
      </View>
      <View style={styles.card_info_container}>
        <View style={styles.name_container}>
          <Text style={styles.name_text}>Card Holder Name</Text>
          <TextInput
            style={styles.name_input}
            onChangeText={value => handleWrite('holderName', value)}
          />
        </View>
        <View style={styles.card_number_container}>
          <Text style={styles.card_number_text}>Card Number</Text>
          <View style={styles.input_check_container}>
            <TextInput
              style={styles.card_number_input}
              maxLength={19}
              keyboardType="numeric"
              onChangeText={value => handleWrite('cardNumber', value)}
            />
            {isNumberTrue && <CheckCircle style={styles.check_icon} />}
          </View>
        </View>
        <View style={styles.date_cvv_container}>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Expiry Date</Text>
            <TextInput
              style={styles.date_input}
              onChangeText={value => handleWrite('expiryDate', value)}
            />
          </View>
          <View style={styles.cvv_container}>
            <Text style={styles.cvv_text}>CVV</Text>
            <TextInput
              style={styles.cvv_input}
              maxLength={3}
              onChangeText={value => handleWrite('cvv', value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.ticket_price_container}>
        <View style={styles.price_top_container}>
          <View style={styles.price_top_info_container}>
            <Text style={styles.price_titles}>Ticket Price</Text>
            <Text style={styles.price_texts}>${ticketPrice}</Text>
          </View>
          <View style={styles.price_top_info_container}>
            <Text style={styles.price_titles}>Tax</Text>
            <Text style={styles.price_texts}>{selectedBusTicket.taxPrice}</Text>
          </View>
        </View>
        <View style={styles.price_bottom_container}>
          <Text style={styles.total_amount_texts}>Total Amount</Text>
          <Text style={styles.total_amount_texts}>TOTAL PRICE</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentCard;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner_card_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    padding: 15,
  },
  card_info_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 20,
    padding: 25,
  },
  name_container: {
    marginVertical: 10,
  },
  name_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.textGray,
  },
  name_input: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    height: 40,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  card_number_container: {
    marginVertical: 10,
  },
  card_number_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.textGray,
  },
  input_check_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card_number_input: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    height: 40,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    flex: 1,
  },
  check_icon: {
    position: 'absolute',
    right: 10,
  },
  date_cvv_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  date_container: {
    flex: 1,
    paddingRight: 40,
  },
  date_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.textGray,
  },
  date_input: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    height: 40,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  cvv_container: {
    flex: 1,
  },
  cvv_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.textGray,
  },
  cvv_input: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    height: 40,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  ticket_price_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    paddingHorizontal: 25,
  },
  price_top_container: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.textGray,
    paddingBottom: 5,
    marginBottom: 15,
  },
  price_top_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  price_bottom_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price_titles: {
    borderColor: colors.textGray,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  price_texts: {
    borderColor: colors.lightBlack,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  total_amount_texts: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.green,
  },
});
