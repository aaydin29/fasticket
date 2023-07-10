import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Collapsible from 'react-native-collapsible';
import database from '@react-native-firebase/database';
import colors from '../../styles/colors';
import {ArrowCircle} from '../Icons';
import DropdownCard from './DropdownCard';
import cities from '../../utils/Cities.json';
import whoData from '../../utils/whoData.json';
import DatePicker from 'react-native-date-picker';

const HomeSelectionsCard = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [peopleNumber, setPeopleNumber] = useState('');
  const [whenDate, setWhenDate] = useState('');
  const [collapsibles, setCollapsibles] = useState({
    where: false,
    when: true,
    who: true,
  });

  const handleCollapsiblePress = key => {
    setCollapsibles(prevState => {
      const updatedStates = {
        where: true,
        when: true,
        who: true,
      };
      updatedStates[key] = !prevState[key];
      return updatedStates;
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCollapsiblePress('where')}
          style={styles.touchable_container}>
          <Text style={styles.ask_texts}>Where?</Text>
          {collapsibles.where && <ArrowCircle />}
        </TouchableOpacity>
        <Collapsible
          collapsed={collapsibles.where}
          style={styles.collapsible_containers}>
          <DropdownCard
            placeholder={'Departure City'}
            label={'Label'}
            labelField="label"
            valueField="value"
            value={departureCity}
            data={cities}
            onChange={value => setDepartureCity(value)}
          />
          <DropdownCard
            placeholder={'Arrival City'}
            label={'Label'}
            labelField="label"
            valueField="value"
            value={arrivalCity}
            data={cities}
            onChange={value => setArrivalCity(value)}
          />
        </Collapsible>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCollapsiblePress('when')}
          style={styles.touchable_container}>
          <Text style={styles.ask_texts}>When?</Text>
          {collapsibles.when && <ArrowCircle />}
        </TouchableOpacity>
        <Collapsible
          collapsed={collapsibles.when}
          style={styles.collapsible_containers}>
          <DatePicker
            mode="date"
            date={whenDate === '' ? new Date() : whenDate}
            onDateChange={date => setWhenDate(date)}
            minimumDate={new Date()}
            maximumDate={new Date('2024-01-01')}
          />
        </Collapsible>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCollapsiblePress('who')}
          style={styles.touchable_container}>
          <Text style={styles.ask_texts}>Who?</Text>
          {collapsibles.who && <ArrowCircle />}
        </TouchableOpacity>
        <Collapsible
          collapsed={collapsibles.who}
          style={styles.collapsible_containers}>
          <DropdownCard
            placeholder={'How many people?'}
            label={'Label'}
            labelField="label"
            valueField="value"
            value={peopleNumber}
            data={whoData}
            onChange={value => setPeopleNumber(value)}
          />
        </Collapsible>
      </View>
    </View>
  );
};

export default HomeSelectionsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    elevation: 5,
    marginHorizontal: 20,
    minHeight: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  touchable_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 20,
  },
  ask_texts: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.black,
  },
  collapsible_containers: {
    padding: 15,
    paddingBottom: 30,
  },
});
