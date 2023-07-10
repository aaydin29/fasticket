import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import colors from '../../styles/colors';
import SeatSelectCard from '../../components/cards/SeatSelectCard';
import BottomButtons from '../../components/cards/BottomButtons';
import {addSelectedSeats} from '../../redux/reducers';

const Seats = ({navigation}) => {
  const dispatch = useDispatch();
  function handleBack() {
    navigation.goBack();
    dispatch(addSelectedSeats([]));
  }
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Seats</Text>
      </View>
      <View style={styles.body}>
        <SeatSelectCard />
      </View>
      <BottomButtons
        textLeft="Back"
        textRight="Next"
        onPressLeft={handleBack}
        // onPressRight={handleNext}
      />
    </View>
  );
};

export default Seats;

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
  },
});
