import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import SeatSelectCard from '../../components/cards/SeatSelectCard';
import BottomButtons from '../../components/cards/BottomButtons';
import {addSelectedSeats} from '../../redux/reducers';
import colors from '../../styles/colors';

const Seats = ({navigation}) => {
  const selectedSeats = useSelector(state => state.selectedSeats);
  const dispatch = useDispatch();

  function handleBack() {
    navigation.goBack();
    dispatch(addSelectedSeats([]));
  }

  function handleNext() {
    if (selectedSeats.length === 0) {
      showMessage({
        message: "You can't continue without selecting a seat!",
        type: 'danger',
        floating: true,
      });
    } else {
      navigation.navigate('Details');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Seats</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <SeatSelectCard />
      </ScrollView>
      <BottomButtons
        textLeft="Back"
        textRight="Next"
        onPressLeft={handleBack}
        onPressRight={handleNext}
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
    paddingTop: 30,
    paddingBottom: 100,
  },
});
