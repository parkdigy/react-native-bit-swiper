import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ViewPropTypes, View, Text} from 'react-native';
import SwiperPaginateDot from './SwiperPaginateDot';

class SwiperPaginate extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    dotStyle: ViewPropTypes.style,
    activeDotStyle: ViewPropTypes.style,
    activeIndex: PropTypes.number,
    total: PropTypes.number,
    onDotRender: PropTypes.func,
  };

  static defaultProps = {
    activeIndex: 0,
  };

  //--------------------------------------------------------------------------------------------------------------------

  state = {
    activeIndex: null,
  };

  //--------------------------------------------------------------------------------------------------------------------

  componentDidMount() {
    this.init(this.props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.init(nextProps, this.props);

    return true;
  }

  //--------------------------------------------------------------------------------------------------------------------

  init(props, prevProps) {
    if (prevProps == null || props.activeIndex !== prevProps.activeIndex) {
      this.setState({activeIndex: props.activeIndex});
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  setActiveIndex(activeIndex) {
    const {activeIndex: stateActiveIndex} = this.state;
    if (stateActiveIndex !== activeIndex) {
      this.setState({activeIndex});
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  render() {
    const {style, dotStyle, activeDotStyle, total, onDotRender} = this.props;
    const {activeIndex} = this.state;

    return (
      <View style={[styles.container, style]}>
        {new Array(total).fill(0).map((v, index) => (
          <SwiperPaginateDot
            key={index}
            index={index}
            active={activeIndex === index}
            style={dotStyle}
            activeStyle={activeDotStyle}
            onRender={onDotRender}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwiperPaginate;
