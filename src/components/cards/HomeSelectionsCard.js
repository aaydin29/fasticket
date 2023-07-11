import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Collapsible from 'react-native-collapsible';
import colors from '../../styles/colors';
import {ArrowCircle} from '../Icons';
import DropdownCard from './DropdownCard';
import cities from '../../utils/Cities.json';
import whoData from '../../utils/whoData.json';
import DatePicker from 'react-native-date-picker';
import {changeHomeSelections} from '../../redux/reducers';
import {format, startOfDay} from 'date-fns';

const HomeSelectionsCard = () => {
  const homeSelections = useSelector(state => state.homeSelections);
  const departureCity = useSelector(
    state => state.homeSelections.departureCity,
  );
  const arrivalCity = useSelector(state => state.homeSelections.arrivalCity);
  const [whenDate, setWhenDate] = useState(new Date());
  const peopleNumber = useSelector(state => state.homeSelections.peopleNumber);
  const [collapsibles, setCollapsibles] = useState({
    where: false,
    when: true,
    who: true,
  });
  const dispatch = useDispatch();

  function handleCollapsiblePress(key) {
    setCollapsibles(prevState => {
      const updatedStates = {
        where: true,
        when: true,
        who: true,
      };
      updatedStates[key] = !prevState[key];
      return updatedStates;
    });
  }

  function handleSelections(key, value) {
    if (key === 'whenDate') {
      const formattedDate = format(value, 'MM/dd/yyyy');
      setWhenDate(value);
      dispatch(
        changeHomeSelections({
          ...homeSelections,
          [key]: formattedDate,
        }),
      );
    } else {
      dispatch(changeHomeSelections({...homeSelections, [key]: value.value}));
    }
  }

  useEffect(() => {
    if (!homeSelections.whenDate) {
      const today = new Date();
      const formattedDate = format(today, 'MM/dd/yyyy');
      setWhenDate(today);
      dispatch(
        changeHomeSelections({...homeSelections, whenDate: formattedDate}),
      );
    }
  }, [dispatch, homeSelections]);

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
            onChange={value => handleSelections('departureCity', value)}
          />
          <DropdownCard
            placeholder={'Arrival City'}
            label={'Label'}
            labelField="label"
            valueField="value"
            value={arrivalCity}
            data={cities}
            onChange={value => handleSelections('arrivalCity', value)}
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
            date={whenDate}
            onDateChange={value => handleSelections('whenDate', value)}
            maximumDate={startOfDay(new Date('2024-01-01'))}
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
            onChange={value => handleSelections('peopleNumber', value)}
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
