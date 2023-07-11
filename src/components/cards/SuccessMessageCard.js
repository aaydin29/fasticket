import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {ArrowFull} from '../Icons';
import colors from '../../styles/colors';

const SuccessMessageCard = () => {
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const userInfo = useSelector(state => state.userInfo);

  return (
    <View style={styles.success_container}>
      <View style={styles.success_messages_container}>
        <Lottie
          style={styles.lottie}
          autoPlay
          loop={false}
          source={require('../../assets/lottie/success_animation.json')}
        />
        <Text style={styles.success_text_title}>Successful!</Text>
        <Text style={styles.success_text}>
          Your ticket purchase successfully completed!
        </Text>
      </View>
      <View style={styles.info_container}>
        <View style={styles.info_top_container}>
          <View style={styles.cities_container}>
            <Text style={styles.city_text}>
              {selectedBusTicket.departureCity}
            </Text>
            <ArrowFull />
            <Text style={styles.city_text}>
              {selectedBusTicket.arrivalCity}
            </Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>
              {selectedBusTicket.departureDate}
            </Text>
            <Text style={styles.date_text}>
              {selectedBusTicket.departureTime}
            </Text>
          </View>
        </View>
        <View style={styles.info_bottom_container}>
          <View style={styles.bottom_titles_container}>
            <Text style={styles.info_title_text}>Full Name</Text>
            <Text style={styles.info_title_text}>ID Number</Text>
            <Text style={styles.info_title_text}>Company</Text>
            <Text style={styles.info_title_text}>
              {selectedSeats.length > 1 ? 'Seat Numbers' : 'Seat Number'}
            </Text>
            <Text style={styles.info_title_text}>Bus Number</Text>
          </View>
          <View style={styles.bottom_infos_container}>
            <Text style={styles.info_text}>{userInfo?.fullName}</Text>
            <Text style={styles.info_text}>{userInfo?.idNo}</Text>
            <Text style={styles.info_text}>
              {selectedBusTicket.companyName}
            </Text>
            <Text style={styles.info_text}>
              {selectedSeats.length > 1
                ? selectedSeats.join(', ')
                : selectedSeats}
            </Text>

            <Text style={styles.info_text}>{selectedBusTicket.busNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SuccessMessageCard;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  success_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 10,
  },
  success_messages_container: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  success_text_title: {
    fontFamily: 'Montserrat-Bold',
    color: colors.lightBlack,
    fontSize: 20,
    marginTop: 10,
  },
  success_text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  info_container: {},
  info_top_container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.darkGray,
    borderBottomColor: colors.darkGray,
    paddingVertical: 10,
  },
  cities_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    paddingHorizontal: 20,
  },
  city_text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.lightBlack,
  },
  date_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date_text: {
    margin: 5,
    marginHorizontal: 20,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: colors.lightBlack,
  },
  info_bottom_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  bottom_titles_container: {
    flex: 1,
  },
  bottom_infos_container: {
    flex: 1,
    alignItems: 'flex-end',
  },

  info_title_text: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 7.5,
    color: colors.textGray,
  },
  info_text: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 7.5,
    color: colors.lightBlack,
  },
});
