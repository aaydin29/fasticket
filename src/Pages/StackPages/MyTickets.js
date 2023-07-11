import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {MenuLines} from '../../components/Icons';
import colors from '../../styles/colors';
import MenuModal from '../../components/modals/MenuModal';

const MyTickets = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  function handleMenuPress() {
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <MenuLines onPress={handleMenuPress} />
        <Text style={styles.header_text}>My Tickets</Text>
      </View>
      <View style={styles.body}>
        <Text>Yok</Text>
      </View>
      <MenuModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default MyTickets;

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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.lightBlack,
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
  },
  body: {
    flex: 1,
    paddingTop: 10,
  },
});
