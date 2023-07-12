import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Collapsible from 'react-native-collapsible';

import {MenuLines} from '../../components/Icons';
import MenuModal from '../../components/modals/MenuModal';
import {addMyTickets} from '../../redux/reducers';
import colors from '../../styles/colors';

const MyTickets = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedTicketIndex, setExpandedTicketIndex] = useState(null);
  const myTickets = useSelector(state => state.myTickets);

  const dispatch = useDispatch();

  function handleMenuPress() {
    setModalVisible(!modalVisible);
  }

  function handleTicketPress(index) {
    // Allows only the selected ticket to be opened.
    if (expandedTicketIndex === index) {
      setExpandedTicketIndex(null);
    } else {
      setExpandedTicketIndex(index);
    }
  }

  async function handleDeleteAll() {
    // Delete tickets data from redux and firebase database.
    dispatch(addMyTickets([]));
    try {
      const userId = auth().currentUser.uid;
      await database().ref(`users/${userId}/myTickets`).set([]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <MenuLines onPress={handleMenuPress} />
        <Text style={styles.header_text}>My Tickets</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        {myTickets.length === 0 ? (
          <Text style={styles.no_ticket_text}>No tickets have been found!</Text>
        ) : (
          myTickets.map((ticket, index) => (
            <View style={styles.ticket_container} key={index}>
              <TouchableOpacity
                onPress={() => handleTicketPress(index)}
                activeOpacity={0.7}
                style={styles.ticket_info_container}>
                <View style={styles.ticket_top_left}>
                  <Text style={styles.holder_name}>{ticket.holderName}</Text>
                  <View style={styles.ticket_bottom_left}>
                    <Text style={styles.departureCity}>
                      {ticket.departureCity} -
                    </Text>
                    <Text style={styles.arrivalCity}>{ticket.arrivalCity}</Text>
                    <Text style={styles.departureDate}>
                      {ticket.departureDate}
                    </Text>
                  </View>
                </View>
                <Text style={styles.total_price}>${ticket.totalPrice}</Text>
              </TouchableOpacity>
              <Collapsible
                collapsed={expandedTicketIndex !== index}
                style={styles.collapsible_container}>
                <Text style={styles.company}>Company: {ticket.company}</Text>
                <Text style={styles.departure_time}>
                  Departure Time: {ticket.departureTime}
                </Text>
                <Text style={styles.bus_number}>
                  Bus Number: {ticket.busNumber}
                </Text>
                <Text style={styles.selected_seats}>
                  Seats:{' '}
                  {ticket.selectedSeats.length > 1
                    ? ticket.selectedSeats.join(', ')
                    : ticket.selectedSeats}
                </Text>
              </Collapsible>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.delete_container}
        activeOpacity={0.7}
        onPress={handleDeleteAll}>
        <Text style={styles.delete_text}>Delete All</Text>
      </TouchableOpacity>
      <MenuModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default MyTickets;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
  },
  header_container: {
    height: 60,
    backgroundColor: colors.white,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  header_text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.lightBlack,
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
  },
  body: {
    paddingTop: 30,
    paddingBottom: 80,
    alignItems: 'center',
  },
  no_ticket_text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.lightBlack,
  },
  ticket_container: {
    backgroundColor: colors.white,
    width: deviceSize.width / 1.2,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  ticket_info_container: {
    backgroundColor: colors.white,
    width: deviceSize.width / 1.2,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticket_top_left: {},
  ticket_bottom_left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  holder_name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: colors.lightBlack,
  },
  departureCity: {
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
    marginRight: 5,
  },
  arrivalCity: {
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
    marginRight: 10,
  },
  departureDate: {
    fontFamily: 'Montserrat-Medium',
    color: colors.green,
  },
  total_price: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.lightBlack,
  },
  collapsible_container: {
    padding: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
  },
  company: {
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
    marginVertical: 5,
  },
  departure_time: {
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
    marginVertical: 5,
  },
  bus_number: {
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
    marginVertical: 5,
  },
  selected_seats: {
    fontFamily: 'Montserrat-Medium',
    color: colors.lightBlack,
    marginVertical: 5,
  },
  delete_container: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    borderRadius: 5,
    width: deviceSize.width / 1.2,
    backgroundColor: colors.red,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete_text: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
    fontSize: 14,
  },
});
