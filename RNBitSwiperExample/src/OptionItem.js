import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import Button from './Button';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.bool,
  radioItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      value: PropTypes.any,
    }),
  ),
  radioValue: PropTypes.any,
  onRadioChange: PropTypes.func,
};

const OptionItem = ({children, title, titleHelp, help, row, radioItems, radioValue, onRadioChange}) => {
  const handleButtonPress = (value) => {
    if (onRadioChange) {
      onRadioChange(value);
    }
  };

  return (
    <View style={[styles.container, row && styles.rowContainer]}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
        {titleHelp && <Text style={styles.titleHelp}>({titleHelp})</Text>}
      </View>

      {help && <Text style={styles.help}>{help}</Text>}

      {radioItems && (
        <View style={styles.rowOptionWrap}>
          {radioItems.map(({label, value}, index) => (
            <Button
              key={index}
              active={radioValue === value}
              style={styles.rowOptionButton}
              onPress={() => handleButtonPress(value)}>
              {label}
            </Button>
          ))}
        </View>
      )}
      {children && <View>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .2)',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, .8)',
    fontWeight: 'bold',
  },
  titleHelp: {
    color: 'gray',
    paddingLeft: 10,
  },
  help: {
    color: 'gray',
    marginTop: 5,
  },
  rowOptionWrap: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  rowOptionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

OptionItem.propTypes = propTypes;

export default OptionItem;
