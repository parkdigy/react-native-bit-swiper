import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

const defaultTransform = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  zIndex: 1,
  opacity: 1,
};

class SwiperItem extends React.Component {
  static propTypes = {
    transform: PropTypes.shape({
      scale: PropTypes.number,
      translateX: PropTypes.number,
      translateY: PropTypes.number,
      zIndex: PropTypes.number,
      opacity: PropTypes.number,
    }),
  };

  static defaultProps = {
    transform: defaultTransform,
  };

  //--------------------------------------------------------------------------------------------------------------------

  $size = {
    width: 0,
    height: 0,
  };

  //--------------------------------------------------------------------------------------------------------------------

  constructor(props) {
    super(props);

    this.state = {
      transform: props.transform,
    };
  }

  //--------------------------------------------------------------------------------------------------------------------

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.transform !== nextProps.transform) {
      this.setState({transform: nextProps.transform});
    }

    return true;
  }

  //--------------------------------------------------------------------------------------------------------------------

  setTransform(transform) {
    const {
      transform: {scale, translateX, translateY, zIndex, opacity},
    } = this.state;
    const {
      scale: newScale,
      translateX: newTranslateX,
      translateY: newTranslateY,
      zIndex: newZIndex,
      opacity: newOpacity,
    } = transform;

    if (
      scale !== newScale ||
      translateX !== newTranslateX ||
      translateY !== newTranslateY ||
      zIndex !== newZIndex ||
      opacity !== newOpacity
    ) {
      this.setState({transform});
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  getContentSize() {
    return this.$size;
  }

  //--------------------------------------------------------------------------------------------------------------------

  handleLayout = (e) => {
    if (e.nativeEvent && e.nativeEvent.layout) {
      this.$size = {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      };
    }
  };

  //--------------------------------------------------------------------------------------------------------------------

  render() {
    const {style, children} = this.props;
    const {transform} = this.state;
    const {scale, translateX, translateY, zIndex, opacity} = transform || defaultTransform;

    const transformStyle = {transform: []};

    if (scale != null) {
      transformStyle.transform.push({scaleX: scale}, {scaleY: scale});
    }
    if (translateX != null) {
      transformStyle.transform.push({translateX});
    }
    if (translateY != null) {
      transformStyle.transform.push({translateY});
    }
    if (zIndex != null) {
      transformStyle.zIndex = zIndex;
    }
    if (opacity != null) {
      transformStyle.opacity = opacity;
    }

    return (
      <View style={[styles.container, style, transformStyle]}>
        <View onLayout={this.handleLayout}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default SwiperItem;
