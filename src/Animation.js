import {Animated} from 'react-native';

const ll = console.log;

const Key = {
  ZIndex: 'zIndex',
  Opacity: 'opacity',
  Scale: 'scale',
  InnerScale: 'innerScale',
  TranslateX: 'translateX',
  TranslateXContainer: 'translateXContainer',
  TranslateY: 'translateY',
};

const InputRangeType = {
  Item: 'item', // 아이템 주변만 (개수 : 5개)
  Items: 'items', // 아이템 모두 (개수 : 전체 아이템 수)
};

export default class Animation {
  static Key = Key;
  static InputRangeType = InputRangeType;

  //--------------------------------------------------------------------------------------------------------------------

  constructor() {
    this.$value = new Animated.Value(0);
    this.$outputRanges = {
      zIndex: null,
      opacity: null,
      scale: null,
      innerScale: null,
      translateX: null,
      translateY: null,
    };
  }

  // public ------------------------------------------------------------------------------------------------------------

  makeInterpolates(item) {
    const outputRanges = this.outputRanges;
    return Object.keys(outputRanges).reduce((interpolates, key) => {
      if (outputRanges[key] != null) {
        interpolates[key] = this.makeInterpolate(item, key);
      }
      return interpolates;
    }, {});
  }

  makeInterpolate(item, key) {
    const outputRanges = this.outputRanges[key];

    if (outputRanges == null) return null;

    let finalOutputRanges;

    if (item.animationInputRanges.type === Animation.InputRangeType.Item) {
      finalOutputRanges = outputRanges;
    } else if (item.animationInputRanges.type === Animation.InputRangeType.Items) {
      const leftSecondVal = outputRanges[0];
      const leftVal = outputRanges[1];
      const activeVal = outputRanges[2];
      const rightVal = outputRanges[3];
      const rightSecondVal = outputRanges[4];

      const itemIndex = item.index;
      const baseIndex = item.baseIndex;
      const baseCount = item.baseCount;

      let prevBaseIndex = baseIndex - 1;
      if (prevBaseIndex === -1) prevBaseIndex = baseCount - 1;
      const nextBaseIndex = (baseIndex + 1) % baseCount;

      finalOutputRanges = item.animationInputRanges.items.map((inputItem, inputIndex) => {
        if (inputIndex === itemIndex) {
          return activeVal;
        }

        if (baseCount < 3) {
          if (itemIndex % 2 === inputIndex % 2) {
            return activeVal;
          } else {
            const distance = Math.abs(inputIndex - itemIndex);
            if (distance === 5) {
              if (inputIndex > itemIndex) return rightVal;
              else return leftVal;
            } else if (distance === 3) {
              if (inputIndex > itemIndex) return leftVal;
              else return rightVal;
            }
          }

          if (inputIndex > itemIndex) {
            return rightVal;
          } else {
            return leftVal;
          }
        } else {
          if (inputIndex === itemIndex - 1) {
            return leftVal;
          } else if (inputIndex === itemIndex + 1) {
            return rightVal;
          } else if (inputItem.baseIndex === prevBaseIndex) {
            return leftVal;
          } else if (inputItem.baseIndex === nextBaseIndex) {
            return rightVal;
          } else if (inputIndex === itemIndex - 2) {
            return leftSecondVal;
          } else if (inputIndex === itemIndex + 2) {
            return rightSecondVal;
          }
        }

        return activeVal;
      });
    }

    return item.animation.value.interpolate({
      inputRange: item.animationInputRanges.values,
      outputRange: finalOutputRanges,
      extrapolate: 'clamp',
    });
  }

  // value -------------------------------------------------------------------------------------------------------------

  get value() {
    return this.$value;
  }

  // outputRanges ------------------------------------------------------------------------------------------------------

  get outputRanges() {
    return this.$outputRanges;
  }

  getOutputRanges(key) {
    return this.outputRanges[key];
  }

  setOutputRanges(key, value) {
    this.outputRanges[key] = value;
  }
}
