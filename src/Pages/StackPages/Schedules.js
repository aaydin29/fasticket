import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import BottomButtons from '../../components/cards/BottomButtons';
import colors from '../../styles/colors';
import SchedulesListCard from '../../components/cards/SchedulesListCard';
import {
  addSelectedBusTicket,
  changeAvailableBusTickets,
} from '../../redux/reducers';
import {ArrowFull} from '../../components/Icons';

const Schedules = ({navigation}) => {
  const availableBusTickets = useSelector(state => state.availableBusTickets);
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const dispatch = useDispatch();

  function handleBack() {
    navigation.goBack();
    dispatch(changeAvailableBusTickets([]));
    dispatch(addSelectedBusTicket({}));
  }

  function handleNext() {
    if (!selectedBusTicket || Object.keys(selectedBusTicket).length === 0) {
      showMessage({
        message: "You can't continue without selecting a ticket!",
        type: 'warning',
        floating: true,
      });
    } else {
      navigation.navigate('Seats');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Schedules</Text>
      </View>
      <View style={styles.body}>
        <SchedulesListCard />
        <View style={styles.selections_container}>
          <View style={styles.selections_info_container}>
            <Text style={styles.citys}>
              {availableBusTickets[0]?.departureCity}
            </Text>
            <ArrowFull />
            <Text style={styles.citys}>
              {availableBusTickets[0]?.arrivalCity}
            </Text>
          </View>
          <Text style={styles.date}>
            {availableBusTickets[0]?.departureDate}
          </Text>
        </View>
      </View>
      <BottomButtons
        textLeft="Back"
        textRight="Next"
        onPressLeft={handleBack}
        onPressRight={handleNext}
      />
    </View>
  );
};

export default Schedules;

const deviceSize = Dimensions.get('window');

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
    paddingTop: 30,
  },
  selections_container: {
    alignSelf: 'center',
    width: deviceSize.width / 1.2,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.white,
    margin: 25,
    padding: 20,
  },
  selections_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  citys: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    alignSelf: 'center',
    marginTop: 20,
  },
});
