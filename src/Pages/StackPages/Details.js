import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import BottomButtons from '../../components/cards/BottomButtons';
import colors from '../../styles/colors';
import {ArrowFull} from '../../components/Icons';
import {addUserInfo} from '../../redux/reducers';

const Details = ({navigation}) => {
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const selectedTicketPrice = useSelector(state => state.selectedTicketPrice);
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth().currentUser.uid;
        const snapshot = await database().ref(`users/${userId}/`).once('value');
        const data = snapshot.val();
        if (data) {
          dispatch(addUserInfo(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (Object.keys(userInfo).length === 0) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBack() {
    navigation.goBack();
  }
  function handleNext() {
    navigation.navigate('Payment');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Details</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.details_info_container}>
          <View style={styles.info_top_container}>
            <View style={styles.cities_container}>
              <Text style={styles.cities_text}>
                {selectedBusTicket.departureCity}
              </Text>
              <ArrowFull />
              <Text style={styles.cities_text}>
                {selectedBusTicket.arrivalCity}
              </Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>
                {selectedBusTicket.departureDate}
              </Text>
              <Text style={styles.time_text}>
                {selectedBusTicket.departureTime}
              </Text>
            </View>
          </View>
          <View style={styles.user_ticket_info_container}>
            <View style={styles.titles_container}>
              <Text style={styles.titles_texts}>Full Name</Text>
              <Text style={styles.titles_texts}>ID Number</Text>
              <Text style={styles.titles_texts}>Company</Text>
              <Text style={styles.titles_texts}>
                {selectedSeats.length > 1 ? 'Seat Numbers' : 'Seat Number'}
              </Text>
              <Text style={styles.titles_texts}>Ticket Price</Text>
            </View>
            <View style={styles.infos_container}>
              <Text style={styles.infos_texts}>{userInfo?.fullName}</Text>
              <Text style={styles.infos_texts}>{userInfo?.idNo}</Text>
              <Text style={styles.infos_texts}>
                {selectedBusTicket.companyName}
              </Text>
              <Text style={styles.infos_texts}>{selectedSeats.join(', ')}</Text>
              <Text style={styles.infos_texts}>${selectedTicketPrice}</Text>
            </View>
          </View>
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

export default Details;

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
    alignItems: 'center',
  },
  details_info_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    padding: 15,
  },
  info_top_container: {
    borderRadius: 5,
    padding: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
  },
  cities_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cities_text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.lightBlack,
  },
  date_container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  date_text: {
    fontFamily: 'Montserrat-Medium',
    color: colors.green,
    fontSize: 18,
  },
  time_text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    marginTop: 10,
    color: colors.lightBlack,
  },
  user_ticket_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  titles_container: {
    flex: 1,
  },
  infos_container: {
    alignItems: 'flex-end',
    flex: 1,
  },
  titles_texts: {
    marginVertical: 13,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.textGray,
  },
  infos_texts: {
    marginVertical: 13,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
  },
});
