import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import BottomButtons from '../../components/cards/BottomButtons';
import colors from '../../styles/colors';
import {ArrowFull} from '../../components/Icons';

const Details = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const selectedTicketPrice = useSelector(state => state.selectedTicketPrice);

  useEffect(() => {
    try {
      const userId = auth().currentUser.uid;
      database()
        .ref(`users/${userId}/`)
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setUserInfo(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
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
              <Text style={styles.titles_texts}>Seat Number</Text>
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
  details_info_container: {
    width: deviceSize.width / 1.2,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    padding: 15,
  },
  info_top_container: {
    borderRadius: 5,
    padding: 20,
    borderBottomWidth: 1.5,
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
    marginTop: 10,
  },

  date_text: {
    fontFamily: 'Montserrat-Medium',
    color: colors.green,
    fontSize: 18,
  },
  time_text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    marginTop: 5,
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
