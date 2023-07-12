import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import colors from '../../styles/colors';
import BottomButtons from '../../components/cards/BottomButtons';
import SuccessMessageCard from '../../components/cards/SuccessMessageCard';
import {
  addMyTickets,
  addSelectedBusTicket,
  addSelectedSeats,
  addSelectedTicketPrice,
  changeAvailableBusTickets,
  changeHomeSelections,
  changePaymentInfo,
} from '../../redux/reducers';

const PaymentSuccess = ({navigation}) => {
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const myTickets = useSelector(state => state.myTickets);
  const paymentInfo = useSelector(state => state.paymentInfo);
  const dispatch = useDispatch();

  function generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  async function handleBackToHome() {
    // Saves persistent data, resets others.
    const id = generateRandomId();
    const newTicket = {
      ticketId: id,
      company: selectedBusTicket.companyName,
      departureCity: selectedBusTicket.departureCity,
      arrivalCity: selectedBusTicket.arrivalCity,
      departureDate: selectedBusTicket.departureDate,
      departureTime: selectedBusTicket.departureTime,
      busNumber: selectedBusTicket.busNumber,
      selectedSeats: selectedSeats,
      totalPrice: paymentInfo.totalPrice,
      holderName: paymentInfo.holderName,
    };
    dispatch(addMyTickets([...myTickets, newTicket]));

    try {
      const userId = auth().currentUser.uid;
      await database()
        .ref(`users/${userId}/myTickets`)
        .set([...myTickets, newTicket]);
    } catch (error) {
      console.log(error);
    }

    dispatch(
      changeHomeSelections({
        departureCity: '',
        arrivalCity: '',
        peopleNumber: '',
        whenDate: '',
      }),
    );
    dispatch(changeAvailableBusTickets([]));
    dispatch(addSelectedBusTicket({}));
    dispatch(addSelectedSeats([]));
    dispatch(addSelectedTicketPrice(0));
    dispatch(
      changePaymentInfo({
        holderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        isNumberTrue: false,
        totalPrice: '',
      }),
    );
    navigation.navigate('Home');
  }

  function handleDownload() {
    showMessage({
      message: 'Your ticket has been downloaded successfully!',
      type: 'success',
      floating: true,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <View style={styles.body}>
        <SuccessMessageCard />
      </View>
      <BottomButtons
        textLeft="Back to Home"
        textRight="Download"
        onPressLeft={handleBackToHome}
        onPressRight={handleDownload}
        buttonRightStyle={styles.download_button}
      />
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    paddingTop: 40,
  },
  body: {
    flex: 1,
  },
  download_button: {
    backgroundColor: colors.orange,
  },
});
