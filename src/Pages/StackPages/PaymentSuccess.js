import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import colors from '../../styles/colors';
import BottomButtons from '../../components/cards/BottomButtons';
import SuccessMessageCard from '../../components/cards/SuccessMessageCard';
import {addMyTickets} from '../../redux/reducers';

const PaymentSuccess = ({navigation}) => {
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const paymentInfo = useSelector(state => state.paymentInfo);
  const dispatch = useDispatch();

  function generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  function handleBackToHome() {
    const id = generateRandomId();
    dispatch(
      addMyTickets({
        tickedId: id,
        company: selectedBusTicket.companyName,
        departureCity: selectedBusTicket.departureCity,
        arrivalCity: selectedBusTicket.arrivalCity,
        departureDate: selectedBusTicket.departureDate,
        departureTime: selectedBusTicket.departureTime,
        busNumber: selectedBusTicket.busNumber,
        selectedSeats: selectedSeats,
        totalPrice: paymentInfo.totalPrice,
        holderName: paymentInfo.holderName,
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
