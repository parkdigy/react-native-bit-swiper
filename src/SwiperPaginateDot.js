import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ViewPropTypes, View} from 'react-native';

class SwiperPaginateDot extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    active: PropTypes.bool,
    style: ViewPropTypes.style,
    activeStyle: ViewPropTypes.style,
    onRender: PropTypes.func,
  };

  //--------------------------------------------------------------------------------------------------------------------

  render() {
    const {index, active, style, activeStyle, onRender} = this.props;

    if (onRender) {
      return onRender(index, active) || null;
    } else {
      let finalStyle;
      if (active) {
        finalStyle = activeStyle ? activeStyle : styles.activeDot;
      } else {
        finalStyle = style ? style : styles.dot;
      }
      return <View key={index} style={finalStyle} />;
    }
  }
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#0584f2',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default SwiperPaginateDot;
