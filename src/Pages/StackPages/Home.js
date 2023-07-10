import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MenuLines} from '../../components/Icons';
import colors from '../../styles/colors';
import BottomButtons from '../../components/cards/BottomButtons';
import HomeSelectionsCard from '../../components/cards/HomeSelectionsCard';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <MenuLines />
        <Text style={styles.header_text}>Home</Text>
      </View>
      <View style={styles.body}>
        <HomeSelectionsCard />
        <BottomButtons textLeft="Clear all" textRight="Search" icon />
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
