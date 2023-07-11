import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors';
import BottomButtons from '../../components/cards/BottomButtons';
import SuccessMessageCard from '../../components/cards/SuccessMessageCard';

const PaymentSuccess = ({navigation}) => {
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);

  function handleBackToHome() {
    navigation.goBack();
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
