import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import colors from '../../styles/colors';
import {addSelectedBusTicket} from '../../redux/reducers';

const SchedulesListCard = () => {
  const availableBusTickets = useSelector(state => state.availableBusTickets);
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const dispatch = useDispatch();

  const [sortedTickets, setSortedTickets] = useState([]);

  useEffect(() => {
    // Tickets sorted by hours
    const convertTimeToMinutes = time => {
      const [hour, minute] = time.split(':');
      return parseInt(hour, 10) * 60 + parseInt(minute, 10);
    };
    const sorted = availableBusTickets.slice().sort((a, b) => {
      const timeA = convertTimeToMinutes(a.departureTime);
      const timeB = convertTimeToMinutes(b.departureTime);
      return timeA - timeB;
    });
    setSortedTickets(sorted);
  }, [availableBusTickets]);

  const handleSelectTicket = ticket => {
    dispatch(addSelectedBusTicket(ticket));
  };

  return (
    <View style={styles.container}>
      <View style={styles.list_header}>
        <Text style={styles.header_company_texts}>Company</Text>
        <Text style={styles.header_texts}>Hour</Text>
        <Text style={styles.header_texts}>Seats</Text>
        <Text style={styles.header_texts}>Price</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedTickets.map(ticket => (
          <TouchableOpacity
            onPress={() => handleSelectTicket(ticket)}
            activeOpacity={0.7}
            style={
              selectedBusTicket && selectedBusTicket.id === ticket.id
                ? styles.selected_list_item
                : styles.list_item
            }
            key={ticket.id}>
            <Text
              style={styles.list_company_text}
              numberOfLines={1}
              ellipsizeMode="tail">
              {ticket.companyName}
            </Text>
            <Text style={styles.list_item_texts}>{ticket.departureTime}</Text>
            <Text style={styles.list_item_texts}>
              {' '}
              {ticket.seatCount} / {ticket.emptySeats}
            </Text>
            <Text style={styles.list_item_texts}> {ticket.ticketPrice}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SchedulesListCard;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: deviceSize.width / 1.2,
    maxHeight: deviceSize.height / 1.8,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.white,
  },
  list_header: {
    padding: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlack,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  header_texts: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  header_company_texts: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: colors.white,
    flex: 1.4,
  },
  list_item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
  },
  selected_list_item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    backgroundColor: colors.lightGray,
  },
  list_item_texts: {
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    flex: 1,
    textAlign: 'center',
  },
  list_company_text: {
    fontFamily: 'Montserrat-Regular',
    color: colors.lightBlack,
    flex: 1.4,
  },
});
