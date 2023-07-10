import {StyleSheet} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../styles/colors';

const DropdownCard = ({placeholder, value, data, onChange, label}) => {
  const isItemSelected = !!value;

  return (
    <Dropdown
      style={[styles.dropdown, isItemSelected && styles.focusDropdown]}
      placeholderStyle={styles.placeholder_style}
      selectedTextStyle={styles.selected_text_style}
      itemTextStyle={styles.item_text_style}
      placeholder={placeholder}
      label={label}
      labelField="label"
      valueField="value"
      value={value}
      data={data}
      onChange={onChange}
    />
  );
};

export default DropdownCard;

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.darkGray,
    height: 45,
  },
  focusDropdown: {
    borderColor: colors.black,
  },
  placeholder_style: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  selected_text_style: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  item_text_style: {
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
});
