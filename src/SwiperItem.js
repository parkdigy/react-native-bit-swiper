import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, Text, Animated, StyleSheet} from 'react-native';
import * as Util from './Util';
import Animation from './Animation';
import Item from './Item';

const ll = console.log;

class SwiperItem extends React.Component {
  static propTypes = {
    updateKey: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(Item).isRequired,
    width: PropTypes.number.isRequired,
    realItemWidth: PropTypes.number.isRequired,
    itemAlign: PropTypes.oneOf(Item.Align.$all),
    itemScaleAlign: PropTypes.oneOf(Item.ScaleAlign.$all).isRequired,
    activeItemScale: PropTypes.number.isRequired,
    inactiveItemScale: PropTypes.number.isRequired,

    showDebugIndex: PropTypes.bool,
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
      animationStyle: {
        container: null,
        body: null,
        innerBody: null,
      },
    };
  }

  //--------------------------------------------------------------------------------------------------------------------

  componentDidMount() {
    this._init(this.props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps !== this.props) {
      this._init(nextProps, this.props);
    }

    return true;
  }

  //--------------------------------------------------------------------------------------------------------------------

  _init(props, prevProps) {
    if (
      prevProps != null &&
      Util.isPropsChanged(props, prevProps, [
        'updateKey',
        'item',
        'itemScaleAlign',
        'activeItemScale',
        'inactiveItemScale',
      ])
    ) {
      this.resetAnimationTranslateYInterpolate(props);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  resetAnimationTranslateYInterpolate(props) {
    if (this.$size) {
      const {height} = this.$size;

      const {item, itemScaleAlign, activeItemScale, inactiveItemScale} = props;

      if (itemScaleAlign !== 'middle') {
        let activeTranslateY = (height - height * activeItemScale) / activeItemScale;
        let inactiveTranslateY = (height - height * inactiveItemScale) / 2 / inactiveItemScale;

        if (itemScaleAlign === 'top') {
          activeTranslateY = -activeTranslateY;
          inactiveTranslateY = -inactiveTranslateY;
        }

        item.$animation.setOutputRanges(Animation.Key.TranslateY, [
          inactiveTranslateY,
          inactiveTranslateY,
          activeTranslateY,
          inactiveTranslateY,
          inactiveTranslateY,
        ]);
        item.makeAnimationInterpolate(Animation.Key.TranslateY);
      }

      const {
        zIndex,
        opacity,
        translateXContainer,
        scale,
        translateX,
        translateY,
        innerScale,
      } = item.animationInterpolates;

      // container style
      const containerStyle = {transform: []};
      if (zIndex) containerStyle.zIndex = zIndex;
      if (opacity) containerStyle.opacity = opacity;
      if (translateXContainer) containerStyle.transform.push({translateX: translateXContainer});

      // body style
      const bodyStyle = {transform: []};
      if (scale) bodyStyle.transform.push({scale});
      if (translateX) bodyStyle.transform.push({translateX});
      if (itemScaleAlign !== 'middle' && translateY) bodyStyle.transform.push({translateY});

      // inner body transform style
      const innerBodyStyle = {transform: []};
      if (innerScale) innerBodyStyle.transform.push({scale: innerScale});

      this.setState({
        animationStyle: {
          container: containerStyle,
          body: bodyStyle,
          innerBody: innerBodyStyle,
        },
      });
    }
  }

  //--------------------------------------------------------------------------------------------------------------------

  handleLayout = (e) => {
    const {width, height} = e.nativeEvent.layout;
    this.$size = {width, height};

    this.resetAnimationTranslateYInterpolate(this.props);
  };

  //--------------------------------------------------------------------------------------------------------------------

  render() {
    const {children, width, realItemWidth, item, itemAlign, showDebugIndex} = this.props;
    const {animationStyle} = this.state;

    let justifyContent;
    switch (itemAlign) {
      case Item.Align.Top:
        justifyContent = 'flex-start';
        break;
      case Item.Align.Bottom:
        justifyContent = 'flex-end';
        break;
      default:
        justifyContent = 'center';
        break;
    }

    return (
      <Animated.View style={[{flex: 1, justifyContent, width}, animationStyle.container]}>
        <Animated.View style={[{alignItems: 'center', width}, animationStyle.body]}>
          <Animated.View style={[{width: realItemWidth || width}, animationStyle.innerBody]}>
            <View onLayout={this.handleLayout}>{children}</View>
          </Animated.View>
        </Animated.View>
        {showDebugIndex && (
          <View style={styles.debugIndex}>
            <Text style={styles.debugIndexText}>{item.index}</Text>
          </View>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  debugIndex: {
    position: 'absolute',
    top: 0,
    width: 20,
    left: '50%',
    marginLeft: -10,
    zIndex: Dimensions.get('window').width + 1,
  },
  debugIndexText: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
});

export default SwiperItem;
