import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const propTypes = {
  textColor: PropTypes.string,
  active: PropTypes.bool,
};

const defaultColor = '#20a8d8';

const Button = ({children, style, textColor, active, ...props}) => {
  const textStyle = {};
  if (textColor != null) {
    textStyle.color = textColor;
  }

  return (
    <TouchableOpacity style={[styles.button, active && styles.buttonActive, style]} activeOpacity={0.8} {...props}>
      {['string', 'number'].includes(typeof children) ? (
        <Text style={[styles.text, textStyle, active && styles.textActive]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: defaultColor,
    borderRadius: 4,
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    minHeight: 40,
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: defaultColor,
  },
  text: {
    color: defaultColor,
    textAlign: 'center',
    fontSize: 13,
  },
  textActive: {
    color: 'white',
  },
});

Button.propTypes = propTypes;

export default Button;
