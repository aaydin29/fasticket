import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {MenuLines} from '../../components/Icons';
import colors from '../../styles/colors';
import BottomButtons from '../../components/cards/BottomButtons';
import HomeSelectionsCard from '../../components/cards/HomeSelectionsCard';
import ticketsData from '../../utils/ticketData.json';
import {
  changeBusTickets,
  changeButtonLoading,
  changeHomeSelections,
} from '../../redux/reducers';

const Home = ({navigation}) => {
  const homeSelections = useSelector(state => state.homeSelections);
  const dispatch = useDispatch();

  function handleClear() {
    dispatch(
      changeHomeSelections({
        departureCity: '',
        arrivalCity: '',
        peopleNumber: '',
        whenDate: '',
      }),
    );
  }

  async function handleSearch() {
    const {departureCity, arrivalCity, whenDate, peopleNumber} = homeSelections;
    dispatch(changeButtonLoading(true));
    if (
      departureCity === '' ||
      arrivalCity === '' ||
      whenDate === '' ||
      peopleNumber === ''
    ) {
      showMessage({
        message: 'Please fill in all fields!',
        type: 'danger',
        floating: true,
      });
      dispatch(changeButtonLoading(false));
    } else {
      try {
        const formattedWhenDate = formatDate(homeSelections.whenDate);
        const filteredTickets = ticketsData.filter(
          ticket =>
            ticket.departureCity === departureCity &&
            ticket.arrivalCity === arrivalCity &&
            ticket.departureDate === formattedWhenDate,
        );
        if (filteredTickets.length > 0) {
          dispatch(changeBusTickets(filteredTickets));
          dispatch(changeButtonLoading(false));
          navigation.navigate('Seats');
        } else {
          showMessage({
            message: 'No available tickets found!',
            type: 'warning',
            floating: true,
          });
          dispatch(changeButtonLoading(false));
        }
      } catch (error) {
        console.log('Search Error:', error);
        dispatch(changeButtonLoading(false));
      }
    }
  }

  function formatDate(dateString) {
    const [month, day, year] = dateString.split('/');
    const formattedDate = `${month.padStart(2, '0')}/${day.padStart(
      2,
      '0',
    )}/${year}`;
    return formattedDate;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <MenuLines />
        <Text style={styles.header_text}>Home</Text>
      </View>
      <View style={styles.body}>
        <HomeSelectionsCard />
        <BottomButtons
          textLeft="Clear all"
          textRight="Search"
          onPressLeft={handleClear}
          onPressRight={handleSearch}
          icon
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header_container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  header_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: colors.lightBlack,
    flex: 1,
    textAlign: 'center',
    marginLeft: -25,
  },
  body: {
    flex: 1,
    paddingTop: 20,
  },
});
