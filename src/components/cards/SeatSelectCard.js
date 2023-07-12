import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import colors from '../../styles/colors';
import {addSelectedSeats, addSelectedTicketPrice} from '../../redux/reducers';

const SeatSelectCard = () => {
  const selectedTicketPrice = useSelector(state => state.selectedTicketPrice);
  const [userGender, setUserGender] = useState('');
  const selectedBusTicket = useSelector(state => state.selectedBusTicket);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const currentTicketPrice = selectedBusTicket?.ticketPrice?.replace('$', '');
  const dispatch = useDispatch();

  useEffect(() => {
    const totalPrice = currentTicketPrice * selectedSeats.length;
    dispatch(addSelectedTicketPrice(totalPrice));
  }, [currentTicketPrice, dispatch, selectedSeats]);

  useEffect(() => {
    try {
      // It fecth user gender from database.
      const userId = auth().currentUser.uid;
      database()
        .ref(`users/${userId}/gender`)
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setUserGender(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSeatPress = seatNumber => {
    if (
      // Seat controls
      selectedSeats.includes(seatNumber) ||
      selectedSeats.length >= 3 ||
      selectedBusTicket.reservedSeats.includes(seatNumber) ||
      selectedBusTicket.reservedByWoman.includes(seatNumber) ||
      selectedBusTicket.reservedByMan.includes(seatNumber)
    ) {
      dispatch(
        addSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber)),
      );
      if (!selectedSeats.includes(seatNumber) && selectedSeats.length === 3) {
        showMessage({
          message: 'You can choose a maximum of 3 seats!',
          type: 'warning',
          floating: true,
        });
        return;
      }
      return;
    }

    // Controls to ensure that men and women cannot sit side by side.
    const reservedSeatsByMan = selectedBusTicket.reservedByMan;
    const reservedSeatsByWoman = selectedBusTicket.reservedByWoman;
    if (userGender === 'male') {
      const adjacentReservedSeats = [
        {seat: 8, adjacent: 15},
        {seat: 9, adjacent: 16},
        {seat: 10, adjacent: 17},
        {seat: 11, adjacent: 18},
        {seat: 12, adjacent: 19},
        {seat: 13, adjacent: 20},
        {seat: 14, adjacent: 21},
      ];

      for (const {seat, adjacent} of adjacentReservedSeats) {
        if (
          (seatNumber === seat && reservedSeatsByWoman.includes(adjacent)) ||
          (seatNumber === adjacent && reservedSeatsByWoman.includes(seat))
        ) {
          showMessage({
            message:
              "You can't sit next to a woman. Please select a different seat.",
            type: 'warning',
            floating: true,
          });
          return;
        }
      }
    } else if (userGender === 'female') {
      const adjacentReservedSeats = [
        {seat: 8, adjacent: 15},
        {seat: 9, adjacent: 16},
        {seat: 10, adjacent: 17},
        {seat: 11, adjacent: 18},
        {seat: 12, adjacent: 19},
        {seat: 13, adjacent: 20},
        {seat: 14, adjacent: 21},
      ];

      for (const {seat, adjacent} of adjacentReservedSeats) {
        if (
          (seatNumber === seat && reservedSeatsByMan.includes(adjacent)) ||
          (seatNumber === adjacent && reservedSeatsByMan.includes(seat))
        ) {
          showMessage({
            message:
              "You can't sit next to a man. Please select a different seat.",
            type: 'warning',
            floating: true,
          });
          return;
        }
      }
    }

    dispatch(addSelectedSeats([...selectedSeats, seatNumber]));
  };

  const renderSeat = seatNumber => {
    // Arranging seats and styles according to seat occupancy, vacancy and seat occupant gender.
    const isSelected = selectedSeats?.includes(seatNumber);

    const isGenderMale = selectedBusTicket?.reservedByMan?.includes(seatNumber);
    const isGenderFemale =
      selectedBusTicket?.reservedByWoman?.includes(seatNumber);

    const isReserved =
      selectedBusTicket?.reservedSeats?.includes(seatNumber) ||
      selectedBusTicket?.reservedByWoman?.includes(seatNumber) ||
      selectedBusTicket?.reservedByMan?.includes(seatNumber);

    let seatStyle = styles.seat;
    if (isSelected) {
      seatStyle = styles.selectedSeat;
    } else if (isGenderMale) {
      seatStyle = styles.genderMale;
    } else if (isGenderFemale) {
      seatStyle = styles.genderFemale;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={seatNumber}
        style={seatStyle}
        onPress={() => handleSeatPress(seatNumber)}
        disabled={isReserved}>
        <Text style={styles.seatNumber}>{seatNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_info_container}>
        <View style={styles.info_containers}>
          <View style={styles.circle_text_container}>
            <View style={styles.empty_circle} />
            <Text style={styles.top_info_texts}>Empty</Text>
          </View>
          <View style={styles.circle_text_container}>
            <View style={styles.reserved_man_circle} />
            <Text style={styles.top_info_texts}>Booked Man</Text>
          </View>
        </View>
        <View style={styles.info_containers}>
          <View style={styles.circle_text_container}>
            <View style={styles.selected_circle} />
            <Text style={styles.top_info_texts}>Selected</Text>
          </View>
          <View style={styles.circle_text_container}>
            <View style={styles.reserved_woman_circle} />
            <Text style={styles.top_info_texts}>Booked Woman</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View>{Array.from(Array(7), (_, index) => renderSeat(index + 1))}</View>
        <View style={styles.right_places}>
          <View>
            {Array.from(Array(7), (_, index) => renderSeat(index + 8))}
          </View>
          <View>
            {Array.from(Array(7), (_, index) => renderSeat(index + 15))}
          </View>
        </View>
      </View>
      <View style={styles.total_price_container}>
        <Text style={styles.total_price_text}>
          Total Price: ${selectedTicketPrice}
        </Text>
      </View>
    </View>
  );
};

export default SeatSelectCard;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: deviceSize.width / 1.2,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.white,
  },
  top_info_container: {
    paddingHorizontal: 40,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
  },
  info_containers: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  circle_text_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  empty_circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.seatGray,
  },
  selected_circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.green,
  },
  reserved_man_circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'blue',
  },
  reserved_woman_circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#e75480',
  },
  top_info_texts: {
    marginLeft: 5,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    paddingHorizontal: 50,
  },
  seat: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.seatGray,
    margin: 4,
    elevation: 3,
  },
  selectedSeat: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    margin: 4,
    elevation: 3,
  },
  genderMale: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    margin: 4,
    elevation: 3,
  },
  genderFemale: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e75480',
    margin: 4,
    elevation: 3,
  },
  seatNumber: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  right_places: {
    flexDirection: 'row',
  },
  total_price_container: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 30,
  },
  total_price_text: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.lightBlack,
    fontSize: 18,
  },
});
