import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useNavigationState} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import colors from '../../styles/colors';
import {Feedback, Home, Logout, Ticket} from '../Icons';

const MenuModal = ({isVisible, onClose, navigation}) => {
  const navigationState = useNavigationState(state => state);
  const currentIndex = navigationState.index;

  const isOnHomePage = navigationState.routes[currentIndex].name === 'Home';
  const isOnMyTicketsPage =
    navigationState.routes[currentIndex].name === 'MyTickets';

  function handleLogout() {
    onClose();
    if (auth().currentUser) {
      auth().signOut();
    } else {
      console.log('Logout error.');
    }
  }

  function handleHome() {
    onClose();
    navigation.navigate('Home');
  }
  function handleTicket() {
    onClose();
    navigation.navigate('MyTickets');
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      swipeDirection="left"
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      backdropOpacity={0.1}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <TouchableOpacity
        style={[
          styles.home_container,
          isOnHomePage && styles.activeHomeContainer,
        ]}
        disabled={isOnHomePage}
        onPress={handleHome}
        activeOpacity={0.5}>
        <Text style={styles.texts}>Home</Text>
        <Home />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.myTickets_container,
          isOnMyTicketsPage && styles.activeTicketContainer,
        ]}
        disabled={isOnMyTicketsPage}
        onPress={handleTicket}
        activeOpacity={0.5}>
        <Text style={styles.texts}>My Tickets</Text>
        <Ticket />
      </TouchableOpacity>
      <TouchableOpacity style={styles.feedback_container} activeOpacity={0.5}>
        <Text style={styles.texts}>Give feedback!</Text>
        <Feedback />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logout_container}
        activeOpacity={0.5}
        onPress={handleLogout}>
        <Text style={styles.texts}>Logout</Text>
        <Logout />
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuModal;

const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    position: 'absolute',
    width: deviceSize.width / 1.4,
    marginTop: 80,
    margin: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-start',
    elevation: 5,
  },
  home_container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.seatGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myTickets_container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.seatGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedback_container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.seatGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logout_container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  texts: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.lightBlack,
  },
  activeHomeContainer: {
    backgroundColor: colors.lightGray,
    borderTopRightRadius: 10,
  },
  activeTicketContainer: {
    backgroundColor: colors.lightGray,
  },
});
